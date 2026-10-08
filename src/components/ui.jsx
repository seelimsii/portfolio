import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Mehak Aggarwal` : "Mehak Aggarwal";
  }, [title]);
}

// Fades children in when they scroll into view.
export function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), { threshold: 0.12 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${visible ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function Section({ title, kicker, viewAll, children }) {
  return (
    <section className="section">
      <Reveal>
        <div className="section-head">
          <div>
            {kicker && <p className="kicker">{kicker}</p>}
            <h2>{title}</h2>
          </div>
          {viewAll && <Link className="view-all" to={viewAll}>View all →</Link>}
        </div>
      </Reveal>
      {children}
    </section>
  );
}

export function PageHeader({ kicker, title, intro }) {
  usePageTitle(title);
  return (
    <div className="page-header">
      {kicker && <p className="kicker">{kicker}</p>}
      <h1>{title}</h1>
      {intro && <p className="lead">{intro}</p>}
    </div>
  );
}

export function TagList({ tags = [] }) {
  if (!tags.length) return null;
  return <ul className="tags">{tags.map((t) => <li key={t}>{t}</li>)}</ul>;
}

// Renders only the links that exist. The first one is the primary action.
export function LinkButtons({ links = [] }) {
  if (!links.length) return null;
  return (
    <div className="btn-row">
      {links.map((l, i) => (
        <a key={l.url} className={`btn ${i === 0 ? "primary" : ""}`} href={l.url} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>
      ))}
    </div>
  );
}

// Certificate button that opens an in-page lightbox.
export function CertificateButton({ achievement, label = "View Certificate" }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  if (!achievement.image) return null;
  return (
    <>
      <button className="btn" onClick={() => setOpen(true)}>{label}</button>
      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={achievement.title} onClick={() => setOpen(false)}>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={achievement.image} alt={`Certificate: ${achievement.title}`} />
            <figcaption>{achievement.title} · {achievement.issuer}</figcaption>
            <button className="btn primary" autoFocus onClick={() => setOpen(false)}>Close</button>
          </figure>
        </div>
      )}
    </>
  );
}

export function ProjectCard({ project, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <Link to={`/projects/${project.id}`} className="card project-card">
        <img src={project.images?.[0]} alt={`${project.title} preview`} loading="lazy" />
        <div className="card-body">
          <p className="meta">{project.category}{project.date && ` · ${project.date}`}</p>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
          <TagList tags={project.tech?.slice(0, 4)} />
        </div>
      </Link>
    </Reveal>
  );
}

export function ExperienceCard({ item, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <Link to={`/experience/${item.id}`} className="card row-card">
        <img className="logo" src={item.logo} alt={`${item.company} logo`} loading="lazy" />
        <div>
          <h3>{item.role}</h3>
          <p className="meta">{[item.company, item.type, item.dates].filter(Boolean).join(" · ")}</p>
          <p>{item.summary}</p>
        </div>
      </Link>
    </Reveal>
  );
}

export function AchievementCard({ item, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <article className="card achievement">
        <p className="meta">{[item.issuer, item.date].filter(Boolean).join(" · ")}</p>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className="btn-row">
          <CertificateButton achievement={item} label={item.type === "recommendation" ? "View Letter" : "View Certificate"} />
          {item.projectId && <Link className="btn" to={`/projects/${item.projectId}`}>Related Project</Link>}
          {item.leadershipId && <Link className="btn" to={`/leadership/${item.leadershipId}`}>Related Role</Link>}
        </div>
      </article>
    </Reveal>
  );
}

export function LeadershipCard({ item, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <Link to={`/leadership/${item.id}`} className="card row-card">
        <img className="logo" src={item.logo} alt={`${item.short} logo`} loading="lazy" />
        <div>
          <h3>{item.roles[0].title}, {item.short}</h3>
          <p className="meta">{item.roles.map((r) => r.dates).join(" · ")}</p>
          <p>{item.summary}</p>
        </div>
      </Link>
    </Reveal>
  );
}
