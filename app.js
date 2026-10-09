
import {
  site, stats, focusAreas, experience, projects, achievements,
  leadership, education, training, skills, certifications, photoGallery
} from "./data.js";

const app = document.querySelector("#app");

const esc = (value = "") =>
  String(value).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[c]));

const BASE_PATH = "/portfolio";
const path = () => {
  const params = new URLSearchParams(window.location.search);
  if (params.has("route")) return params.get("route") || "/";
  let pathname = window.location.pathname;
  if (pathname === BASE_PATH || pathname === `${BASE_PATH}/`) return "/";
  if (pathname.startsWith(`${BASE_PATH}/`)) pathname = pathname.slice(BASE_PATH.length);
  return pathname.replace(/\/+$/, "") || "/";
};
const go = (url) => {
  const [route, query = ""] = url.split("?");
  const localRoute = route.startsWith(BASE_PATH) ? route : `${BASE_PATH}${route === "/" ? "/" : route}`;
  const destination = query ? `${localRoute}?${query}` : localRoute;
  window.history.pushState({}, "", destination);
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

function external(url, label) {
  if (!url) return `<button class="btn ghost" data-missing-link="${esc(label)}">${esc(label)} <span>↗</span></button>`;
  return `<a class="btn ghost" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} <span>↗</span></a>`;
}

function nav() {
  return `
    <header class="topbar">
      <a class="brand" href="/" data-route><span class="brand-mark">M</span><span>Mehak Aggarwal</span></a>
      <button class="menu-btn" id="menuBtn" aria-label="Open navigation"><span class="menu-lines"></span></button>
    </header>

    <div class="drawer-backdrop" id="drawerBackdrop"></div>
    <aside class="drawer" id="drawer" aria-label="Site navigation">
      <div class="drawer-head">
        <div>
          <div class="eyebrow">Portfolio</div>
          <strong style="font-size:18px">Mehak Aggarwal</strong>
        </div>
        <button class="close-btn" id="closeDrawer" aria-label="Close navigation">×</button>
      </div>

      ${navGroup("Explore", [
        ["/", "Home"], ["/about", "Profile"], ["/education", "Education"], ["/resume", "Resume"], ["/gallery", "Personal Gallery"]
      ])}
      ${navGroup("Experience", experience.map(x => [`/experience/${x.id}`, x.company]))}
      ${navGroup("Projects", [
        ["/projects", "All Projects"],
        ["/projects?filter=Cloud%20%26%20DevOps", "Cloud & DevOps"],
        ["/projects?filter=AI%20%2F%20ML%20%26%20Research", "AI / ML & Research"],
        ["/projects?filter=Research", "Research"],
        ["/projects?filter=Hackathon", "Hackathons"]
      ])}
      ${navGroup("Leadership & Activities", [
        ["/leadership", "Leadership"],
        ...leadership.slice(0,4).map(x => [`/leadership/${x.id}`, x.role + " — " + x.organization.split(" — ")[0]])
      ])}
      ${navGroup("Achievements", [
        ["/achievements", "Awards & Achievements"],
        ["/certifications", "Certifications & Training"]
      ])}
      ${navGroup("Skills", [
        ["/skills", "Technical + Business + Soft Skills"]
      ])}
      ${navGroup("Connect", [
        ["/contact", "Contact"],
        [site.linkedin, "LinkedIn"]
      ], true)}
    </aside>
  `;
}

function navGroup(label, links, externalLinks = false) {
  return `<div class="nav-group"><div class="nav-label">${esc(label)}</div>${
    links.map(([href, text]) => externalLinks || href.startsWith("http")
      ? `<a class="nav-link" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(text)}<span>↗</span></a>`
      : `<a class="nav-link" href="${esc(href)}" data-route>${esc(text)}<span>→</span></a>`
    ).join("")
  }</div>`;
}

function layout(content) {
  return `${nav()}<main>${content}</main>${footer()}${modal()}`;
}

