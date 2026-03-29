# AppIntervenants

## Description
Application web (PWA) de gestion d'intervenants.

## Stack
- HTML/CSS/TypeScript strict (via Vite)
- PWA avec vite-plugin-pwa (Workbox generateSW)
- Tailwind CSS v4
- Pas de framework frontend

## Commandes
- `npm install` : installer les dependances
- `npx vite` : serveur de developpement
- `npx vite build` : build de production
- `npm run lint` : ESLint (TypeScript ESLint inclus)
- `npx tsc --noEmit` : verification des types TypeScript
- `npm test` : tests Vitest (40 tests)
- `npm run format` : formatage Prettier

## Structure
- Code source TypeScript dans `src/` (app.ts, simulateur.ts, calculator.ts, content.ts)
- Configuration metier dans `config.ts` (racine)
- Assets statiques dans `public/` (fonts, icones, manifests, offline.html)
- CSS unique dans `src/styles.css` (importe `src/common.css` avec Tailwind v4)
- Tests dans `src/calculator.test.ts` et `src/dom.test.js`
- CI/CD dans `.github/workflows/ci.yml` (lint + tsc + test + check-links + build + deploy)
