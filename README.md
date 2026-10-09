
# Mehak Aggarwal — Portfolio

A professional static portfolio designed for Cloudflare Pages.

## Stack

- HTML
- CSS
- Vanilla JavaScript modules
- Google Fonts
- No backend
- No build step required

The site intentionally uses a lightweight architecture so it is easy to edit in VS Code and easy to deploy to Cloudflare Pages.

## Run locally

Because the site uses JavaScript modules, open it through a local server rather than double-clicking `index.html`.

If you have VS Code:

1. Open this folder.
2. Install/use the Live Server extension.
3. Right-click `index.html` → Open with Live Server.

Or use any simple static server.

## Main files

- `index.html` — application shell
- `styles.css` — complete visual system
- `data.js` — portfolio content and links
- `app.js` — routes, page rendering and interactions
- `_redirects` — Cloudflare Pages SPA fallback

## Where to edit your information

Most portfolio content is in `data.js`.

Look for:

- `site` — name, email, LinkedIn, GitHub, resume link
- `experience`
- `projects`
- `achievements`
- `leadership`
- `education`
- `training`
- `skills`
- `certifications`

## Add your profile photo

Replace:

`public/images/profile/mehak.jpg`

with your own image.

Your profile photo is already included at `public/images/profile/mehak.jpg`.

## Add company logos

The site uses clean initials for company marks where a supplied official logo was not provided.

You can later add actual company logos under:

`public/images/companies/`

and update the corresponding experience data/component.

## Add certificates

Certificate images and the DUCAT certificate PDF are included. For certificates without an uploaded scan, the requested Research Display Week certificate image is reused. Their available Google Drive links are wired into the site.

## Add project screenshots

Place screenshots under:

`public/images/projects/`

Then add the relevant image paths to the project data if you want them displayed.

## Add your resume viewer link

In `data.js`, update:

`resumeViewer: ""`

with your Google Docs Viewer / Google Drive viewer URL.

The Resume page opens the included resume PDF.

## Add missing links

Do not invent URLs.

The project currently leaves unknown links empty. When you have a real URL, add it to the relevant object in `data.js`.

## Cloudflare Pages

This is a static site.

Recommended Cloudflare Pages setup:

- Framework preset: None
- Build command: none
- Build output directory: `/`

Because `_redirects` is included, client-side portfolio routes can resolve back to `index.html`.

If Cloudflare asks for a build command, leave it blank for this version.

## Important content decisions already applied

The portfolio deliberately omits:
- Titanic Passengers Data Analysis
- Tezos_Hansraj
- Dezario Infotech from experience

The site also avoids showing:
- education marks
- CGPA
- school percentages
- fake skill percentages
- fake project links
- fake project outcomes

The DUCAT course is represented as professional training rather than a degree or AWS certification.

## Included media and gallery

Your profile photo, United Airlines photos, research/dissertation photos, Blu Parrot and Huntit Out photos are bundled under `public/images/`. The Personal Gallery page and homepage hobby section are included.


## GitHub Pages deployment

This project is configured for the repository `seelimsii/portfolio` on GitHub Pages. Keep the contents of this folder at the repository root (so `index.html`, `app.js`, `data.js`, `styles.css`, `404.html`, and `public/` are at the top level). The app uses `/portfolio/` as its deployment base path. In GitHub, select **Settings → Pages → Deploy from a branch → main → /(root)**.
