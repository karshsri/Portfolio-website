# Utkarsh Srivastava — Project Portfolio (Static Website)

A dark, recruiter-friendly, project-centric portfolio website for **UTKARSH SRIVASTAVA**.

## Goals
- Put **projects first** with expandable details and quick links
- Keep personal details minimal while still giving recruiters context
- Clean, modern **dark theme** (charcoal/slate) with subtle blue/teal accents
- Fully static (HTML/CSS/JS) and mobile responsive

---

## Completed Features
- **Hero/Landing** with name, tagline, brief one-liner, social links, and “View Projects” CTA
- **Sticky header navigation** with smooth scrolling
- **Highlights** section (brief) with roles, follower count, and skills
- **Projects** section (main focus):
  - Card-based layout
  - **Filtering by technology/category** (Python, Power BI, Tableau, SQL, ML, Research)
  - **Clickable/keyboard-accessible cards**
  - **Modal popup** with project details (tech, features, links, screenshot placeholders)
- **Contact** section (minimal):
  - Mailto button and a form that composes a mailto message (no backend)
  - Social icons repeated
  - Location: Delhi, India
- **Loading animation** on initial load
- **Reveal-on-scroll** animations

---

## Entry Points (URIs)
- `index.html` — single-page portfolio

In-page anchors:
- `#highlights`
- `#projects`
- `#contact`

---

## Project Structure
```
index.html
css/
  style.css
js/
  main.js
README.md
```

---

## Data Models / Storage
- No database used.
- Projects are currently stored as a static array in `js/main.js`:
  - `PROJECTS[]`: `{ id, title, blurb, tags, tech, features, links, shots, category }`

---

## Not Yet Implemented (Recommended)
- Replace placeholder project links (`#`) with real:
  - GitHub repo links
  - Live demo links
  - Documentation links
- Replace screenshot placeholders with real project images
- Auto-import projects from GitHub (requires a CORS-enabled, auth-free API endpoint)
- Add a dedicated page per project (optional)

---

## Next Steps
1. Update email address:
   - Replace `your.email@example.com` in `index.html` and `js/main.js`
2. Update projects:
   - Edit `PROJECTS` in `js/main.js` with your real titles, descriptions, and URLs
3. Add real screenshots:
   - Add images to `images/` and reference them in the modal (optional)

---

## Public URLs
- Social:
  - LinkedIn: https://www.linkedin.com/in/utkarsh-srivastava14/
  - GitHub: https://github.com/karshsri
- API endpoints:
  - None

---

## Deployment
To deploy your website and make it live, please go to the **Publish tab** where you can publish your project with one click. The Publish tab will handle all deployment processes automatically and provide you with the live website URL.