function footer() {
  return `
    <footer class="footer">
      <div class="container footer-grid">
        <div>
          <div class="brand"><span class="brand-mark">M</span><span>Mehak Aggarwal</span></div>
          <p>A professional portfolio spanning technology, Cloud/DevOps, business-facing analysis, research and leadership.</p>
        </div>
        <div class="footer-links">
          <a href="${site.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href="${site.github}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href="mailto:${site.email}">Email ↗</a>
        </div>
      </div>
      <div class="container footer-note">This website was created with help from ChatGPT and is still under development. If you notice any discrepancies, please email <a href="mailto:${site.email}">${site.email}</a>.</div>
    </footer>
  `;
}

function modal() {
  return `<div class="modal" id="modal"><div class="modal-card"><button class="modal-close" id="modalClose">×</button><div id="modalBody"></div></div></div>`;
}

function home() {
  const featuredExp = experience.filter(x => x.featured);
  const featuredProjects = ["rice-disease", "cloud-native-eks", "jitsi-aws"].map(id => projects.find(x => x.id === id)).filter(Boolean);
  return layout(`
    <section class="hero">
      <div class="container">
        <div class="hero-grid">
          <div class="reveal">
            <div class="eyebrow">Computer Science · Technology × Business</div>
            <h1>Mehak <span class="gradient-text">Aggarwal</span></h1>
            <div class="hero-title">${esc(site.headline)}</div>
            <p class="hero-copy">${esc(site.intro)}</p>
            <div class="ctas">
              <a class="btn primary" href="/experience" data-route>Explore my work →</a>
              <a class="btn" href="/resume" data-route>View Resume ↗</a>
              <a class="btn" href="${site.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              <a class="btn ghost" href="/contact" data-route>Let's connect</a>
            </div>
            <div class="stats">
              ${stats.map(s => `<div class="stat"><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`).join("")}
            </div>
          </div>
          <div class="hero-photo reveal">
            <img class="profile-photo" src="/portfolio/public/images/profile/mehak.jpg" alt="Mehak Aggarwal" loading="eager" />
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="section-head reveal">
          <div><div class="section-kicker">01 / Profile</div><h2>Technical depth. Business awareness. People skills.</h2></div>
          <p class="section-intro">The portfolio is intentionally positioned across technology and business-facing roles rather than as a single-track DevOps profile.</p>
        </div>
        <div class="feature-grid">
          ${focusAreas.map((x,i) => `
            <article class="card reveal"><div class="card-body">
              <div class="card-meta">0${i+1}</div>
              <div class="card-title" style="margin-top:8px">${esc(x.title)}</div>
              <p>${esc(x.text)}</p>
              <div class="pill-row">${x.tags.map(t=>`<span class="pill">${esc(t)}</span>`).join("")}</div>
            </div></article>`).join("")}
        </div>
      </div>
    </section>

    <section class="home-skills-section">
      <div class="container">
        <div class="section-head reveal"><div><div class="section-kicker">02 / Skills</div><h2>Skills I bring to the table.</h2></div><a class="btn ghost" href="/skills" data-route>Explore all skills →</a></div>
        <div class="home-skills-grid">
          ${[["Cloud & DevOps", [...skills.cloud, ...skills.devops].slice(0,9)], ["Business & Analytical", skills.business.slice(0,6)], ["Communication & Leadership", skills.soft.slice(0,7)]].map(([title,items])=>`<article class="skill-card reveal"><h3>${esc(title)}</h3><div class="skill-list">${items.map(item=>`<span class="skill-chip emphasis">${esc(item)}</span>`).join("")}</div></article>`).join("")}
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="section-head reveal">
          <div><div class="section-kicker">03 / Experience</div><h2>Where I've worked.</h2></div>
          <a class="btn ghost" href="/about" data-route>View profile →</a>
        </div>
        <div class="timeline">
          ${featuredExp.map(x => experienceCard(x)).join("")}
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="section-head reveal">
          <div><div class="section-kicker">04 / Selected work</div><h2>Projects with a reason to exist.</h2></div>
          <a class="btn ghost" href="/projects" data-route>All projects →</a>
        </div>
        <div class="feature-grid">${featuredProjects.map(projectCard).join("")}</div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="section-head reveal">
          <div><div class="section-kicker">05 / Recognition</div><h2>Evidence beyond the job title.</h2></div>
          <a class="btn ghost" href="/achievements" data-route>All achievements →</a>
        </div>
        <div class="award-grid">${["research-display", "best-poster", "sih-college", "dpbh"].map(id => achievements.find(x => x.id === id)).filter(Boolean).map(awardCard).join("")}</div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="section-head reveal">
          <div><div class="section-kicker">06 / Leadership</div><h2>Taking responsibility outside the job description.</h2></div>
          <a class="btn ghost" href="/leadership" data-route>View leadership →</a>
        </div>
        <div class="feature-grid">${[leadership.find(x=>x.id==="ehsaas"), leadership.find(x=>x.id==="ordinateur"), leadership.find(x=>x.id==="bitwise")].filter(Boolean).map(leadershipCard).join("")}</div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="section-head reveal"><div><div class="section-kicker">07 / Credentials</div><h2>Training & certifications.</h2></div><a class="btn ghost" href="/certifications" data-route>All credentials →</a></div>
        <div class="feature-grid credential-feature-grid">
          <article class="card reveal credential-feature"><div class="credential-brand infosys-brand">i</div><div class="card-body"><div class="card-meta">Workplace training</div><div class="card-title" style="margin-top:8px">Infosys Training</div><p>DevOps, AWS, Aviation Domain and Cyber Security training completed as part of the United Airlines onboarding.</p><a class="card-link" href="/experience/united-airlines" data-route>Related experience →</a></div></article>
          <article class="card reveal credential-feature"><div class="credential-brand ducat-brand">DUCAT</div><div class="card-body"><div class="card-meta">Professional training · 2023–2024</div><div class="card-title" style="margin-top:8px">Cloud Computing — Full</div><p>Offline course completed at DUCAT School of AI.</p><a class="card-link" href="/portfolio/public/images/certificates/ducat-cloud-computing-certificate.pdf" target="_blank" rel="noopener noreferrer">Open certificate ↗</a></div></article>
          <article class="card reveal credential-feature"><div class="credential-brand apexa-brand">Apexa<span>IQ</span></div><div class="card-body"><div class="card-meta">Tool training</div><div class="card-title" style="margin-top:8px">Apexa-IQ</div><p>IT asset management tool exposure during the Blu Parrot internship.</p><a class="card-link" href="/experience/blu-parrot" data-route>Related experience →</a></div></article>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="section-head reveal"><div><div class="section-kicker">08 / Beyond work</div><h2>A few things that make me, me.</h2></div><a class="btn ghost" href="/gallery" data-route>Open photo gallery →</a></div>
        <div class="feature-grid">${["Fictional novels & stories","Badminton","Organising events","Volunteering for social work","Calligraphy","Art & craft"].map((x,i)=>`<article class="card reveal"><div class="card-body"><div class="card-meta">0${i+1}</div><div class="card-title" style="margin-top:8px">${x}</div></div></article>`).join("")}</div>
        <div class="gallery-grid home-gallery">${photoGallery.slice(0,4).map(x=>`<figure class="gallery-item reveal"><img src="${esc(x.src)}" alt="${esc(x.title)}" loading="lazy"><figcaption><strong>${esc(x.title)}</strong><span>${esc(x.note)}</span></figcaption></figure>`).join("")}</div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="panel reveal" style="padding:40px">
          <div class="section-kicker">06 / Connect</div>
          <h2>Looking for the next problem worth solving.</h2>
          <p class="section-intro">Open to opportunities across Cloud/DevOps, technology, business analysis, consulting and related roles where technical understanding and people skills matter together.</p>
          <div class="ctas">${external(site.linkedin,"LinkedIn")}<a class="btn primary" href="mailto:${site.email}">Email me →</a></div>
        </div>
      </div>
    </section>
  `);
}

