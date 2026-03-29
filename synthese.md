# Synthese Architecturale - AppIntervenants

> Derniere mise a jour : 2026-03-29

## 1. Stack technique

| Couche | Technologie | Version exacte (package.json) |
|--------|-------------|-------------------------------|
| **Frontend** | HTML/CSS/TypeScript | Pas de framework (React, Vue, etc.) |
| **TypeScript** | Strict mode, code source en .ts | `typescript@~5.8.2`, `@types/node@^22.14.0` |
| **CSS** | Tailwind CSS v4 via plugin Vite | `tailwindcss@^4.2.2`, `@tailwindcss/vite@^4.2.2` |
| **Icones** | Lucide Icons (npm, auto-hebergees) | `lucide@^1.7.0` (seule dependance runtime) |
| **Fonts** | Google Fonts Inter (local, woff2) | `public/fonts/inter-{400,600,700}.woff2` |
| **PWA** | vite-plugin-pwa (Workbox generateSW) | `vite-plugin-pwa@^1.2.0` — 18 entries pre-cachees |
| **Build** | Vite | `vite@^6.2.0` |
| **Tests** | Vitest | `vitest@^4.1.2` — 40 tests (2 fichiers) |
| **Lint** | ESLint flat config + TypeScript ESLint + Prettier | `eslint@^10.1.0`, `typescript-eslint@^8.57.2`, `eslint-config-prettier@^10.1.8`, `prettier@^3.8.1` |
| **CI/CD** | GitHub Actions | `.github/workflows/ci.yml` — lint, tsc, test, build, deploy GitHub Pages |
| **Dark mode** | Tailwind `dark:` (media query) | Suit le reglage systeme |
| **Hebergement** | GitHub Pages | Deploy automatique via `actions/deploy-pages@v4` |

## 2. Arborescence commentee

```
AppIntervenants/
├── .github/
│   └── workflows/
│       └── ci.yml                 # Pipeline CI/CD : lint + tsc + test + build + deploy GitHub Pages
├── public/                        # Assets statiques copies tels quels par Vite dans dist/
│   ├── fonts/
│   │   ├── inter-400.woff2        # Google Font Inter Regular (local)
│   │   ├── inter-600.woff2        # Google Font Inter SemiBold (local)
│   │   └── inter-700.woff2        # Google Font Inter Bold (local)
│   ├── manifest-nord.json         # Manifest PWA Nord Touraine (start_url: ?agence=nord-touraine)
│   ├── manifest-loches.json       # Manifest PWA Loches (start_url: ?agence=loches)
│   ├── offline.html               # Page fallback hors-ligne
│   ├── icon.svg                   # Icone SVG
│   ├── icon-192.png               # Icone PWA 192x192
│   ├── icon-384.png               # Icone PWA 384x384
│   ├── icon-512.png               # Icone PWA 512x512 + maskable
│   └── apple-touch-icon.png       # Icone iOS
├── scripts/
│   └── check-links.js             # Script CI verification des liens Google Drive
├── src/                           # Modules TypeScript (bundles par Vite)
│   ├── app.ts                     # Point d'entree index.html : config agence, navigation onglets, install banner, SW, icones Lucide
│   ├── simulateur.ts              # Point d'entree simulateur.html : listeners inputs, calcul temps reel, affichage
│   ├── calculator.ts              # Fonctions de calcul pures (12 fonctions exportees, testables)
│   ├── calculator.test.ts         # Tests Vitest : 30+ assertions couvrant toutes les fonctions de calcul
│   ├── dom.test.js                # Tests DOM : integrite des donnees (magic numbers, config)
│   ├── content.ts                 # Contenu RH externalise : 18 obligations + 11 liens documents
│   ├── common.css                 # CSS partage (pb-safe, etc.)
│   ├── styles.css                 # CSS principal : import Tailwind v4 + styles custom (onglets, nav, animations)
│   └── simulateur-styles.css      # CSS simulateur : import Tailwind v4 + styles custom (slide-in, inputs)
├── index.html                     # Page principale — app mono-page a 5 onglets
├── simulateur.html                # Simulateur de salaire net — page autonome
├── config.ts                      # Configuration centralisee : GRILLE_SALARIALE + AGENCY_CONFIGS (2 agences)
├── vite.config.ts                 # Config Vite : base, plugin tailwindcss, vite-plugin-pwa, multi-page input
├── tsconfig.json                  # Config TypeScript : ES2022, strict, noEmit, bundler resolution
├── package.json                   # npm scripts : dev, build, preview, lint, format, test, test:watch
├── eslint.config.js               # ESLint flat config (v10+) : recommended + typescript-eslint + prettier + globals browser
├── .prettierrc                    # Prettier : semi, singleQuote, tabWidth 2, trailingComma es5, printWidth 100
├── .gitignore                     # Exclusions : node_modules, dist, .env, logs, IDE
├── metadata.json                  # Metadata projet
├── CLAUDE.md                      # Instructions projet pour Claude Code
├── README.md                      # Documentation projet
├── audit.md                       # Audit final avec scores et corrections
├── plan.md                        # Plan de travail avec historique
└── synthese.md                    # Ce fichier
```

