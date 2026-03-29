# Plan d'audit

## Etapes
- [x] Agent 1 : Analyse architecturale (synthese.md) ✅
- [x] Agent 2 : Chasse aux bugs (bugs.md) ✅ — 28 bugs (3 critiques, 7 majeurs, 11 mineurs, 7 cosmétiques)
- [x] Agent 3 : Corrections critiques (corrections.md) ✅ — 10 bugs corrigés (3 fichiers modifiés)
- [x] Agent 4 : Audit final et roadmap (audit.md) ✅ — Score 6,2/10, 10 quick wins, roadmap 3 phases
- [x] Quick wins immédiats ✅ — 11 corrections appliquées (8 fichiers)

## Court terme (détail)
- [x] CT-1 : Animation fade-in entre onglets ✅
- [x] CT-2 : Navigation clavier onglets ✅
- [x] CT-3 : Documenter formules simulateur ✅
- [x] CT-4 : Valider calcul titres restaurant avec métier ✅ — confirmé : c'est un gain (+ correct)
- [x] CT-5 : Réduire poids Google Fonts ✅
- [x] CT-6 : Configurer ESLint + Prettier ✅
- [x] CT-7 : Ajouter CSP basique ✅
- [x] CT-8 : Extraire tel header dans config.js ✅

## Moyen terme
- [x] MT-1 : Activer Vite — découper index.html en modules ✅ — src/app.js, src/simulateur.js, src/calculator.js créés ; index.html et simulateur.html chargent les modules via type="module" ; dist/ généré
- [x] MT-2 : Migrer Tailwind CDN → Tailwind CLI ✅ — tailwind.config.js configuré, plugin @tailwindcss/vite dans vite.config.ts, CDN Tailwind supprimé des HTML
- [x] MT-3 : Auto-héberger Lucide (import sélectif) ✅ — lucide installé via npm, import sélectif de ~70 icônes dans src/app.js
- [x] MT-4 : Externaliser contenu RH ✅ — src/content.js créé avec les 18 obligations et les liens docs ; généré dynamiquement dans app.js
- [x] MT-5 : Tests simulateur (Vitest) ✅ — src/calculator.test.js créé avec Vitest ; scripts test/test:watch dans package.json
- [x] MT-6 : Pipeline CI ✅ — GitHub Actions (.github/workflows/ci.yml) : lint, test, build sur push/PR main