function experienceCard(x) {
  return `<div class="timeline-item reveal">
    <span class="timeline-dot"></span>
    <article class="experience-card">
      <div class="exp-head">
        <div class="company">
          <div class="company-logo" aria-label="${esc(x.company)}">${esc(x.initials)}</div>
          <div><h3>${esc(x.company)}</h3><p>${esc(x.role)}</p></div>
        </div>
        <div class="date">${esc(x.dates)}<br>${esc(x.location)}</div>
      </div>
      ${x.image ? `<a class="experience-photo-link" href="/experience/${x.id}" data-route aria-label="View ${esc(x.company)} experience"><img class="experience-photo" src="${esc(x.image)}" alt="${esc(x.imageAlt || (x.company + ' experience photo'))}" loading="lazy"></a>` : ""}
      <p style="color:#aebdcd;font-size:13px;margin:18px 0 0">${esc(x.summary)}</p>
      <ul class="bullets">${x.bullets.slice(0,3).map(b=>`<li>${esc(b)}</li>`).join("")}</ul>
      <a class="mini-link" href="/experience/${x.id}" data-route>View experience →</a>
    </article>
  </div>`;
}

function projectCard(x) {
  return `<article class="card reveal">
    <div class="card-body">
      <div class="card-top"><div><div class="card-meta">${esc(x.date)}</div><div class="card-title" style="margin-top:8px">${esc(x.title)}</div></div><span class="tag">${esc(x.category)}</span></div>
      <p>${esc(x.summary)}</p>
      <div class="pill-row">${x.technologies.slice(0,5).map(t=>`<span class="pill">${esc(t)}</span>`).join("")}</div>
      <a class="card-link" href="/projects/${x.id}" data-route>Open project ↗</a>
    </div>
  </article>`;
}

