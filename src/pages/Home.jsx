import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import { experience } from "../data/experience";
import { projects } from "../data/projects";
import { achievements } from "../data/achievements";
import { leadership } from "../data/leadership";
import { skillGroups } from "../data/skills";
import { Section, Reveal, ProjectCard, ExperienceCard, AchievementCard, LeadershipCard, TagList, usePageTitle } from "../components/ui";

export default function Home() {
  usePageTitle("");
  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <p className="kicker">{profile.headline}</p>
          <h1>{profile.name.toUpperCase()}</h1>
          <p className="lead">{profile.intro}</p>
          <div className="btn-row">
            <Link className="btn primary" to="/projects">View My Work</Link>
            {profile.resumeUrl && <a className="btn" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">View Resume ↗</a>}
            <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <Link className="btn" to="/contact">Contact Me</Link>
          </div>
        </div>
        <img className="hero-photo" src={profile.photo} alt="Portrait of Mehak Aggarwal (placeholder)" />
        <a className="scroll-hint" href="#snapshot">Scroll to explore ↓</a>
      </section>

      <section id="snapshot" className="stats">
        {profile.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <div className="stat"><strong>{s.value}</strong><span>{s.label}</span></div>
          </Reveal>
        ))}
      </section>

      <Section kicker="Experience" title="Featured Experience" viewAll="/experience">
        <div className="stack">{experience.filter((e) => e.featured).map((e, i) => <ExperienceCard key={e.id} item={e} delay={i * 80} />)}</div>
      </Section>

      <Section kicker="Projects" title="Featured Projects" viewAll="/projects">
        <div className="grid">{projects.filter((p) => p.featured).map((p, i) => <ProjectCard key={p.id} project={p} delay={i * 80} />)}</div>
      </Section>

      <Section kicker="Recognition" title="Selected Achievements" viewAll="/achievements">
        <div className="grid">{achievements.filter((a) => a.featured).slice(0, 4).map((a, i) => <AchievementCard key={a.id} item={a} delay={i * 80} />)}</div>
      </Section>

      <Section kicker="Leadership" title="Leadership & Activities" viewAll="/leadership">
        <div className="stack">{leadership.filter((l) => l.featured).map((l, i) => <LeadershipCard key={l.id} item={l} delay={i * 80} />)}</div>
      </Section>

      <Section kicker="Skills" title="Technical Skills" viewAll="/skills">
        <div className="grid small">
          {skillGroups.map((g, i) => (
            <Reveal key={g.name} delay={i * 60}><div className="card"><p className="meta">{g.name}</p><TagList tags={g.items} /></div></Reveal>
          ))}
        </div>
      </Section>

      <Section title="Let's talk">
        <Reveal>
          <div className="cta-panel">
            <p>Open to technology, cloud/DevOps, analyst and consulting roles.</p>
            <Link className="btn primary" to="/contact">Contact Me</Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
