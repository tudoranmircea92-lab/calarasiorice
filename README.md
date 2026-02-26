# CălărașiOrice.ro MVP

Mobile-first local business directory for Călărași built with Next.js 14, TypeScript, Tailwind, shadcn-style UI components, Lucide icons, and Supabase.

## Features
- Homepage with search, 2-column category grid, and "Top azi" featured section.
- Category pages with mobile-friendly quick filters.
- Business detail page with primary CTAs (Call, WhatsApp, Map), hours, gallery, and reviews.
- Add business flow with form validation.
- Protected admin page (when Supabase auth is configured).
- Supabase SQL migration and seed script with **fictional demo-safe data only**.

## Run locally
```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

## Environment variables
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (needed for `npm run db:seed`)

If env vars are missing, the app runs in demo fallback mode using local seed objects.

## Supabase setup
1. Create a new Supabase project.
2. Run SQL from `supabase/migrations/001_init.sql`.
3. Fill `.env.local`.
4. Seed data:
```bash
npm run db:seed
```

## Build
```bash
npm run build
npm run start
```

## Deployment
- Push repo to GitHub
- Import to Vercel
- Set environment variables in Vercel project settings