function awardCard(x) {
  return `<article class="award reveal">
    <div class="card-meta">${esc(x.date)} · ${esc(x.type)}</div>
    <h3 style="margin-top:8px">${esc(x.title)}</h3>
    <div class="issuer">${esc(x.issuer)}</div>
    <p>${esc(x.description)}</p>
    ${x.relatedProject ? `<a class="mini-link" href="/projects/${x.relatedProject}" data-route>Related project →</a>` : ""}
    <button class="mini-link" data-certificate="${x.id}" style="background:none;border:0;padding:0;cursor:pointer">View certificate →</button>
  </article>`;
}

function leadershipCard(x) {
  return `<article class="card reveal"><div class="card-body">
    <div class="card-top"><div class="company"><div class="company-logo">${esc(x.initials)}</div><div><div class="card-title">${esc(x.role)}</div><div class="card-meta">${esc(x.organization)}</div></div></div></div>
    <p>${esc(x.description)}</p>
    <a class="card-link" href="/leadership/${x.id}" data-route>View role →</a>
  </div></article>`;
}

function pageHero(kicker, title, intro) {
  return `<section class="page-hero"><div class="container reveal"><div class="breadcrumb">${esc(kicker)}</div><h1 style="font-size:clamp(2.8rem,7vw,5.8rem);margin:0;letter-spacing:-.07em;line-height:.96">${esc(title)}</h1><p class="hero-copy" style="margin-top:22px">${esc(intro)}</p></div></section>`;
}

