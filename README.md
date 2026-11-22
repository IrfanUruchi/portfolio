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

Edit project records in `src/data/projects.ts`. Site identity and contact links live in `src/config.ts`. Public-statistics presentation and counting policies live in `src/data/portfolio.ts`; the cached API response is `src/data/publicStats.json`. Smart Study Planner’s App Store identifier and last verified public version are stored in `src/data/appStoreMetadata.json`. Metadata uses `https://irfanuruchi.in` as the canonical origin.

## Cloudflare Pages

- Framework preset: **Vite**
- Build command: **`npm run build`**
- Output directory: **`dist`**
- Production branch: **`main`**

Cloudflare Pages provides the SPA fallback for direct route navigation when no top-level `404.html` is deployed. No catch-all `_redirects` rule is needed. Attach `irfanuruchi.in` as the custom domain in the Cloudflare Pages dashboard after the first deployment, then verify DNS and HTTPS activation.

### Public statistics snapshot

The homepage reads `src/data/publicStats.json` directly. `.github/workflows/refresh-public-stats.yml` runs approximately every six hours and can also be started manually. It queries the public GitHub profile, paginated Hugging Face models and datasets, and paginated Docker Hub repositories. The workflow writes and commits the snapshot only when verified counts change; if any provider fails, it preserves the last verified snapshot and exits without changing it. No Cloudflare credentials or runtime statistics API are used.
