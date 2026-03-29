# Audit Final — AppIntervenants

> Date : 2026-03-29 | Score : 8.1/10

## Score Global

| Categorie | Score /10 | Justification |
|-----------|-----------|---------------|
| Code qualite | 9/10 | TypeScript strict (.ts), ESLint 0 erreurs 0 warnings, Prettier integre, flat config ESLint v10, `npx tsc --noEmit` passe sans erreur |
| Accessibilite | 8/10 | Skip-to-content, `role="tabpanel"` + `aria-labelledby`, `role="tablist"`/`role="tab"`/`aria-selected`, focus-visible, navigation clavier fleches, contrastes ameliores. Pas d'audit Lighthouse formel. |
| Performance | 8/10 | Vite build optimise (main 42.8 kB gzip 9.9 kB, config 7.9 kB, simulateur 3.4 kB), Tailwind v4 purge, Lucide tree-shake, Google Fonts en local (woff2), pre-cache Workbox 18 entries (469 kB). CSS ~79 kB x2 (pas de code splitting CSS entre entry points). |
| Securite | 8/10 | CSP avec hash SHA-256 (plus de `unsafe-inline` ni `unsafe-eval` pour les scripts), `rel="noopener noreferrer"` sur liens externes, pas de dependance runtime lourde. `style-src 'unsafe-inline'` reste necessaire pour Tailwind inline. |
| PWA | 9/10 | vite-plugin-pwa Workbox (generateSW, 18 entries pre-cachees), icone maskable, 2 manifests multi-agence, banniere install iOS/Android, auto-reload apres 10 min, offline.html fallback |
| UX/UI | 7/10 | Dark mode natif, animations fade-in, navigation responsive (capsule desktop, barre mobile), safe-area iOS. Pas de feedback haptic, pas de transitions entre pages. |
| Maintenabilite | 8/10 | TypeScript strict, config centralisee, contenu RH externalise, calculs purs testes (40 tests), CI/CD lint+test+build+deploy, arborescence propre, script check-links |

## Metriques Build

| Fichier | Taille | Gzip |
|---------|--------|------|
| index.html | 87.60 kB | 13.68 kB |
| simulateur.html | 10.68 kB | 2.34 kB |
| main.css | 79.51 kB | 12.59 kB |
| simulateur.css | 78.90 kB | 12.42 kB |
| main.js | 42.84 kB | 9.93 kB |
| config.js | 7.93 kB | 3.17 kB |
| simulateur.js | 3.45 kB | 1.45 kB |
| **SW Workbox** | 18 entries | 469.76 kB pre-cache |

## Metriques Qualite

| Metrique | Resultat |
|----------|----------|
| `npm run lint` | 0 erreurs, 0 warnings |
| `npx tsc --noEmit` | 0 erreurs |
| `npm test` (Vitest) | 40 tests passes (2 fichiers) |
| Build Vite | OK en 430ms |
| SW Workbox | `dist/sw.js` genere (2.4 kB) |

## Historique des corrections

### Bugs critiques corriges

| ID | Fichier | Description |
|----|---------|-------------|
| BUG-40 | src/simulateur.ts | `createIcons()` appele sans argument (icons map manquant) — corrige avec `{ icons: { ArrowLeft, Info } }` |

### Bugs majeurs corriges

| ID | Fichier | Description |
|----|---------|-------------|
| BUG-41 | package.json | Lint ne couvrait que les fichiers racine — elargi a `'**/*.{js,ts}'` |
| BUG-42 | index.html + simulateur.html | CSP contenait `unsafe-eval` sans justification — retire |
| BUG-43 | sw.js | SW ne pre-cachait pas les bundles Vite — resolu par migration vite-plugin-pwa Workbox |

### Bugs mineurs corriges

| ID | Fichier | Description |
|----|---------|-------------|
| BUG-44 | racine | 9 fichiers dupliques entre racine et public/ — supprimes |
| BUG-45 | manifests | Icone maskable manquante — ajoutee dans les 2 manifests |
| BUG-46 | simulateur-styles.css | Classe `.pb-safe` manquante — ajoutee |
| BUG-47 | index.html + app.ts | Magic numbers hardcodes — injectes dynamiquement depuis config |
| BUG-50 | eslint.config.js | Package `globals` installe, globals manuels remplaces |
| BUG-51 | sw.js | Font-weights CDN desalignes — corrige (maintenant fonts locales) |
| BUG-52 | index.html | Bouton Accueil `text-slate-400` en dur — corrige |
| BUG-54 | package.json | Format Prettier elargi a `'**/*.{js,ts,html,json,css}'` |

### Ameliorations structurelles realisees

- Migration TypeScript strict (tous les fichiers src/ en .ts, `npx tsc --noEmit` passe)
- vite-plugin-pwa avec Workbox (generateSW, 18 entries pre-cachees)
- Google Fonts en local (3 fichiers woff2 dans public/fonts/, plus de CDN)
- CSP renforcee (hash SHA-256 pour le script inline, plus de `unsafe-inline` ni `unsafe-eval` pour scripts)
- ESLint + TypeScript ESLint integre (flat config v10)
- Tests DOM integrite des donnees (40 tests total, 2 fichiers)
- Magic numbers injectes dynamiquement depuis config
- Icone maskable PWA
- Accessibilite complete (skip-to-content, tabpanel, aria-labels, contrastes, focus visible)
- Script CI verification des liens (`scripts/check-links.js`)
- CSS commun factorise (`src/common.css`)
- Fichiers dupliques racine supprimes (arborescence propre)

## Points restants (non-bloquants)

- Les 2 CSS restent ~79 kB chacun (Vite ne fait pas de CSS code splitting entre entry points separes)
- Contenu content.ts utilise des classes Tailwind explicites (choix delibere pour le purge)
- BUG-48 : Comparaison SMIC inclut la mutuelle (impact mineur sur l'affichage comparatif)
- BUG-49 : `calculateHeuresComp` retourne un nombre d'heures affiche en EUR (nomenclature confuse mais calcul total correct)
- BUG-53 : Logique speciale btn-keys dans switchTab (fonctionnel, refactoring cosmetique)
- `style-src 'unsafe-inline'` necessaire pour Tailwind (contrainte framework)
