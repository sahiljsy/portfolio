import Link from "next/link";
import AgentTrace from "@/components/AgentTrace";
import {
  achievements,
  caseStudies,
  earlierProjects,
  experience,
  facts,
  leadership,
  profile,
  signalPath,
  skills,
} from "@/data/portfolio";
import { formatDate, getAllPosts } from "@/lib/posts";

// Bento sizes for the six case studies, in data order.
const WIDE = new Set([0, 3, 5]);

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <section className="hero wrap" aria-labelledby="hero-name">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="kicker">
              <span className="live-dot" aria-hidden="true" />
              {profile.role}
            </p>
            <h1 id="hero-name">{profile.name}</h1>
            <p className="intro">{profile.intro}</p>
            <div className="actions">
              <a className="btn primary" href={`mailto:${profile.email}`}>
                Email me
              </a>
              <a className="btn" href="/Sahil_Jariwala_Resume.pdf" download>
                Download resume
              </a>
              <a className="btn ghost" href={profile.linkedin}>
                LinkedIn
              </a>
              <a className="btn ghost" href={profile.github}>
                GitHub
              </a>
            </div>
          </div>
          <AgentTrace />
        </div>
      </section>

      <section className="wrap signal" aria-labelledby="signal-title">
        <h2 id="signal-title" className="signal-title">
          Where my work sits, from raw data to the screen
        </h2>
        <ol className="signal-track">
          {signalPath.map((stage) => (
            <li key={stage.name} className="stage spot">
              <h3>{stage.name}</h3>
              <ul>
                {stage.built.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="section wrap" id="about" aria-labelledby="about-title">
        <div className="about-grid">
          <figure className="portrait">
            <img src="/sahil.jpg" alt={`Portrait of ${profile.name}`} width={774} height={900} />
            <figcaption>{profile.location}</figcaption>
          </figure>
          <div>
            <h2 id="about-title">About</h2>
            <div className="prose">
              {profile.about.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <p className="looking">
                <strong>Looking for</strong> {profile.lookingFor}
              </p>
            </div>
          </div>
        </div>
        <dl className="facts">
          {facts.map((f) => (
            <div key={f.label} className="spot">
              <dt>{f.value}</dt>
              <dd>{f.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section wrap" id="work" aria-labelledby="work-title">
        <div className="section-head">
          <h2 id="work-title">Selected work</h2>
          <p>All built at Strique. The code is private, so each project page walks through the design.</p>
        </div>
        <ul className="bento">
          {caseStudies.map((c, i) => (
            <li key={c.slug} className={`card spot ${WIDE.has(i) ? "wide" : ""}`}>
              <Link href={`/work/${c.slug}/`}>
                <div className="card-top">
                  <span className="period">{c.period}</span>
                  {c.status && <span className="status">{c.status}</span>}
                </div>
                <h3>{c.title}</h3>
                <p>{c.summary}</p>
                {WIDE.has(i) && <p className="card-highlight">{c.impact[0]}</p>}
                <ul className="tags" aria-label="Tech stack">
                  {c.stack.slice(0, WIDE.has(i) ? 6 : 4).map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <span className="card-link">View case study</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section wrap" id="leadership" aria-labelledby="lead-title">
        <div className="split">
          <div className="section-head">
            <h2 id="lead-title">How I lead</h2>
            <p>Technical leadership without a formal title: reviews, mentoring and planning.</p>
          </div>
          <ul className="lead-list">
            {leadership.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section wrap" id="experience" aria-labelledby="exp-title">
        <div className="split">
          <div className="section-head">
            <h2 id="exp-title">Experience</h2>
            <p>About 3.5 years across two companies.</p>
          </div>
          <div>
            <ol className="timeline">
              {experience.map((j) => (
                <li key={j.company}>
                  <span className="when">
                    {j.period}, {j.place}
                  </span>
                  <h3>
                    {j.title}, <span className="company">{j.company}</span>
                  </h3>
                  <ul>
                    {j.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
            <h3 className="minor-title">Achievements</h3>
            <ul className="lead-list">
              {achievements.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section wrap" id="skills" aria-labelledby="skills-title">
        <div className="split">
          <div className="section-head">
            <h2 id="skills-title">Skills</h2>
          </div>
          <dl className="skills">
            {skills.map((s) => (
              <div key={s.group}>
                <dt>{s.group}</dt>
                <dd>
                  <ul className="tags">
                    {s.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="section wrap" id="writing" aria-labelledby="writing-title">
          <div className="section-head">
            <h2 id="writing-title">Writing</h2>
            <p>
              Production problems I've solved, written up. <Link href="/blog/">All posts</Link>
            </p>
          </div>
          <ul className="post-list">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}/`}>
                  <h3>{p.title}</h3>
                </Link>
                <div className="meta">
                  {formatDate(p.date)}, {p.readingMinutes} min read
                </div>
                <p>{p.summary}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="section wrap" id="earlier" aria-labelledby="earlier-title">
        <div className="section-head">
          <h2 id="earlier-title">Earlier projects</h2>
          <p>College and learning projects, 2021 to 2023.</p>
        </div>
        <ul className="mini-grid">
          {earlierProjects.map((p) => (
            <li key={p.title} className="spot">
              <a href={p.url}>
                <span className="period">{p.year}</span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <ul className="tags">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="contact wrap" id="contact" aria-labelledby="contact-title">
        <div className="contact-glow" aria-hidden="true" />
        <h2 id="contact-title">Building something with AI agents? Let's talk.</h2>
        <div className="actions">
          <a className="btn primary" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <a className="btn" href="/Sahil_Jariwala_Resume.pdf" download>
            Download resume
          </a>
          <a className="btn ghost" href={profile.linkedin}>
            LinkedIn
          </a>
        </div>
      </section>
    </>
  );
}
