# Plan d'audit et corrections

## Etapes passees

- [x] Agent 1 : Analyse architecturale (synthese.md)
- [x] Agent 2 : Chasse aux bugs (audit.md) — 1er passage
- [x] Agent 3 : Corrections critiques
- [x] Agent 4 : Audit final et roadmap
- [x] Quick wins immediats — 11 corrections appliquees
- [x] Agent 2 : 2e passage audit complet — 15 nouveaux bugs (1 critique, 3 majeurs, 9 mineurs, 2 cosmetiques)
- [x] Agent 3 : Corrections P0+P1+P2 — 7 bugs corriges, 1 differe (BUG-43)
- [x] Migration TypeScript strict (.js -> .ts)
- [x] Integration vite-plugin-pwa (Workbox, 18 entries pre-cachees)
- [x] Google Fonts en local (woff2)
- [x] CSP renforcee (hash SHA-256)
- [x] Accessibilite complete (skip-to-content, tabpanel, aria-labels, focus visible)
- [x] Magic numbers injectes dynamiquement depuis config
- [x] Icone maskable PWA
- [x] Script CI verification des liens
- [x] Tests DOM (40 tests total)
- [x] Rapport final (audit.md, plan.md, synthese.md, CLAUDE.md)

## Corrections appliquees — par priorite

### P0 — Critique

- [x] **BUG-40** : Passer `{ icons: { ArrowLeft, Info } }` a `createIcons()` dans simulateur

### P1 — Majeur

- [x] **BUG-41** : Elargir le scope lint a `'**/*.{js,ts}'`
- [x] **BUG-42** : Retirer `'unsafe-eval'` de la CSP
- [x] **BUG-43** : Pre-cache des bundles Vite via vite-plugin-pwa Workbox

### P2 — Mineur

- [x] **BUG-44** : Supprimer les 9 fichiers dupliques a la racine
- [x] **BUG-45** : Ajouter icone maskable dans les manifests PWA
- [x] **BUG-46** : Ajouter `.pb-safe` dans simulateur-styles.css
- [x] **BUG-47** : Injecter dynamiquement les magic numbers du HTML depuis config
- [x] **BUG-50** : Installer package `globals` pour ESLint
- [x] **BUG-51** : Aligner font-weights CDN (resolu par migration fonts locales)
- [x] **BUG-52** : Corriger couleur bouton Accueil actif
- [x] **BUG-54** : Elargir scope format Prettier

### Non traites (non-bloquants)

- [ ] **BUG-48** : Comparaison SMIC sans mutuelle dans le simulateur
- [ ] **BUG-49** : `calculateHeuresComp` retourne heures, pas EUR
- [ ] **BUG-53** : Remplacer logique speciale btn-keys par data-attribute

## Historique complet (termine)

- [x] CT-1 : Animation fade-in entre onglets
- [x] CT-2 : Navigation clavier onglets
- [x] CT-3 : Documenter formules simulateur
- [x] CT-4 : Valider calcul titres restaurant avec metier
- [x] CT-5 : Reduire poids Google Fonts
- [x] CT-6 : Configurer ESLint + Prettier
- [x] CT-7 : Ajouter CSP basique
- [x] CT-8 : Extraire tel header dans config.js
- [x] MT-1 : Activer Vite — decouper index.html en modules
- [x] MT-2 : Migrer Tailwind CDN vers Tailwind CLI / Vite
- [x] MT-3 : Auto-heberger Lucide (import selectif)
- [x] MT-4 : Externaliser contenu RH
- [x] MT-5 : Tests simulateur (Vitest)
- [x] MT-6 : Pipeline CI
- [x] MT-7 : Migration TypeScript strict
- [x] MT-8 : vite-plugin-pwa Workbox
- [x] MT-9 : Google Fonts en local
- [x] MT-10 : CSP hash SHA-256
- [x] MT-11 : Accessibilite complete
- [x] MT-12 : Script check-links CI