## 3. Flux utilisateur

### Navigation principale (`index.html`)

L'app est une SPA manuelle avec 5 onglets geres par `switchTab()` dans `src/app.ts`.

| Onglet | ID bouton | ID contenu | Contenu |
|--------|-----------|------------|---------|
| **Accueil** | `btn-home` | `tab-home` | Grille 2x2 outils (Gestion Cles, Declaration Kms, My Silae, Coffre Fort) + mission + 5 valeurs O2 |
| **Quotidien** | `btn-daily` | `tab-daily` | Telephone & Scan QR, Equipements & Securite, Fiche de route, Cahier de liaison, 18 obligations (generees depuis `content.ts`) |
| **Remuneration** | `btn-money` | `tab-money` | Grille salariale 3 metiers (AM, GE, AV) x niveaux, prime anciennete, transport/kms, prime carburant, titres resto, mutuelle, cheques cadeaux/vacances, parrainages, majorations horaires, conges |
| **Docs** | `btn-docs` | `tab-docs` | 11 liens documents (guides metier, convention collective, DUE, accords) generes depuis `content.ts` + mentions legales |
| **Contacts** | `btn-keys` | `tab-keys` | Urgences 112, Ligne Salaries, Agence O2, Porte close, Maladie/Accident, Medecine du travail |

### Barre de navigation
- Fixee en bas de l'ecran
- 5 boutons avec icones Lucide + libelle
- Responsive : `flex-col` mobile, `flex-row` desktop, `md:rounded-full` capsule sur desktop
- Style actif : fond bleu clair + icone agrandie
- Navigation clavier : fleches gauche/droite/haut/bas
- Attributs ARIA : `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`
- Skip-to-content : lien "Aller au contenu principal" en haut de page

### Simulateur (`simulateur.html`)
- Page autonome, lien retour vers `index.html?agence=X`
- Point d'entree : `src/simulateur.ts`
- **Inputs** : taux horaire brut (defaut 12.02), heures hebdo (defaut 24), kms (defaut 150), titres restaurant (defaut 20), mutuelle checkbox + cout
- **Calcul temps reel** : listeners `input`/`change` sur tous les champs
- **Moteur** : 12 fonctions pures dans `src/calculator.ts`, importees par `simulateur.ts`
- **Affichage** : gain net mensuel moyen (lisse avec primes), gain net/heure, comparaison SMIC, cout employeur

