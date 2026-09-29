import type { Metadata } from "next";
import Link from "next/link";
import { Bricolage_Grotesque, JetBrains_Mono, Public_Sans } from "next/font/google";
import Spotlight from "@/components/Spotlight";
import { profile } from "@/data/portfolio";
import { getAllPosts } from "@/lib/posts";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Public_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const description = `${profile.name}, ${profile.role.toLowerCase()} focused on ${profile.focus}. ${profile.intro}`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: `${profile.name} | ${profile.role}`, template: `%s | ${profile.name}` },
  description,
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description,
    url: profile.siteUrl,
    siteName: profile.name,
    images: [{ url: "/sahil.jpg", width: 774, height: 900, alt: profile.name }],
    type: "website",
  },
  twitter: { card: "summary", title: profile.name, description },
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const hasPosts = getAllPosts().length > 0;
  return (
    <html lang="en" data-theme="dark" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <Spotlight />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <header className="site-header">
          <div className="header-glass" aria-hidden="true" />
          <div className="wrap">
            <Link href="/" className="brand">
              {profile.name}
            </Link>
            <nav className="nav" aria-label="Main">
              <Link href="/#work">Work</Link>
              {hasPosts && <Link href="/blog/">Writing</Link>}
              <Link href="/#experience" className="hide-sm">
                Experience
              </Link>
              <Link href="/#contact" className="nav-cta">
                Contact
              </Link>
            </nav>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div className="wrap">
            <span>
              © {new Date().getFullYear()} {profile.name}
            </span>
            <span>
              <a href={profile.linkedin}>LinkedIn</a> · <a href={profile.github}>GitHub</a> ·{" "}
              <a href={`mailto:${profile.email}`}>Email</a>
              {hasPosts && (
                <>
                  {" "}
                  · <a href="/feed.xml">RSS</a>
                </>
              )}
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
