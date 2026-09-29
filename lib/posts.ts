import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  draft: boolean;
  readingMinutes: number;
};

export type Post = PostMeta & { html: string; headings: { id: string; text: string }[] };

// Drafts stay out of the production build until SHOW_DRAFTS=true or their frontmatter says draft: false.
const showDrafts = process.env.NODE_ENV !== "production" || process.env.SHOW_DRAFTS === "true";

function readingMinutes(text: string): number {
  return Math.max(1, Math.round(text.split(/\s+/).length / 230));
}

function readFile(file: string): { meta: PostMeta; body: string } {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug: file.replace(/\.mdx?$/, ""),
      title: String(data.title ?? ""),
      date: String(data.date ?? ""),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      summary: String(data.summary ?? ""),
      draft: data.draft !== false,
      readingMinutes: readingMinutes(content),
    },
    body: content,
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => readFile(f).meta)
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<Post | null> {
  const file = ["md", "mdx"].map((ext) => `${slug}.${ext}`).find((f) => fs.existsSync(path.join(BLOG_DIR, f)));
  if (!file) return null;
  const { meta, body } = readFile(file);
  if (meta.draft && !showDrafts) return null;
  const html = String(
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: false })
      .use(rehypeSlug)
      .use(rehypeHighlight, { detect: false, ignoreMissing: true } as never)
      .use(rehypeStringify)
      .process(body),
  );
  const headings = [...html.matchAll(/<h2 id="([^"]+)">(.*?)<\/h2>/g)].map((m) => ({
    id: m[1],
    text: m[2].replace(/<[^>]+>/g, ""),
  }));
  return { ...meta, html, headings };
}

export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}