### Installation PWA (`src/app.ts`)
1. Detection `window.matchMedia('(display-mode: standalone)')` — si deja installe, ne rien afficher
2. Capture `beforeinstallprompt` (Android Chrome) -> affiche bouton natif "Installer l'application"
3. Fallback apres 3s : detection userAgent iOS/Android -> instructions manuelles (Partager > Ecran d'accueil)
4. Dismiss stocke dans `localStorage` (cle `install_banner_dismissed`) avec expiration 7 jours

### Auto-reload (`src/app.ts`)
- Ecoute `visibilitychange` sur le document
- Si l'app etait masquee > 10 min (600000ms) : force `registration.update()` + `window.location.reload()`

## 4. Dependances

### NPM (package.json)

**Runtime** (dependencies) :
| Package | Version | Usage |
|---------|---------|-------|
| `lucide` | `^1.7.0` | Icones SVG (tree-shake par Vite, import selectif) |

**Dev** (devDependencies) :
| Package | Version | Usage |
|---------|---------|-------|
| `vite` | `^6.2.0` | Bundler, dev server |
| `vite-plugin-pwa` | `^1.2.0` | PWA Workbox generateSW (pre-cache bundles) |
| `tailwindcss` | `^4.2.2` | Framework CSS utility-first |
| `@tailwindcss/vite` | `^4.2.2` | Plugin Vite pour Tailwind v4 |
| `typescript` | `~5.8.2` | Type checking strict sur tout le code source |
| `@types/node` | `^22.14.0` | Types Node.js |
| `typescript-eslint` | `^8.57.2` | ESLint rules pour TypeScript |
| `@typescript-eslint/eslint-plugin` | `^8.57.2` | Plugin ESLint TypeScript |
| `@typescript-eslint/parser` | `^8.57.2` | Parser ESLint TypeScript |
| `vitest` | `^4.1.2` | Framework de test (40 tests) |
| `jsdom` | `^29.0.1` | Environnement DOM pour tests |
| `eslint` | `^10.1.0` | Linter JavaScript/TypeScript |
| `@eslint/js` | `^10.0.1` | Config ESLint recommended |
| `globals` | `^17.4.0` | Globals browser/node pour ESLint |
| `eslint-config-prettier` | `^10.1.8` | Desactive regles ESLint conflictuelles avec Prettier |
| `prettier` | `^3.8.1` | Formateur de code |

### CDN externes
Aucune. Google Fonts Inter est hebergee localement dans `public/fonts/`.

### Services externes
| Service | URL | Usage |
|---------|-----|-------|
| **Google Forms** | `docs.google.com/forms/...` | Gestion cles + Declaration kms (2 formulaires par agence) |
| **Google Drive** | `drive.google.com/file/...` | Hebergement documents RH (guides, DUE, accords) |
| **My Silae** | `my.silae.fr/sign-in` | Portail conges et paie |
| **edocperso.fr** | `edocperso.fr/login` | Coffre-fort bulletins de paie |
| **Legifrance** | `legifrance.gouv.fr/conv_coll/...` | Convention collective CCN SAP |

### APIs
- Aucune API backend consommee. Application 100% statique.

## 5. Architecture

### Pattern global
**Application statique multi-page** (2 entrees HTML) bundlee par Vite + vite-plugin-pwa. Deploiement sur GitHub Pages via CI/CD automatique.

- `index.html` -> `src/app.ts` (point d'entree Vite)
- `simulateur.html` -> `src/simulateur.ts` (point d'entree Vite)
- Config Vite multi-page dans `vite.config.ts`

### Separation des responsabilites

```
config.ts          -> Donnees metier (grille salariale, configs agences)
src/content.ts     -> Contenu RH (obligations, documents)
src/calculator.ts  -> Logique de calcul pure (fonctions exportees, sans effets de bord)
src/app.ts         -> Orchestration index.html (config, navigation, PWA, icones)
src/simulateur.ts  -> Orchestration simulateur (listeners, affichage)
src/styles.css     -> Styles custom + import Tailwind (page principale)
src/common.css     -> Styles partages (pb-safe, etc.)
sw.js (genere)     -> Service Worker Workbox (pre-cache, offline)
```

### Gestion d'etat
- **Aucun state management** : tout est dans le DOM
- Navigation par onglets : `display: none/block` via classes CSS `.tab-content` / `.tab-content.active`
- Configuration agence : lecture du query param `?agence=X` a chaque chargement
- Persistance : uniquement `localStorage` pour le dismiss du bandeau d'installation

### Gestion multi-agence
Architecture data-driven via `config.ts` :
- `GRILLE_SALARIALE` : constantes salariales partagees entre toutes les agences
- `AGENCY_CONFIGS` : 2 agences configurees (`nord-touraine` par defaut, `loches`)
- Chaque config agence contient : nom, telephone, URLs formulaires, mutuelle, medecine du travail, liens docs, contacts
- `applyConfig()` dans `src/app.ts` : injecte les valeurs dans le DOM via `getElementById`
- Manifest PWA dynamique : script inline dans `<head>` choisit le manifest selon `?agence=`
- Simulateur : `loadAgencyConfig()` charge le cout mutuelle depuis la config

### Communication entre modules
- **ES Modules** : `import`/`export` standard TypeScript
- `config.ts` exporte `GRILLE_SALARIALE` et `AGENCY_CONFIGS` -> importe par `src/app.ts` et `src/simulateur.ts`
- `src/content.ts` exporte `OBLIGATIONS` et `DOCUMENTS` -> importe par `src/app.ts`
- `src/calculator.ts` exporte 12 fonctions pures + constantes -> importe par `src/simulateur.ts` et tests

## 6. Service Worker (Workbox via vite-plugin-pwa)

### Strategie
Le Service Worker est genere automatiquement par `vite-plugin-pwa` en mode `generateSW` (Workbox). Il pre-cache **tous les assets du build** (HTML, JS, CSS, fonts, icones, manifests) — 18 entries, 469.76 kB total.

| Aspect | Details |
|--------|---------|
| **Mode** | generateSW (Workbox) |
| **Pre-cache** | 18 entries (469.76 kB) — inclut bundles JS/CSS hashes |
| **Fichier genere** | `dist/sw.js` + `dist/workbox-*.js` |
| **Offline** | Complet — tous les assets sont pre-caches au premier chargement |

### Avantage vs ancien SW manuel
L'ancien `sw.js` manuel ne pouvait pas pre-cacher les bundles Vite (noms avec hash dynamique). Workbox genere automatiquement le manifeste de pre-cache au build, incluant tous les fichiers avec leurs hash de revision.

## 7. CI/CD (`.github/workflows/ci.yml`)

### Pipeline
| Job | Steps | Declencheur |
|-----|-------|-------------|
| **ci** | checkout -> setup Node 20 -> `npm ci` -> `npm run lint` -> `npx tsc --noEmit` -> `npm test` -> `npm run build` -> upload artifact | push/PR sur `main` |
| **deploy** | Deploy to GitHub Pages (`actions/deploy-pages@v4`) | push sur `main` uniquement (apres ci) |

### Configuration
- Concurrency group `pages` avec `cancel-in-progress: false`
- Permissions : `contents: read`, `pages: write`, `id-token: write`

## 8. Points forts

1. **TypeScript strict** : tout le code source en .ts, `npx tsc --noEmit` passe sans erreur, detection d'erreurs au build.
2. **Zero dependance runtime lourde** : seul `lucide` en runtime, tree-shake par Vite. Pas de framework JS.
3. **PWA complete Workbox** : vite-plugin-pwa genere un SW avec pre-cache de tous les assets (18 entries). Offline complet des le premier chargement.
4. **Multi-agence extensible** : ajouter une agence = un objet dans `AGENCY_CONFIGS` + un manifest JSON.
5. **Contenu externalise** : obligations et documents dans `content.ts`, grille salariale dans `config.ts`.
6. **40 tests** : fonctions pures testees + tests DOM d'integrite des donnees.
7. **Dark mode natif** : suit le reglage systeme via classes Tailwind `dark:`.
8. **Accessibilite** : skip-to-content, `role="tabpanel"`, ARIA tabs, navigation clavier, focus-visible.
9. **CI/CD complet** : lint + tsc + test + build + deploy a chaque push sur `main`.
10. **CSP renforcee** : hash SHA-256, pas de `unsafe-inline` ni `unsafe-eval` pour les scripts.
11. **Fonts locales** : Google Fonts Inter en woff2 local, zero CDN externe.
12. **ESLint + TypeScript ESLint** : flat config v10, 0 erreurs, 0 warnings.

## 9. Points faibles / observations

### CSS duplique entre les 2 pages
Les 2 CSS (`main.css` ~79 kB, `simulateur.css` ~79 kB) contiennent chacun l'integralite des utilitaires Tailwind utilises dans le projet. Vite ne fait pas de CSS code splitting entre entry points separes. Impact faible grace au gzip (~12 kB chacun).

### Classes Tailwind dans content.ts
Le contenu RH dans `content.ts` inclut des classes Tailwind explicites. C'est un choix delibere pour que le purge Tailwind detecte correctement les classes utilisees.

### Formules de paie non sourcees
Les coefficients dans `calculator.ts` (taux cotisations, CSG/CRDS, charges patronales) sont commentes "source : bulletin de paie type O2" sans reference precise. Risque si les taux changent.

### Nommage confus cheques vacances
`config.ts` : `chequesVacances: 100` (total) vs `chequesVacancesEmployeur: 80` (part employeur). Fonctionnellement correct mais prete a confusion.

### Liens Google Drive fragiles
Les 16+ liens Google Drive dans `config.ts` et `content.ts` pointent vers des fichiers partages. Script `check-links.js` disponible pour verification, mais pas execute automatiquement en CI.
