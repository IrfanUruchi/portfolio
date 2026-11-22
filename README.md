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

Cloudflare Pages provides the SPA fallback for direct route navigation when no top-level `404.html` is deployed. No catch-all `_redirects` rule is needed, which keeps `/api/public-stats` available to its Pages Function. Attach `irfanuruchi.in` as the custom domain in the Cloudflare Pages dashboard after the first deployment, then verify DNS and HTTPS activation.

### Live public statistics

`functions/api/public-stats.ts` is a Cloudflare Pages Function served at `GET /api/public-stats`. It aggregates the public GitHub profile count, all paginated Hugging Face model and dataset repositories, and all paginated Docker Hub namespace repositories. The Function keeps a five-minute normalized provider cache and may serve it as `cacheStatus: "cached"`; a failed refresh can serve a record up to one day old as `cacheStatus: "stale"`. Client responses are `no-store`, so the browser does not obscure the API source. If no usable cache exists, it returns HTTP 503 rather than misleading zeros.

Cloudflare Pages Functions must be enabled for this repository’s Pages project. No environment variables or secrets are required because all provider endpoints are public. The React homepage uses the deployed endpoint once when it mounts and uses the checked-in snapshot only as a visible cached fallback for local/static contexts. The Pages Function will be deployed by the normal Git-connected Pages deployment; it is not exercised by Vite's development server.

### Legacy metadata refresh

`.github/workflows/refresh-public-stats.yml` remains as a build-time fallback snapshot and App Store metadata refresh. Live production counts now come from the Pages Function, so a public repository change no longer requires a React rebuild to appear after the endpoint cache refreshes.