function aboutPage() {
  return layout(`
    ${pageHero("About / Profile", "A technologist who understands the people side of technology.", "My profile sits between Cloud/DevOps, technology, business-facing analysis, research and leadership.")}
    <section><div class="container">
      <div class="snapshot">
        <div class="panel reveal">
          <div class="section-kicker">Profile</div><h2 style="font-size:2rem">Technology is only part of the work.</h2>
          <p>I am a Computer Science graduate with practical experience in cloud and DevOps environments alongside business-facing analyst work, research and student leadership. I am interested in roles where I can combine technical understanding with structured thinking, communication and coordination.</p>
        </div>
        <div class="panel reveal">
          <div class="section-kicker">How I work</div><h2 style="font-size:2rem">Understand → structure → execute → communicate.</h2>
          <p>My strongest evidence comes from real project deployment, cloud operations, research, client interaction, process coordination and leadership roles. I prefer practical problem solving over collecting technology names.</p>
        </div>
      </div>
    </div></section>
  `);
}

function educationPage() {
  return layout(`
    ${pageHero("About / Education", "Education & professional training.", "Academic foundations in Computer Science, complemented by practical technical training.")}
    <section><div class="container">
      <div class="timeline">
        ${education.map(e=>`<div class="timeline-item reveal"><span class="timeline-dot"></span><article class="experience-card"><div class="exp-head"><div><h3>${esc(e.institution)}</h3><p style="color:#aebdcd">${esc(e.degree)}</p></div><div class="date">${esc(e.dates)}</div></div></article></div>`).join("")}
        ${training.map(t=>`<div class="timeline-item reveal"><span class="timeline-dot"></span><article class="experience-card"><div class="exp-head"><div><h3>${esc(t.provider)}</h3><p style="color:#aebdcd">${esc(t.title)} · ${esc(t.type)}</p></div><div class="date">Professional Training</div></div><p style="color:#aebdcd;font-size:13px;margin-top:15px">${esc(t.description)}</p></article></div>`).join("")}
      </div>
    </div></section>
  `);
}

function resumePage() {
  return layout(`
    ${pageHero("About / Resume", "Resume", "A concise overview of experience, education, projects and technical skills.")}
    <section><div class="container"><div class="panel reveal" style="max-width:760px;margin:auto;text-align:center">
      <div class="section-kicker">Resume PDF</div><h2 style="font-size:2.2rem">Mehak Aggarwal — Resume</h2>
      <p class="section-intro" style="margin:0 auto">Open or save the resume PDF.</p>
      <div class="ctas" style="justify-content:center"><a class="btn primary" href="/portfolio/public/images/documents/mehak-aggarwal-resume.pdf" target="_blank" rel="noopener noreferrer">Open Resume ↗</a><a class="btn ghost" href="/portfolio/public/images/documents/mehak-aggarwal-resume.pdf" download>Download PDF ↓</a></div>
    </div></div></section>
  `);
}

function projectsPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const currentFilter = urlParams.get("filter") || "All";
  const filters = ["All", "Cloud & DevOps", "AI / ML & Research", "Research", "Hackathon"];
  const filtered = currentFilter === "All" ? projects : projects.filter(p => p.category === currentFilter);
  return layout(`
    ${pageHero("Work / Projects", "Selected work.", "A curated set of technical, research and hackathon work. Projects without useful professional value have deliberately been left out.")}
    <section><div class="container">
      <div class="filter-row">
        ${filters.map(f=>`<button class="filter ${currentFilter===f?"active":""}" data-filter="${esc(f)}">${esc(f)}</button>`).join("")}
      </div>
      <div class="feature-grid">${filtered.map(projectCard).join("")}</div>
    </div></section>
  `);
}

