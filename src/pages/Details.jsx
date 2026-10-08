import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import { experience } from "../data/experience";
import { leadership } from "../data/leadership";
import { achievementsForProject, achievementsForLeadership } from "../data/index";
import { PageHeader, TagList, LinkButtons, CertificateButton, Section } from "../components/ui";
import { NotFound } from "./Static";

// Renders a titled block only when it has content.
function Block({ title, children, show = true }) {
  if (!show) return null;
  return <section className="block"><h2>{title}</h2>{children}</section>;
}
const BulletList = ({ items }) => <ul className="bullets">{items.map((i) => <li key={i}>{i}</li>)}</ul>;
const has = (arr) => Array.isArray(arr) && arr.length > 0;

export function ProjectDetail() {
  const project = projects.find((p) => p.id === useParams().id);
  if (!project) return <NotFound />;
  const related = achievementsForProject(project.id);
  return (
    <>
      <PageHeader kicker={`${project.category}${project.date ? " · " + project.date : ""}`} title={project.title} intro={project.summary} />
      <div className="btn-row">
        {project.links.map((l, i) => <a key={l.url} className={`btn ${i === 0 ? "primary" : ""}`} href={l.url} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>)}
        {related.map((a) => <CertificateButton key={a.id} achievement={a} label={`Certificate: ${a.title}`} />)}
      </div>
      <Block title="Problem / Motivation" show={!!project.problem}><p>{project.problem}</p></Block>
      <Block title="Approach" show={!!project.approach}><p>{project.approach}</p></Block>
      <Block title="Key Contributions" show={has(project.highlights)}><BulletList items={project.highlights} /></Block>
      <Block title="Results" show={has(project.results)}><BulletList items={project.results} /></Block>
      <Block title="My Role" show={!!project.role}><p>{project.role}</p></Block>
      <Block title="Technologies" show={has(project.tech)}><TagList tags={project.tech} /></Block>
      <Block title="Recognition" show={has(related)}>
        <BulletList items={related.map((a) => `${a.title} (${a.issuer}, ${a.date})`)} />
      </Block>
    </>
  );
}

export function ExperienceDetail() {
  const item = experience.find((e) => e.id === useParams().id);
  if (!item) return <NotFound />;
  return (
    <>
      <PageHeader kicker={[item.company, item.type, item.dates].filter(Boolean).join(" · ")} title={item.role} intro={item.summary} />
      <img className="logo large" src={item.logo} alt={`${item.company} logo`} />
      <Block title="Responsibilities & Achievements" show={has(item.highlights)}><BulletList items={item.highlights} /></Block>
      <Block title="Technologies & Tools" show={has(item.tech)}><TagList tags={item.tech} /></Block>
      <Block title="What I Learned" show={has(item.learned)}><BulletList items={item.learned || []} /></Block>
      <Link className="view-all" to="/experience">← All experience</Link>
    </>
  );
}

export function LeadershipDetail() {
  const item = leadership.find((l) => l.id === useParams().id);
  if (!item) return <NotFound />;
  const related = achievementsForLeadership(item.id);
  return (
    <>
      <PageHeader kicker={item.org} title={item.roles[0].title} intro={item.summary} />
      <Block title="Roles"><BulletList items={item.roles.map((r) => `${r.title}: ${r.dates}`)} /></Block>
      <Block title="Responsibilities & Achievements" show={has(item.highlights)}><BulletList items={item.highlights} /></Block>
      <Block title="Skills Demonstrated" show={has(item.skills)}><TagList tags={item.skills} /></Block>
      <LinkButtons links={item.links} />
      <div className="btn-row">{related.map((a) => <CertificateButton key={a.id} achievement={a} label={a.title} />)}</div>
    </>
  );
}
