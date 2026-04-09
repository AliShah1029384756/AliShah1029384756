# UI UX Audit Playbook

This file is the reusable standard for all portfolio websites so each session can apply consistent improvements quickly.

## Coverage
- Main portfolio: index, projects, cv, about, sites
- Project detail pages: projects/*.html
- Connected hubs: university-course-projects-hub, web-dev-learning-hub, high-impact-student-projects-hub, fast-nuces-resources, educore-open-learning-hub

## Priority Order
1. Navigation and return flow
2. Visual hierarchy and scannability
3. CTA clarity and interaction states
4. Mobile-first spacing and touch targets
5. Accessibility and performance basics

## 1) Navigation and Return Flow Checklist
- Every core page must include Home, Projects, CV, About, Sites, GitHub
- `sites.html` must have direct links back to all core pages
- Project detail pages must provide path to `projects.html` and home
- External links from hub pages should open in new tab with `rel="noreferrer noopener"`
- No orphan page should exist without a return path

## 2) Visual Hierarchy Checklist
- Hero section: strong headline + one clear supporting line + primary CTA
- Section pattern: heading, short lead, cards or bullets
- Avoid long dense paragraphs; split with subheadings and bullets
- Use one clear primary button style and one secondary style

## 3) CTA and Micro-interaction Checklist
- Primary CTA above fold on main pages
- Hover states for buttons, cards, links
- Active states for touch devices
- Keyboard focus visible for all interactive controls
- Form and search controls should show focus ring

## 4) Mobile-First Checklist
- Minimum tap target: 44px for buttons/nav links
- No horizontal overflow at 375px viewport
- Sticky menu and mobile menu should be easy to use
- Body scroll should lock when mobile nav drawer is open
- Metrics chips and dense rows should stack cleanly on small screens

## 5) Accessibility and Trust Checklist
- `:focus-visible` styles present on links, buttons, inputs
- Heading order should be logical and scannable
- Contact anchor should be valid (`about.html#contact`)
- Canonical and OG metadata should exist on core pages
- Social image path should be valid and deployed

## Standard Fix Snippets

### Nav link addition
Add this after About in nav-links:
```html
<a href="sites.html" class="nav-link">Sites</a>
```

### Contact anchor repair
```html
<section class="about-section" id="contact">
```

### Mobile nav body-lock behavior
In `script.js`, when nav is opened:
- set `document.body.style.overflow = "hidden"`
When nav is closed:
- set `document.body.style.overflow = ""`

### Focus-visible baseline
Apply to `.btn`, `.btn-link`, `.nav-link`, `.quick-action`, `.filter-btn`, `.project-search-input`, `.theme-toggle`.

## Session Workflow
1. Run this checklist on main 5 pages first
2. Apply fixes to shared files (`styles.css`, `script.js`) before per-page tweaks
3. Validate links and mobile menu behavior
4. Run error checks
5. Commit and push in one focused batch

## Notes
- Keep branding name consistent: "Syed Muhammad Ali Naqvi"
- Preserve authentic project tone; do not over-polish technical history
- Prefer small, safe edits over large rewrites