function projectPage(id) {
  const p = projects.find(x=>x.id===id);
  if (!p) return notFound();
  const relatedAwards = achievements.filter(a=>a.relatedProject===p.id);
  return layout(`
    ${pageHero(`Projects / ${p.category}`, p.title, p.summary)}
    <section><div class="container detail-layout">
      <div class="detail-main">
        <div class="detail-block reveal"><h3>Overview</h3><p>${esc(p.description)}</p></div>
        <div class="detail-block reveal"><h3>My role</h3><p>${esc(p.role)}</p></div>
        <div class="detail-block reveal"><h3>Key contributions</h3><ul>${p.highlights.map(h=>`<li>${esc(h)}</li>`).join("")}</ul></div>
        ${relatedAwards.length ? `<div class="detail-block reveal"><h3>Recognition</h3>${relatedAwards.map(a=>`<p><strong>${esc(a.title)}</strong><br><span style="color:#8195a9">${esc(a.issuer)} · ${esc(a.date)}</span></p>`).join("")}</div>` : ""}
      </div>
      <aside class="detail-sidebar">
        <div class="detail-block reveal"><div class="card-meta">Project metadata</div><p><strong>Category</strong><br>${esc(p.category)}</p><p><strong>Date</strong><br>${esc(p.date)}</p><p><strong>Role</strong><br>${esc(p.role)}</p></div>
        <div class="detail-block reveal"><h3>Technologies</h3><div class="skill-list">${p.technologies.map(t=>`<span class="skill-chip emphasis">${esc(t)}</span>`).join("")}</div></div>
        <div class="detail-block reveal"><h3>Links</h3><div class="link-stack">
          ${p.links.github ? external(p.links.github,"GitHub") : ""}
          ${p.links.documentation ? external(p.links.documentation,"Documentation") : ""}
          ${p.links.liveDemo ? external(p.links.liveDemo,"Live Demo") : ""}
          ${p.links.certificate ? external(p.links.certificate,"Certificate") : ""}
          ${!p.links.github && !p.links.documentation && !p.links.liveDemo && !p.links.certificate ? `<p style="font-size:12px">No public project link is listed for this item.</p>` : ""}
        </div></div>
        <a class="back" href="/projects" data-route>← Back to projects</a>
      </aside>
    </div></section>
  `);
}

function experiencePage(id) {
  const x = experience.find(e=>e.id===id);
  if (!x) return notFound();
  return layout(`
    ${pageHero(`Experience / ${x.company}`, x.role, `${x.company} · ${x.dates} · ${x.location}`)}
    <section><div class="container detail-layout">
      <div class="detail-main">
        ${x.image ? `<div class="detail-block reveal experience-detail-photo-wrap"><img class="experience-detail-photo" src="${esc(x.image)}" alt="${esc(x.imageAlt || (x.company + ' experience photo'))}"></div>` : ""}
        <div class="detail-block reveal"><h3>Overview</h3><p>${esc(x.summary)}</p></div>
        <div class="detail-block reveal"><h3>Responsibilities & achievements</h3><ul>${x.bullets.map(b=>`<li>${esc(b)}</li>`).join("")}</ul></div>
      </div>
      <aside class="detail-sidebar">
        <div class="detail-block reveal"><div class="company"><div class="company-logo">${esc(x.initials)}</div><div><strong>${esc(x.company)}</strong><p>${esc(x.location)}</p></div></div><p><strong>Duration</strong><br>${esc(x.dates)}</p></div>
        <div class="detail-block reveal"><h3>Skills demonstrated</h3><div class="skill-list">${x.skills.map(s=>`<span class="skill-chip emphasis">${esc(s)}</span>`).join("")}</div></div>
        <a class="back" href="/about" data-route>← Back to profile</a>
      </aside>
    </div></section>
  `);
}

function leadershipPage(id) {
  if (id) {
    const x = leadership.find(l=>l.id===id);
    if (!x) return notFound();
    return layout(`
      ${pageHero(`Leadership / ${x.organization}`, x.role, `${x.organization} · ${x.dates}`)}
      <section><div class="container detail-layout">
        <div class="detail-main">
          <div class="detail-block reveal"><h3>Role overview</h3><p>${esc(x.description)}</p></div>
          <div class="detail-block reveal"><h3>Contribution</h3><ul>${x.highlights.map(h=>`<li>${esc(h)}</li>`).join("")}</ul></div>
        </div>
        <aside class="detail-sidebar">
          <div class="detail-block reveal"><div class="company-logo" style="margin-bottom:15px">${esc(x.initials)}</div><strong>${esc(x.organization)}</strong><p>${esc(x.dates)}</p></div>
          ${x.officialLink ? external(x.officialLink,"Official publication") : ""}
          <br><a class="back" href="/leadership" data-route>← Back to leadership</a>
        </aside>
      </div></section>
    `);
  }
  return layout(`
    ${pageHero("Leadership & Activities", "Leadership that has to happen with people.", "A curated record of technical leadership, society responsibilities, design and volunteering.")}
    <section><div class="container"><div class="feature-grid">${leadership.map(leadershipCard).join("")}</div></div></section>
  `);
}

