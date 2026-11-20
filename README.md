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

`public/_redirects` provides the SPA fallback for direct route navigation. Attach `irfanuruchi.in` as the custom domain in the Cloudflare Pages dashboard after the first deployment, then verify DNS and HTTPS activation.

### Metadata refresh

`.github/workflows/refresh-public-stats.yml` runs daily at 03:17 UTC and can also be dispatched manually. It fetches the GitHub profile repository total, paginated Hugging Face model and dataset listings, paginated Docker Hub repositories, and the public App Store version. It commits only cached JSON snapshots; Cloudflare Pages serves those snapshots from the regular production deployment. No token is required for the current public endpoints. The workflow needs GitHub Actions to be enabled and the repository’s `GITHUB_TOKEN` to retain `contents: write` permission. A failed provider retains its prior successful value rather than writing zero.
