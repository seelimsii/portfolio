import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import { education } from "../data/education";
import { skillGroups, softSkills } from "../data/skills";
import { PageHeader, Reveal, TagList } from "../components/ui";

export function AboutPage() {
  return (
    <>
      <PageHeader kicker="About" title="Profile" intro={profile.intro} />
      <div className="btn-row">
        {profile.resumeUrl && <a className="btn primary" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">View Resume ↗</a>}
        <Link className="btn" to="/education">Education</Link>
      </div>
    </>
  );
}

export function EducationPage() {
  return (
    <>
      <PageHeader kicker="About" title="Education" />
      <div className="stack">
        {education.map((e, i) => (
          <Reveal key={e.id} delay={i * 60}>
            <div className="card"><h3>{e.degree}</h3><p className="meta">{e.school} · {e.dates}</p>{e.note && <p>{e.note}</p>}</div>
          </Reveal>
        ))}
      </div>
    </>
  );
}

export function SkillsPage() {
  return (
    <>
      <PageHeader kicker="Skills" title="Technical & Soft Skills" />
      <div className="grid small">
        {skillGroups.map((g, i) => <Reveal key={g.name} delay={i * 50}><div className="card"><p className="meta">{g.name}</p><TagList tags={g.items} /></div></Reveal>)}
      </div>
      <h2 className="subhead">Beyond the tools</h2>
      <div className="grid small">
        {softSkills.map((s, i) => (
          <Reveal key={s.name} delay={i * 50}>
            <Link className="card" to={s.link}><h3>{s.name}</h3><p>{s.evidence}</p></Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}

export function ContactPage() {
  return (
    <>
      <PageHeader kicker="Contact" title="Get in touch" intro="Email is the quickest way to reach me; LinkedIn works too." />
      <div className="btn-row">
        <a className="btn primary" href={`mailto:${profile.email}`}>{profile.email}</a>
        <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
      </div>
    </>
  );
}

export function NotFound() {
  return <PageHeader title="Page not found" intro="That page doesn't exist. Use the menu or head back home." />;
}
