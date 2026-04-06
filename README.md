# GrieveGently — Website

**Domain:** grievegently.com  
**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Framer Motion

---

## Get running locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout + font loading
│   ├── page.tsx            # Home page — assembles all sections
│   └── globals.css         # CSS variables + animations
├── components/
│   ├── nav/
│   │   ├── Nav.tsx         # Sticky nav with Business/Solutions dropdowns
│   │   └── ToggleBar.tsx   # Individual / Business audience toggle
│   ├── hero/
│   │   └── Hero.tsx        # Hero with phone mockups (swap for real screenshots)
│   ├── solution/
│   │   └── Solution.tsx    # Three-pillar tab switcher
│   └── sections/
│       ├── Impact.tsx      # Key stats row
│       ├── B2BSection.tsx  # Business-only solutions grid
│       ├── Pain.tsx        # Pain recognition
│       ├── Science.tsx     # Researcher cards
│       ├── Testimonials.tsx # Marquee carousel
│       ├── Who.tsx         # Who it's for
│       ├── Faq.tsx         # Accordion FAQ
│       └── Cta.tsx         # Final CTA
├── lib/
│   ├── content.ts          # ← ALL copy lives here. Edit this file.
│   ├── audienceContext.tsx # Individual/Business toggle state
│   ├── useScrollReveal.ts  # Scroll animation hook
│   └── utils.ts            # cn() helper
└── types/
    └── index.ts            # Shared types
```

## Editing copy

**All text on the site is in one file: `src/lib/content.ts`**

Open it, edit what you want, save. That's it.

## Editing colours

All colours are CSS custom properties in `src/app/globals.css`:

```css
--bg:      #0C0B09   /* page background */
--bg-2:    #141310   /* section alternates */
--card:    #181714   /* cards */
--text:    #EDE9E0   /* primary text */
--muted:   #7A7468   /* secondary text */
--accent:  #B8A878   /* gold — Estate */
--blue:    #7B9FBF   /* Admin */
--green:   #6B9B8A   /* Wellbeing */
```

## Adding real screenshots

Phone mockups in `Hero.tsx` and `Solution.tsx` are currently coded UI.
When Figma screenshots are ready:

1. Export from Figma as PNG/WebP → drop into `public/images/`
2. Replace the placeholder `<div>` blocks with `<Image src="..." />` from `next/image`

## Deploying to grievegently.com

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial build"
git remote add origin https://github.com/YOUR_USERNAME/gently-website.git
git push -u origin main
```

### Step 2 — Connect to Vercel
1. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
2. Select `gently-website`
3. Framework: **Next.js** (auto-detected)
4. Click Deploy

### Step 3 — Add your domain
1. Vercel dashboard → your project → Settings → Domains
2. Add `grievegently.com` and `www.grievegently.com`
3. Vercel gives you DNS records to add at your domain registrar

### Step 4 — DNS at your registrar
Add these records (Vercel provides the exact values):
```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

That's it. SSL is automatic. Usually live within 10 minutes.

---

## What's left to build

- [ ] Real Figma screenshots in phone mockups
- [ ] Hero background image (Midjourney → `public/images/hero-bg.jpg`)
- [ ] Waitlist / early access form → `src/app/api/waitlist/route.ts`
- [ ] Lottie animations (hero pulse, skill unlock, progress ring)
- [ ] Analytics → install Vercel Analytics or PostHog
- [ ] OG image for social sharing → `src/app/opengraph-image.tsx`
- [ ] Blog section (MDX)
