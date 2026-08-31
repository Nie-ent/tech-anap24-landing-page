# TechPana

Bilingual (TH/EN) marketing site for TechPana, a software development studio. Built from the [design brief](.) covering IA, UX principles, visual system, copy, and SEO/AEO strategy.

## Stack

- Next.js 16 (App Router, Turbopack)
- Tailwind CSS v4 + shadcn/ui (Base UI primitives)
- next-intl — locale routing at `/th` and `/en`
- Motion — scroll reveal / micro-interactions
- Sonner — toast notifications
- Zod — request validation
- Resend — background sales-team notification email (optional, see below)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — this redirects to `/th` (the default locale). English lives at `/en`.

## Environment variables

Create a `.env.local` for the optional integrations:

```bash
# Sales-team heads-up email, fired best-effort when a visitor finishes the
# wizard and heads to LINE (optional — without these, it's just logged to
# the server console instead of emailed)
RESEND_API_KEY=
LEAD_NOTIFICATION_EMAIL=
LEAD_FROM_EMAIL="TechPana <onboarding@resend.dev>"

# LINE Official Account — generic "add friend" link shown in the header/footer/hero
NEXT_PUBLIC_LINE_URL=https://line.me/ti/p/~techpana
# Same OA's LINE ID (starts with "@"), used to deep-link into a chat with a
# pre-filled message once the brief wizard is complete
NEXT_PUBLIC_LINE_ID=@techpana

# Used to build absolute URLs in sitemap.xml / robots.txt
NEXT_PUBLIC_SITE_URL=https://techpana.com
```

## Project structure

- `src/app/[locale]/` — locale-scoped layout and homepage
- `src/app/api/lead/` — fires a best-effort sales-team notification when the wizard completes
- `src/components/sections/brief-wizard.tsx` — the choice-only wizard that hands off to LINE with a pre-filled message
- `src/components/sections/` — one component per landing page section
- `src/components/layout/` — header, footer, locale switcher
- `src/messages/{th,en}.json` — all page copy, per locale
- `src/i18n/` — next-intl routing config
- `public/llms.txt` — AEO summary file for AI crawlers

## What's still placeholder

Per the brief's roadmap, the following are intentionally left as clearly-labeled placeholders until real content exists:

- **Work / case studies** — no real screenshots or client results yet (Phase 3)
- **Testimonials** — no fabricated reviews; real ones go in once clients consent (Phase 3)

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl.dev)
- [shadcn/ui Documentation](https://ui.shadcn.com)
