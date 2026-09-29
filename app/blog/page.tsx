import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: "Engineering write-ups on AI agents, context management, latency and data platforms.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const tags = [...new Set(posts.flatMap((p) => p.tags))].sort();

  return (
    <div className="page wrap">
      <h1 className="page-title">Writing</h1>
      <p className="lede">Production problems I've solved while building AI agents and data platforms.</p>
      {tags.length > 0 && (
        <ul className="tags" aria-label="Topics" style={{ margin: "20px 0 40px" }}>
          {tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}
      {posts.length === 0 ? (
        <p>Posts are on the way.</p>
      ) : (
        <ul className="post-list">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}/`}>
                <h3>{p.title}</h3>
              </Link>
              <div className="meta">
                {formatDate(p.date)}, {p.readingMinutes} min read, {p.tags.join(", ")}
                {p.draft && <span className="status">Draft</span>}
              </div>
              <p>{p.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
