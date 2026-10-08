# Mehak Aggarwal: Portfolio

Static React (Vite) site with client-side routing, deployable to Cloudflare Pages.

## Run locally
    npm install
    npm run dev        # http://localhost:5173

## Build
    npm run build      # output in dist/
    npm run preview

## Edit content (all in `src/data/`)
| File | What it controls |
|---|---|
| `profile.js` | Name, intro, email, LinkedIn, **resume link (`resumeUrl`)**, photo, hero stats |
| `experience.js` | Work and internships (logo, role, dates, highlights) |
| `projects.js` | Projects and their `links` (GitHub, documentation, live demo) |
| `achievements.js` | Awards, hackathons, certifications. Use `projectId` / `leadershipId` to relate them |
| `leadership.js` | Societies and positions |
| `skills.js`, `education.js` | Skills and education |

Navigation lives in `src/components/Layout.jsx`; colours in `:root` of `src/styles.css`.

Certificates are linked once, in `achievements.js`; project and leadership pages pick them up automatically.
Links that are empty are not shown, so nothing points nowhere.

## Images
Put files under `public/images/` (`profile`, `projects`, `certificates`, `companies`, `leadership`, `hackathons`)
and reference them as `/images/<folder>/<file>`. Every `*-placeholder.svg` is a stand-in to replace.

## Deploy to Cloudflare Pages
1. Push the project to GitHub.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Framework preset: **Vite** (or none). Build command: `npm run build`. Output directory: `dist`.
4. Deploy. Pages serves `index.html` for unknown paths when the project has no top-level `404.html`,
   so routes like `/projects/jitsi-aws` work on refresh. Please confirm this on your first deploy
   against Cloudflare's current SPA docs.

Search `TODO` in `src/` to find items still needing your input.
