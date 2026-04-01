# Student Plus Coder Portfolio Website Guide

## What's Live

Your **free personal website** is now live at:
- **URL:** `https://alishah1029384756.github.io/AliShah1029384756/`
- **Status:** Updated April 1, 2026

---

## What the Website Shows

### 1. **Hero Section**
- Your name and student-plus positioning
- Rotating tagline (changes every 3.2 seconds)
- Quick links to GitHub and Profile Repo

### 2. **Featured Projects** (Interactive Cards)
Click any card to jump to the project on GitHub:
- **EduConnect** (Public) – Student support platform
- **AutiSmart** (Private) – Autism-care system
- **University Portfolio** (Academic) – 17+ course projects
- **Web Dev Track** (Learning) – Professional curriculum

**Features:**
- Color-coded badges (Public / Private / Academic / Curriculum)
- Tech stack tags for each project
- Hover effects (lift up, highlight)
- Keyboard accessible (Tab + Enter)

### 3. **Build Logs** (Weekly Progress)
- Timeline of major completed work
- Dates + status + brief summary
- Update monthly with new wins

### 4. **Tech Stack**
- Frontend, Backend, Database, Systems breakdown
- Clean grid layout

### 5. **Developer Console** (Terminal Style)
- Fun ASCII-style status display
- Mission statement

---

## How to Update the Website

### Add a New Project Card

Edit `index.html` in the `<section class="featured">` area:

```html
<article class="project-card" data-link="https://your-github-link">
  <div class="badge public">Public</div>
  <h3>Project Name</h3>
  <p class="desc">One-line description here.</p>
  <div class="tags">
    <span>Tech1</span><span>Tech2</span>
  </div>
</article>
```

### Update Build Logs

Edit inside `<div class="timeline">`:

```html
<div class="log-entry">
  <span class="date">Apr 15, 2026</span>
  <span class="status">✓ Complete</span>
  <p>Brief description of what you shipped.</p>
</div>
```

### Customize Colors

Edit `styles.css` root variables:
```css
:root {
  --accent: #3dd9a6;    /* Primary green */
  --accent2: #64b5ff;   /* Blue */
  --red: #ff6b6b;       /* Red for "Private" badges */
  --yellow: #ffd93d;    /* Yellow for "Curriculum" */
}
```

---

## How to Publish Changes

1. Make edits to `index.html`, `styles.css`, or `script.js`
2. Commit:
   ```bash
   git add index.html styles.css script.js
   git commit -m "Website: update projects / logs / styling"
   git push origin main
   ```
3. Site updates automatically ~30 seconds after push

---

## Performance Notes

- **Zero external dependencies** – pure HTML/CSS/JS
- **Fast load** – ~40KB total size
- **Mobile friendly** – responsive design
- **Accessible** – keyboard navigation, semantic HTML

---

## Next Ideas (Optional Upgrades)

1. Add project case studies (detailed write-ups)
2. Add GitHub stats widget (contribution graph)
3. Add contact form (via Formspree free tier)
4. Dark/light mode toggle
5. Project filtering by tech stack

---

## GitHub Profile Integration

Your website works alongside your main GitHub profile README:
- **Website:** Living portfolio with interactive showcase
- **README:** Detailed documentation of projects and learning
- **Both:** Drive traffic to each other

---

## Questions?

Website code is fully self-contained in this repo. Edit, test locally (open `index.html` in browser), commit, and push.

Keep it simple. Keep it honest. Ship weekly. 🚀
