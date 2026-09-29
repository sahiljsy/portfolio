import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Mermaid from "@/components/Mermaid";
import { caseStudies } from "@/data/portfolio";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.slug === slug);
  return c ? { title: c.title, description: c.summary } : {};
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const index = caseStudies.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();
  const c = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <article className="page wrap">
      <Link href="/#work" className="back">
        Back to all work
      </Link>
      <h1 className="page-title">{c.title}</h1>
      <p className="lede">{c.summary}</p>

      <dl className="facts-row">
        <dt>When</dt>
        <dd>
          {c.period}
          {c.status && <span className="status">{c.status}</span>}
        </dd>
        <dt>My role</dt>
        <dd>{c.role}</dd>
        <dt>Stack</dt>
        <dd>{c.stack.join(", ")}</dd>
        <dt>Where</dt>
        <dd>Built at Strique. The code is private.</dd>
      </dl>

      <section className="section" aria-labelledby="arch">
        <h2 id="arch">How it fits together</h2>
        <Mermaid chart={c.diagram} />
      </section>

      <section className="section" aria-labelledby="did" style={{ paddingTop: 40 }}>
        <h2 id="did" style={{ marginBottom: 20 }}>
          What I did
        </h2>
        <ul className="impact">
          {c.impact.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="hard" style={{ paddingTop: 40 }}>
        <div className="callout">
          <h3 id="hard">Hardest problem: {c.hardest.title}</h3>
          <p>{c.hardest.body}</p>
        </div>
      </section>

      <p style={{ marginTop: 56 }}>
        Next project: <Link href={`/work/${next.slug}/`}>{next.title}</Link>
      </p>
    </article>
  );
}
