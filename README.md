# InnoCorner Website

Independent rebuild of the InnoCorner marketing website, replacing the Lovable-generated frontend with a clean static site.

## What is included

- Responsive homepage with Home, Services, Products, About, and Contact sections
- Insights page with articles/news cards, FAQ, newsletter signup, and newsletter workflow content
- Privacy policy, newsletter consent language, contact consent language, and a necessary-storage privacy notice
- Current InnoCorner copy, contact details, and logo
- Dependency-free HTML, CSS, and JavaScript
- Supabase Edge Function wrapper for deployment on an active Supabase project
- Newsletter form writes signups to Supabase project `evhvmngwtruzdsfgcmii`

## Newsletter automation

See `docs/newsletter-automation.md` for the recommended email-to-newsletter workflow.
See `docs/newsletter-sending-setup.md` for OVH MX Plan, `newsletter@innocorner.com`, and sender authentication setup.

## Local preview

```powershell
node scripts/preview-server.mjs
```

Then open `http://localhost:4173`.

## Deployment

This repository includes a GitHub Pages workflow in `.github/workflows/deploy-pages.yml` and a `CNAME` file for `innocorner.com`.

## Supabase Edge Function

The function in `supabase/functions/site/index.ts` serves the same site as a single HTML response. Deploy it to an active Supabase project with:

```powershell
supabase functions deploy site --project-ref <project-ref>
```
