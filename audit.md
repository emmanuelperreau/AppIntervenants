# Audit AppIntervenants

**Date** : 29 mars 2026
**Version** : post-migration Vite + Tailwind v4

---

## 1. Bugs corrigés

### Critiques (corrigés)

| ID | Description | Correctif | Statut |
|----|-------------|-----------|--------|
| BUG-01 | `user-scalable=no` bloquait le zoom | Supprimé du viewport meta | OK |
| BUG-02 | CDN Tailwind/Lucide non versionnés | Migrés vers npm (Tailwind v4 + Lucide v1.7) | OK |
| BUG-03 | SW `cache.addAll` échouait sur CDN | Séparé LOCAL_ASSETS / CDN_ASSETS avec try/catch | OK |

### Majeurs (corrigés)

| ID | Description | Correctif | Statut |
|----|-------------|-----------|--------|
| BUG-04 | Manifest par défaut Loches au lieu de Nord | Aligné sur nord-touraine | OK |
| BUG-05 | apple-web-app-title après le script inline | Déplacé avant le script | OK |
| BUG-06 | Pas de rôles ARIA sur les onglets | Ajouté tablist/tab/tabpanel + aria-selected | OK |
| BUG-07 | `clients.claim()` hors de `waitUntil` | Chaîné dans waitUntil | OK |
| BUG-08 | SW ne cachait pas les réponses navigation | Ajouté cache.put sur les réponses fraîches | OK |
| BUG-09 | Mutuelle hardcodée | Remplacé par placeholder via config.js | OK |
| BUG-10 | `skipWaiting()` hors de `waitUntil` | Chaîné dans waitUntil | OK |

### Migration Tailwind v3 -> v4 (corrigés le 29/03/2026)

| ID | Description | Correctif | Statut |
|----|-------------|-----------|--------|
| BUG-29 | `@tailwind base/components/utilities` (v3) ignoré par Tailwind v4 → CSS quasi-vide (10KB au lieu de 78KB) | Migré vers `@import "tailwindcss"` + `@source` dans styles.css et simulateur-styles.css | OK |
| BUG-30 | `createIcons()` appelé sans icônes → aucune icône SVG rendue (cercles vides) | Passé `createIcons({ icons })` avec toutes les icônes importées | OK |
| BUG-31 | `renderObligations()` utilise `ob.color` (inexistant) → classes CSS `text-undefined-600` | Réécrit pour utiliser `ob.borderClass`, `ob.iconClass`, `ob.textClass` de content.js | OK |
| BUG-32 | `renderDocuments()` utilise `doc.color` (inexistant) → même problème | Réécrit pour utiliser `doc.hoverClass`, `doc.iconBgClass`, `doc.iconTextClass`, `doc.hoverTextClass` | OK |

---

## 2. Bugs mineurs restants

| ID | Description | Fichier | Statut |
|----|-------------|---------|--------|
| BUG-11 | Titres restaurant : signe +/- à vérifier avec le métier | simulateur.html | En attente métier |
| BUG-12 | Formule heures complémentaires non documentée | simulateur.html | A documenter |
| BUG-13 | SMIC net biaisé par la mutuelle | simulateur.html | A documenter |
| BUG-33 | `tailwind.config.js` présent mais ignoré par Tailwind v4 | tailwind.config.js | A supprimer |

---

## 3. Améliorations déjà réalisées

- [x] Vite activé avec modules ES (src/app.js, src/content.js, config.js)
- [x] Tailwind CSS v4 via `@tailwindcss/vite` (CSS purgé ~78KB)
- [x] Lucide Icons via npm, import sélectif (~42KB JS)
- [x] Tests Vitest pour le simulateur (calculator.js)
- [x] ESLint + Prettier configurés
- [x] GitHub Actions CI (lint + test + build + deploy)
- [x] CSP basique ajouté
- [x] Navigation clavier entre onglets (ARIA tabs pattern)
- [x] Animation fade-in rejouée entre onglets
- [x] Content RH externalisé dans content.js
- [x] rel="noopener noreferrer" sur tous les liens externes
- [x] meta description ajoutée
- [x] Manifests enrichis (lang, dir, description, scope "./")
- [x] Google Fonts optimisé (poids réduits, preconnect)
- [x] .env dans .gitignore
- [x] GEMINI_API_KEY supprimé

---

## 4. Plan de corrections restantes

### Immédiat (à faire maintenant)

| # | Action | Fichier | Effort |
|---|--------|---------|--------|
| 1 | Supprimer `tailwind.config.js` (inutilisé par Tailwind v4) | tailwind.config.js | 1 min |

### Court terme

| # | Action | Effort |
|---|--------|--------|
| 1 | Confirmer calcul titres restaurant avec le métier (BUG-11) | 1h |
| 2 | Documenter les formules du simulateur (BUG-12, BUG-13) | 2h |
| 3 | Auditer les contrastes couleur WCAG AA | 2h |
| 4 | Ajouter icône maskable au manifest | 15 min |