function achievementsPage() {
  return layout(`
    ${pageHero("Recognition", "Awards, achievements & recognition.", "A curated record of research recognition, competitions, hackathons and other evidence of contribution.")}
    <section><div class="container"><div class="award-grid">${achievements.map(awardCard).join("")}</div></div></section>
  `);
}

function certificationsPage() {
  return layout(`
    ${pageHero("Credentials", "Certifications & professional training.", "Industry certifications are kept separate from academic education and professional training.")}
    <section><div class="container"><div class="feature-grid">
      ${certifications.map(c=>`<article class="card reveal"><img class="credential-thumb" src="${esc(c.image)}" alt="${esc(c.title)}" loading="lazy"><div class="card-body"><div class="card-meta">${esc(c.status)}</div><div class="card-title" style="margin-top:8px">${esc(c.title)}</div><p>${esc(c.provider)}</p><div class="ctas">${c.link ? external(c.link,"View credential") : ""}</div></div></article>`).join("")}
    </div></div></section>
  `);
}

function skillsPage() {
  const groups = [
    ["Cloud", skills.cloud], ["DevOps", skills.devops], ["Programming", skills.programming],
    ["Data & Analytics", skills.data], ["Systems", skills.systems], ["Tools", skills.tools],
    ["Business & Analytical", skills.business], ["Soft Skills", skills.soft],
  ];
  return layout(`
    ${pageHero("Capabilities", "Skills.", "Technical capabilities and Soft skills that I bring to the table.")}
    <section><div class="container"><div class="skill-layout">${groups.map(([name,items])=>`<div class="skill-card reveal"><div class="section-kicker">${esc(name)}</div><h3 style="margin-top:8px">${esc(name)}</h3><div class="skill-list">${items.map(i=>`<span class="skill-chip ${["AWS","Jenkins","Docker","Kubernetes","Terraform","Ansible","Grafana"].includes(i)?"emphasis":""}">${esc(i)}</span>`).join("")}</div></div>`).join("")}</div></div></section>
  `);
}

function galleryPage() {
  return layout(`${pageHero("Personal gallery", "Work, research & little life moments.", "A photo diary of research, campus memories, events and workplace milestones.")}
    <section><div class="container"><div class="gallery-grid">${photoGallery.map(x=>`<figure class="gallery-item reveal"><img src="${esc(x.src)}" alt="${esc(x.title)}" loading="lazy"><figcaption><strong>${esc(x.title)}</strong><span>${esc(x.note)}</span></figcaption></figure>`).join("")}</div></div></section>`);
}

function contactPage() {
  return layout(`
    ${pageHero("Connect", "Let's talk.", "For opportunities across Cloud/DevOps, technology, business analysis, consulting and related roles.")}
    <section><div class="container"><div class="snapshot">
      <div class="panel reveal"><div class="section-kicker">Email</div><h2 style="font-size:2rem">${esc(site.email)}</h2><p>Best for direct professional contact.</p><div class="ctas"><a class="btn primary" href="mailto:${site.email}">Send email →</a></div></div>
      <div class="panel reveal"><div class="section-kicker">LinkedIn</div><h2 style="font-size:2rem">Professional profile</h2><p>My LinkedIn contains additional career and activity context.</p><div class="ctas">${external(site.linkedin,"Open LinkedIn")}</div></div>
    </div></div></section>
  `);
}

