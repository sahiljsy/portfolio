import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Mermaid from "@/components/Mermaid";
import { formatDate, getAllPosts, getPost } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getAllPosts();
  // Static export needs at least one param; the placeholder renders a 404.
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "coming-soon" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return post ? { title: post.title, description: post.summary } : {};
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="page wrap">
      <Link href="/blog/" className="back">
        All writing
      </Link>
      <h1 className="page-title">{post.title}</h1>
      <div className="meta">
        {formatDate(post.date)}, {post.readingMinutes} min read, {post.tags.join(", ")}
        {post.draft && <span className="status">Draft, not public</span>}
      </div>
      <div className="article-layout" style={{ marginTop: 36 }}>
        <article className="article" dangerouslySetInnerHTML={{ __html: post.html }} />
        {post.headings.length > 2 && (
          <nav className="toc" aria-label="On this page">
            <p>On this page</p>
            <ol>
              {post.headings.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`}>{h.text}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
      <Mermaid scope=".article" />
    </div>
  );
}
