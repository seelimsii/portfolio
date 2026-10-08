import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { profile } from "../data/profile";
import { projectCategories } from "../data/projects";

// Edit navigation here. `href` = external link, `to` = internal route.
const navGroups = [
  { label: "About", items: [{ to: "/about", text: "Profile" }, { to: "/education", text: "Education" }, { href: profile.resumeUrl, text: "Resume ↗" }] },
  { label: "Experience", items: [{ to: "/experience", text: "Work & Internships" }] },
  { label: "Projects", items: [{ to: "/projects", text: "All Projects" }, ...projectCategories.map((c) => ({ to: `/projects?category=${encodeURIComponent(c)}`, text: c }))] },
  { label: "Leadership", items: [{ to: "/leadership", text: "Positions & Societies" }] },
  { label: "Achievements", items: [{ to: "/achievements", text: "Awards, Hackathons & Certificates" }] },
  { label: "Skills", items: [{ to: "/skills", text: "Technical & Soft Skills" }] },
  { label: "Contact", items: [{ to: "/contact", text: "Get in touch" }, { href: profile.linkedin, text: "LinkedIn ↗" }] },
];

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the drawer on navigation and scroll to top.
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="topbar">
        <button className="menu-btn" aria-label="Open navigation" aria-expanded={open} onClick={() => setOpen(true)}>
          <span /><span /><span />
        </button>
        <Link to="/" className="brand">{profile.name}</Link>
      </header>

      <div className={`overlay ${open ? "show" : ""}`} onClick={() => setOpen(false)} />
      <nav className={`drawer ${open ? "open" : ""}`} aria-label="Main navigation" aria-hidden={!open}>
        <button className="close-btn" aria-label="Close navigation" onClick={() => setOpen(false)}>✕</button>
        <NavLink to="/" end className="drawer-home" tabIndex={open ? 0 : -1}>Home</NavLink>
        {navGroups.map((group) => (
          <div className="nav-group" key={group.label}>
            <p className="nav-label">{group.label}</p>
            {group.items.filter((i) => i.to || i.href).map((item) =>
              item.to ? (
                <NavLink key={item.text} to={item.to} end tabIndex={open ? 0 : -1}>{item.text}</NavLink>
              ) : (
                <a key={item.text} href={item.href} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>{item.text}</a>
              )
            )}
          </div>
        ))}
      </nav>

      <main id="main" key={location.pathname} className="page">{children}</main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={`mailto:${profile.email}`}>Email</a>
      </footer>
    </>
  );
}
