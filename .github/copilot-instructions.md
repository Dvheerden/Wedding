Purpose
This repository is a small static single-page wedding website. The guidance below helps an AI coding agent become productive quickly by highlighting the project's structure, runtime checks, important patterns, and safe edit points.

Quick overview
- Type: Static HTML/CSS/JS site (no build system, no package.json).
- Key files: `index.html` (markup & embedded settings), `script.js` (behavior), `styles.css` (styling), `images/` (assets).
- External integrations: Font Awesome, Google Fonts, `canvas-confetti` (CDN), GTranslate widget (dropdown.js via CDN), embedded Google Maps, and a few external RSVP/photo/form links.

How to run locally
- Quick sanity check: open `index.html` in a browser.
- Run a local static server for testing (PowerShell examples):
  - `python -m http.server 8000`  # then open http://localhost:8000
  - OR `npx http-server -p 8000` if Node is available.

Important project-specific patterns
- Single-page anchors: navigation links use fragment IDs (e.g. `#Date`, `#RSVP`) — modify `index.html` when adding sections.
- Mobile menu: JS toggles classes on `.mobile-menu-btn`, `.nav-links`, and `.mobile-menu-overlay`. Keep class names in sync between `styles.css` and `script.js`.
- Countdown: The countdown target lives in `script.js` as `WEDDING_DATE = "dec 01 2025 16:00:00"` and is constructed with `new Date(WEDDING_DATE + " UTC+2")`. To change the ceremony time, update that constant.
- Confetti: The celebration uses `canvas-confetti` from CDN (loaded in `index.html`). Any modifications that trigger `celebrate()` should respect the existing timing/interval approach.
- Slideshows: `createSlideshow(containerClass, dotsClass)` in `script.js` controls the two galleries. Containers are `slideshow-container-men` / `slideshow-container-women` with corresponding `.dot` elements. If you add a slideshow, follow these naming patterns.
- Translation widget: `window.gtranslateSettings` is defined inline in `index.html` and the dropdown widget `dropdown.js` is loaded via CDN. Change languages by editing that JS block in `index.html`.

Editing guidance (concrete examples)
- Change wedding date/time: edit `WEDDING_DATE` in `script.js`, then test via a local server.
- Add a new section: add an `<section id="YourSection">` to `index.html` and add an anchor in the `.nav-links` block; update `styles.css` if layout needs special styling.
- Replace images: put files into `images/` and reference them by relative path in `index.html` (most `img` tags use `loading="lazy"` except header images which are `loading="eager"`).

Testing and debugging notes
- Browser DevTools are primary: site is static — use the Console to view errors from `script.js` (common runtime issues: missing DOM nodes if class/id names change).
- If interactive widgets fail (GTranslate, confetti, maps), confirm network access to the CDN URLs in `index.html`.
- For JS edits, reload the page or use live-server for instant feedback.

Conventions and gotchas found in the codebase
- No bundler: all assets are referenced directly. Do not add imports expecting bundling unless you also add a build step.
- Time zone is hard-coded by appending `UTC+2` to `WEDDING_DATE` — be careful when changing this; tests or local timezone differences may affect countdown calculations.
- There are multiple `DOMContentLoaded` handlers in `script.js` (both set up menu/slideshows). Keep event listener logic idempotent to avoid double-initialization.

Where to look first (high signal files)
- `index.html` — overall content, external links, inline widget settings (GTranslate block), CDN includes.
- `script.js` — countdown, slideshows, mobile-menu toggles, floating notification modal.
- `styles.css` — layout, responsive breakpoints, color variables at `:root`.

If something is unclear
- Ask which change you want to make (content, style, or behavior). Provide the target (file and small diff) and I'll produce a patch.

End