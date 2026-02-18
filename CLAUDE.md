# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Gaurav Jiandani (gauravjiandani.com). Two separate frontends live in this repo:

1. **Vue SPA** — Main portfolio site (`index.html` → `src/main.js`). Vue 3 + Vue Router + Vuex + Tailwind CSS.
2. **Paris Immersive Experience** — Standalone Three.js 3D page (`src/paris-immersive.html`). Self-contained HTML with inline CSS/JS, no build step for its JS (uses CDN ES module imports from Skypack).

## Commands

```bash
npm run dev      # Vite dev server (localhost:5173)
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
```

The immersive 3D page is accessed at `http://localhost:5173/src/paris-immersive.html` during dev.

## Deployment

- **Production**: GitHub Actions workflow (`.github/workflows/main.yml`) — manual dispatch, SSHs into server, pulls branch, `npm install && npm run build`
- **Cloudflare Pages**: `deploy-cloudflare.sh` builds and copies `_headers`, `_redirects`, `cloudflare.toml` into `dist/`
- Static assets served from Cloudflare R2 CDN: `https://pub-311583034e5e4275b8fb5d11ad15c564.r2.dev`

## Architecture

### Vue SPA (`index.html` entry)

- **Entry**: `src/main.js` → mounts Vue app with Router + Vuex store
- **Router** (`src/router/index.js`): `/` (Home), `/project/:id` (ProjectDetail), `/live-projects/:id` (LiveProjects)
- **Store** (`src/store/index.js`): Vuex — manages theme (light/dark), auto-detects from OS `prefers-color-scheme`
- **Layout** (`src/App.vue`): TopNav + `<router-view>` + Footer. Sidebar code exists but is disabled.
- **Data files** (`src/data/`): `projects.js` (project case studies array), `siteContent.js` (all site copy centralized — update content here, not in components)
- **Styling**: Tailwind 3 with `darkMode: 'class'`. Theme CSS variables in `src/assets/main.css`. Global styles in `src/style.css` (Tailwind directives + custom font). Custom font: Gafata (loaded from `/Gafata/` directory).
- **Path alias**: `@` → `/src` (configured in `vite.config.js`)

### Paris Immersive Experience (`src/paris-immersive.html`)

Single-file ~3300-line HTML page. **Does not go through Vite's JS bundling** — uses ES module imports directly from Skypack CDN (Three.js r136).

Key systems:
- **Three.js scene**: Eiffel Tower, city buildings (LOD with GLB models + proxy boxes), scooter, terrain (grass + river), clouds, Sky shader with golden-hour sunset
- **Asset loading**: 5 GLB models loaded from R2 CDN via `ASSET_BASE_URL` constant (~200MB total). Uses DRACO decoder from Google CDN. Change `ASSET_BASE_URL` to `''` for local dev with models in `public/3d-models/`.
- **Adaptive quality**: Three tiers (LOW/MEDIUM/HIGH) auto-detected from GPU/device. Controls particle count, cloud count, shadow maps, DPR cap, bloom, building count. MacBook Air and mobile forced to LOW.
- **Scroll-driven camera**: 10-section scroll narrative. Custom scroll controller (`SCROLL_CTRL`) intercepts wheel/touch for cinematic easing. Camera follows CatmullRom spline paths (separate desktop/mobile paths). Section markers + progress bar on screen edges.
- **Content injection**: Pulls text from `src/data/siteContent.js` (imported as ES module) to populate UI panels
- **Model normalization**: `normalizeToBaseline()` scales and grounds GLB models. Buildings use LOD (high-detail GLB near camera, proxy box geometry far away).
- **City layout**: Block-grid placement with collision avoidance around Eiffel Tower keep-out zone. `pushApart()` resolves overlaps.

### Public Assets

- `public/3d-models/` — GLB models (eiffel-tower, scooter, building1-3, city), cloud.png, grass.jpg
- `public/static/` — Project screenshots, tech logos, profile image, CV PDF, favicon

## Key Conventions

- Site content lives in `src/data/siteContent.js` — edit copy there, not in Vue components
- Project data lives in `src/data/projects.js`
- Dark mode uses Tailwind `dark:` prefix classes, toggled via `<html class="dark">`
- Build output uses content-hashed filenames for cache busting (configured in `vite.config.js`)
- Console logging is dropped in production builds (`terser.compress.drop_console`)
