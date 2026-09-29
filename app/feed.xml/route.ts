import { profile } from "@/data/portfolio";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const items = getAllPosts()
    .map(
      (p) => `<item><title>${esc(p.title)}</title><link>${profile.siteUrl}/blog/${p.slug}/</link><guid>${profile.siteUrl}/blog/${p.slug}/</guid><pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate><description>${esc(p.summary)}</description></item>`,
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(profile.name)}, writing</title><link>${profile.siteUrl}</link><description>Engineering write-ups by ${esc(profile.name)}</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