function notFound() {
  return layout(`<section><div class="container"><div class="empty"><h2>Page not found.</h2><p>The route you opened does not exist.</p><a class="btn primary" href="/" data-route>Back home</a></div></div></section>`);
}

function render() {
  const p = path();
  let html;
  if (p === "/") html = home();
  else if (p === "/about") html = aboutPage();
  else if (p === "/education") html = educationPage();
  else if (p === "/resume") html = resumePage();
  else if (p === "/projects") html = projectsPage();
  else if (p.startsWith("/projects/")) html = projectPage(p.split("/")[2]);
  else if (p === "/experience") html = layout(`${pageHero("Experience","Where I've worked.","A chronological view of my professional experience.")}<section><div class="container timeline">${experience.map(experienceCard).join("")}</div></section>`);
  else if (p.startsWith("/experience/")) html = experiencePage(p.split("/")[2]);
  else if (p === "/leadership") html = leadershipPage();
  else if (p.startsWith("/leadership/")) html = leadershipPage(p.split("/")[2]);
  else if (p === "/achievements") html = achievementsPage();
  else if (p === "/certifications") html = certificationsPage();
  else if (p === "/gallery") html = galleryPage();
  else if (p === "/skills") html = skillsPage();
  else if (p === "/contact") html = contactPage();
  else html = notFound();

  app.innerHTML = html;
  bind();
  requestAnimationFrame(() => {
    document.querySelectorAll(".reveal").forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), Math.min(i * 55, 500));
    });
  });
}

function bind() {
  document.querySelectorAll("[data-route]").forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      go(a.getAttribute("href"));
    });
  });

  const menu = document.querySelector("#menuBtn");
  const drawer = document.querySelector("#drawer");
  const backdrop = document.querySelector("#drawerBackdrop");
  const close = document.querySelector("#closeDrawer");
  const closeDrawer = () => { drawer?.classList.remove("open"); backdrop?.classList.remove("open"); };
  menu?.addEventListener("click", () => { drawer.classList.add("open"); backdrop.classList.add("open"); });
  close?.addEventListener("click", closeDrawer);
  backdrop?.addEventListener("click", closeDrawer);
  document.querySelectorAll(".drawer .nav-link").forEach(a => a.addEventListener("click", closeDrawer));

  document.querySelectorAll("[data-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      const f = btn.dataset.filter;
      go(f === "All" ? "/projects" : `/projects?filter=${encodeURIComponent(f)}`);
    });
  });

  document.querySelectorAll("[data-missing-link]").forEach(btn => {
    btn.addEventListener("click", () => {
      openModal(`<div class="section-kicker">Link not added yet</div><h2 style="font-size:2rem">Add this link when ready.</h2><p>No external link is available for this item.</p>`);
    });
  });

  document.querySelectorAll("[data-certificate]").forEach(btn => {
    btn.addEventListener("click", () => {
      const a = achievements.find(x=>x.id===btn.dataset.certificate);
      openModal(`<div class="section-kicker">Certificate / Recognition</div><h2 style="font-size:2rem">${esc(a.title)}</h2><p>${esc(a.issuer)} · ${esc(a.date)}</p><img class="credential-thumb" style="height:auto;max-height:70vh;object-fit:contain;margin-top:18px" src="/portfolio/public/images/certificates/research-display-certificate.jpeg" alt="${esc(a.title)} certificate">`);
    });
  });

  const modalEl = document.querySelector("#modal");
  document.querySelector("#modalClose")?.addEventListener("click", () => modalEl.classList.remove("open"));
  modalEl?.addEventListener("click", e => { if (e.target === modalEl) modalEl.classList.remove("open"); });
}

function openModal(html) {
  const m = document.querySelector("#modal");
  if (!m) return;
  document.querySelector("#modalBody").innerHTML = html;
  m.classList.add("open");
}

window.addEventListener("popstate", render);
render();
