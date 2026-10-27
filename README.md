<div align="center">

# 🟠 Himnora IT Solution

### Premium creative agency website — design meets engineering.

*We craft digital experiences that define brands & accelerate growth.*

<br />

![React](https://img.shields.io/badge/React-19-0a0a0a?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-0a0a0a?style=for-the-badge&logo=typescript&logoColor=3178C6)
![Vite](https://img.shields.io/badge/Vite-8-0a0a0a?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind](https://img.shields.io/badge/Tailwind-4-0a0a0a?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)
![Motion](https://img.shields.io/badge/Motion-animations-0a0a0a?style=for-the-badge&logo=framer&logoColor=ff6a00)
![EmailJS](https://img.shields.io/badge/EmailJS-contact_form-0a0a0a?style=for-the-badge&logoColor=white)

[Quick Start](#-quick-start) · [Contact Form Setup](#-contact-form-emailjs) · [Customize](#-customize-your-content) · [Deploy](#-deploy)

</div>

---

## ✨ Highlights

| | |
|---|---|
| 🎨 **Editorial design** | Big bold / light typography, rounded bento cards, soft ambient glows |
| 🎬 **Smooth animation** | Scroll reveals, count-up numbers, animated stars, hover interactions (Motion) |
| 🧩 **Interactive services** | Dark showcase panel — hover a service to expand details and swap the preview image |
| 📬 **Working contact form** | Validation, spam honeypot and real email delivery through EmailJS |
| 📱 **Fully responsive** | Built mobile-first with Tailwind CSS |
| 🔎 **SEO ready** | Meta tags, Open Graph, Twitter card and JSON-LD structured data in `index.html` |

---

## 🏢 Business Details

| | |
|---|---|
| **Company** | Himnora IT Solution |
| **Phone** | [+91 86076 53657](tel:+918607653657) |
| **Email** | [visionhuntitsolution@gmail.com](mailto:visionhuntitsolution@gmail.com) |

---

## 🚀 Quick Start

**Requirements:** Node.js 18+ and npm

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Create your environment file
cp .env.example .env

# 3. Start the dev server  →  http://localhost:3000
npm run dev
```

> 💡 `--legacy-peer-deps` is needed because of a peer-dependency conflict between some packages.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server on port 3000 |
| `npm run build` | Create the production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Type-check with TypeScript |
| `npm run clean` | Remove the `dist/` folder |

---

## 📬 Contact Form (EmailJS)

The contact form sends enquiries straight to your inbox using [EmailJS](https://www.emailjs.com/).

### 1. Environment variables

Set these in `.env` (and in your hosting provider's settings when you deploy):

```env
VITE_EMAILJS_SERVICE_ID="your_service_id"
VITE_EMAILJS_TEMPLATE_ID="your_template_id"
VITE_EMAILJS_PUBLIC_KEY="your_public_key"
```

### 2. EmailJS template variables

Your EmailJS template **must** use exactly these names:

| Variable | Meaning |
|---|---|
| `{{name}}` | Visitor's name |
| `{{email}}` | Visitor's email |
| `{{phone}}` | Visitor's phone number |
| `{{subject}}` | Selected service (Digital Marketing / SEO Optimization / Website) |
| `{{message}}` | Their message |

### 3. Dashboard settings

- **To Email** → `visionhuntitsolution@gmail.com`
- **Reply-To** → `{{email}}` (so you can reply directly to the customer)

> ⚠️ Anything starting with `VITE_` is bundled into the public site. EmailJS public keys are designed for this, but never put private secrets in a `VITE_` variable.

---

## 🛠 Customize Your Content

Most content lives in one place:

| What to change | Where |
|---|---|
| Company name, phone, email, address, social links, stats | `src/data/agencyData.ts` → `AGENCY_INFO` |
| Services, case studies, blog posts, FAQs, testimonials | `src/data/agencyData.ts` |
| Images | `src/data/images.ts` |
| Contact form service options | `src/components/sections/ContactSection.tsx` → `SUBJECT_OPTIONS` |
| Logo | `src/components/ui/Logo.tsx` |
| SEO title, description, structured data | `index.html` |
| Colors, fonts, headline sizes | `src/index.css` |

**Brand colors**

| Color | Hex |
|---|---|
| Black | `#0a0a0a` |
| Page background | `#f5f5f5` |
| Accent orange | `#ff6a00` |
| Muted text | `#6b6b6b` |

---

## 🗺 Pages

| Route | Page |
|---|---|
| `/` | Home — hero, about, portfolio, fun facts, services, FAQ, blog, contact |
| `/services` · `/services/:id` | All services and service details |
| `/portfolio` · `/portfolio/:slug` | Work and case studies |
| `/about` | About the studio |
| `/process` | How we work |
| `/pricing` · `/quote` | Pricing and quote request |
| `/blog` · `/blog/:slug` | Insights and articles |
| `/contact` | Contact page |
| `/privacy` · `/terms` | Legal pages |

---

## 📁 Project Structure

```text
himnora-it-solution/
├── index.html                  # SEO meta tags, fonts, favicon
├── src/
│   ├── main.tsx                # App entry point
│   ├── App.tsx                 # Routes
│   ├── index.css               # Tailwind + global styles
│   ├── data/
│   │   ├── agencyData.ts       # All business content
│   │   └── images.ts           # Image registry
│   ├── components/
│   │   ├── navigation/         # Navbar, Footer
│   │   ├── sections/           # Hero, Services, Stats, Contact, Blog, ...
│   │   └── ui/                 # Logo, buttons, CountUp, cursor, ...
│   ├── pages/                  # One file per route
│   └── utils/                  # Helpers and tests
├── .env.example                # Environment variable template
└── vite.config.ts
```

---

## 🌐 Deploy

Build the site:

```bash
npm run build
```

Upload the `dist/` folder to any static host (**Vercel**, **Netlify**, **Cloudflare Pages**, **GitHub Pages**).

On your host:

1. Add the three `VITE_EMAILJS_*` environment variables.
2. Set a **rewrite to `index.html`** for all routes (single-page app), otherwise refreshing `/services` will show a 404.

---

## 🧯 Troubleshooting

| Problem | Fix |
|---|---|
| `npm install` fails with `ERESOLVE` | Use `npm install --legacy-peer-deps` |
| Form says "Unable to send your message" | Check the three EmailJS values and that your EmailJS service is connected |
| Emails arrive with empty fields | Template variable names don't match — see [template variables](#2-emailjs-template-variables) |
| Page refresh gives 404 after deploy | Add the SPA rewrite to `index.html` |

---

<div align="center">

**Built with ❤️ for Himnora IT Solution**

[+91 86076 53657](tel:+918607653657) · [visionhuntitsolution@gmail.com](mailto:visionhuntitsolution@gmail.com)

</div>

## Animation & 3D System

**Architecture (text diagram)**

```
App.tsx
 ├─ useLenis()            smooth scroll, synced to ScrollTrigger (src/animations/useLenis.ts)
 ├─ <Preloader/>          logo draw + counter + 2-layer curtain, waits for fonts + first 3D frame
 ├─ <PageTransition/>     orange→black curtain on every internal link + back/forward
 ├─ <GlobalReveals/>      h2 line-mask reveals + paragraph blur-fades on every page
 ├─ <ScrollProgress/>     2px orange bar
 └─ <SceneHost/>          lazy-loads src/three/* (separate chunk) or shows the CSS fallback
      └─ Stage → HeroEngine (one renderer, one loop on gsap.ticker, quality governor)
```

**Tweaking**
- Colours / speeds: `ORANGE` and shader uniforms in `src/three/engine.ts`; easing `himnora` in `src/animations/register.ts`.
- Particle counts and DPR per tier: `src/three/quality.ts` (`PARTICLES`, `MAX_DPR`).
- Quality governor: `HeroEngine.govern()` drops one tier if the rolling frame time stays above 22 ms (never goes back up).
- Hero headline weights: `data-weight="bold|light"` on the spans in `HeroSection.tsx`.
- Exclude a section from automatic reveals: add `data-no-reveal` to a wrapper.

**Adding a new Three scene**: create the objects in a new builder inside `engine.ts` (or a new file in `src/three/scenes/`), add them to `this.rig`, register every geometry/material through `this.track()` so `dispose()` frees them.

**Troubleshooting**
- Triggers misplaced after layout changes → `ScrollTrigger.refresh()`.
- Double animations in dev → every effect uses `gsap.context()` and reverts on cleanup; do not create tweens outside a context.
- Lenis fighting native scroll → use `scrollToTopNow()` / `getLenis()` from `useLenis.ts`, not `window.scrollTo`.
- No WebGL / reduced motion / Save-Data → `StaticFallback` renders automatically.
