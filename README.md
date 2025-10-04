# Future MD Academy — Official Site

Production-ready Next.js + Tailwind (v3) project.

## Run locally
```bash
npm install
npm run dev
```

## Deploy to Vercel
1. Create a GitHub repo and upload **everything inside this folder**.
2. In Vercel → New Project → Import repo.
3. Keep defaults (Next.js).

### Config
- **Calendly** wired to `https://calendly.com/spadala-arizona/30min?month=2025-10` (search for it to change).
- **Contact form**: edit `FORM_ENDPOINT` in `components/FutureMDAcademySite.jsx` to your Formspree endpoint.
- **Logo**: `public/logo.png`.

### Notes
Tailwind v3 is pinned to avoid the v4/PostCSS build error on Vercel.
