import { useSearchParams } from "react-router-dom";
import { projects, projectCategories } from "../data/projects";
import { experience } from "../data/experience";
import { leadership } from "../data/leadership";
import { achievements, achievementTypes } from "../data/achievements";
import { PageHeader, ProjectCard, ExperienceCard, LeadershipCard, AchievementCard } from "../components/ui";

function FilterTabs({ options, active, onChange }) {
  return (
    <div className="filters" role="tablist">
      {options.map((o) => (
        <button key={o.key} role="tab" aria-selected={active === o.key} className={active === o.key ? "active" : ""} onClick={() => onChange(o.key)}>{o.label}</button>
      ))}
    </div>
  );
}

export function ProjectsPage() {
  const [params, setParams] = useSearchParams();
  const active = params.get("category") || "all";
  const options = [{ key: "all", label: "All" }, ...projectCategories.map((c) => ({ key: c, label: c }))];
  const visible = active === "all" ? projects : projects.filter((p) => p.category === active);
  return (
    <>
      <PageHeader kicker="Projects" title="Selected Work" intro="Research, cloud infrastructure, machine learning and analytics projects." />
      <FilterTabs options={options} active={active} onChange={(k) => setParams(k === "all" ? {} : { category: k })} />
      <div className="grid">{visible.map((p, i) => <ProjectCard key={p.id} project={p} delay={i * 50} />)}</div>
    </>
  );
}

export function ExperiencePage() {
  return (
    <>
      <PageHeader kicker="Experience" title="Work & Internships" intro="Most recent first." />
      <div className="timeline">{experience.map((e, i) => <ExperienceCard key={e.id} item={e} delay={i * 60} />)}</div>
    </>
  );
}

export function LeadershipPage() {
  return (
    <>
      <PageHeader kicker="Leadership" title="Positions of Responsibility & Activities" />
      <div className="stack">{leadership.map((l, i) => <LeadershipCard key={l.id} item={l} delay={i * 60} />)}</div>
    </>
  );
}

export function AchievementsPage() {
  const [params, setParams] = useSearchParams();
  const active = params.get("type") || "all";
  const visible = active === "all" ? achievements : achievements.filter((a) => a.type === active);
  return (
    <>
      <PageHeader kicker="Achievements" title="Awards, Hackathons & Certificates" />
      <FilterTabs options={achievementTypes} active={active} onChange={(k) => setParams(k === "all" ? {} : { type: k })} />
      <div className="grid">{visible.map((a, i) => <AchievementCard key={a.id} item={a} delay={i * 50} />)}</div>
    </>
  );
}
