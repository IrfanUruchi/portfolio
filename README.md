# Irfan Uruçi — Engineering Portfolio

A static personal portfolio covering AI, distributed and edge computing, backend infrastructure, deployment, and hardware.

## Stack

React, TypeScript, Vite, React Router, and custom modern CSS. Vitest and Testing Library cover core data and routing behavior.

## Development

```bash
npm install
npm run dev
npm run lint
npm test
npm run build
npm run preview
```

## Project structure

- `src/data/projects.ts` — structured project content
- `src/pages` — route components
- `src/components` — shared navigation, cards, metadata, and capability UI
- `src/styles.css` — themes, responsive layout, and interaction states
- `public` — Cloudflare rules, manifest, crawl files, favicon, and structured data

## Content editing

Edit project records in `src/data/projects.ts`. Site identity and contact links live in `src/config.ts`. Audited public statistics and their counting policies live in `src/data/portfolio.ts`; refresh the API counts, verification date, and methodology together. Metadata uses `https://irfanuruchi.in` as the canonical origin.

## Cloudflare Pages

- Framework preset: **Vite**
- Build command: **`npm run build`**
- Output directory: **`dist`**
- Production branch: **`main`**

`public/_redirects` provides the SPA fallback for direct route navigation. Attach `irfanuruchi.in` as the custom domain in the Cloudflare Pages dashboard after the first deployment, then verify DNS and HTTPS activation.
