# Audit Final - AppIntervenants

**Date** : 29 mars 2026
**Version analysee** : post-corrections (10 bugs critiques/majeurs corriges)
**Fichiers audites** : `index.html`, `simulateur.html`, `config.js`, `sw.js`, `offline.html`, manifests, `vite.config.ts`

---

> **Mise a jour score — 29 mars 2026** : Suite a l'application des quick wins (QW-1 a QW-11), des corrections court terme (CT-1 a CT-8) et des ameliorations moyen terme (MT-1 a MT-5), le score estime passe de **6,2/10 a ~8,0/10**. Voir tableau mis a jour ci-dessous.

## 1. Score Global

### Score initial : 6,2 / 10 (post-correctifs critiques/majeurs)

| Categorie | Score initial | Score actuel | Changements |
|-----------|--------------|--------------|-------------|
| **Code qualite** | 5/10 | **8/10** | Vite active, src/ avec modules JS, calculator.js extrait, tests Vitest, ESLint+Prettier, code mort supprimé (index.tsx, GEMINI_API_KEY) |
| **Accessibilite** | 6/10 | **8/10** | rel="noopener noreferrer" ajouté, MSStream supprimé, min="0" sur inputs, navigation clavier onglets implementée |
| **Performance** | 5/10 | **8/10** | Tailwind CLI (~15KB) au lieu du CDN (~300KB), Lucide npm sélectif (~30KB) au lieu du bundle entier (~80KB), Vite bundle+minification, preconnect fonts |
| **Securite** | 6/10 | **8/10** | CSP basique ajouté, GEMINI_API_KEY supprimé, rel="noopener noreferrer" partout, meta Cache-Control supprimée |
| **PWA** | 7/10 | **8/10** | Scope corrigé ("./"), lang+dir+description dans manifests. Reste : icone maskable manquante |
| **UX/UI** | 8/10 | **9/10** | Animation fade-in rejoue entre onglets, "argent" corrigé, navigation clavier, meta description |
| **Maintenabilite** | 4/10 | **8/10** | src/ modulaire, content.js pour obligations RH, calculator.js testé, ESLint+Prettier configurés, formules documentées |

### Score actuel estimé : ~8,0 / 10

**Reste ouvert** :
- BUG-11 : titres restaurant signe +/- (en attente confirmation métier)
- BUG-12/13 : formules heures comp et SMIC net à documenter
- BUG-28 : icone maskable PWA
- MT-6 : pipeline CI (.github/workflows)

---

## 2. Quick Wins (impact maximal, effort minimal)

### QW-1 : Corriger "agent" en "argent" (BUG-21)

**Description** : Faute de sens dans les 18 obligations de l'intervenant.

**Fichier** : `index.html:878`

```html
<!-- AVANT -->
<p class="text-xs font-medium text-red-900 dark:text-red-200 leading-snug">Ne pas accepter d'agent ou de cadeaux de la part des clients</p>
<!-- APRES -->
<p class="text-xs font-medium text-red-900 dark:text-red-200 leading-snug">Ne pas accepter d'argent ou de cadeaux de la part des clients</p>
```

**Impact** : Correction d'une erreur de sens visible par tous les utilisateurs.
**Effort** : 2 minutes.

---

### QW-2 : Ajouter `rel="noopener noreferrer"` sur les liens externes (BUG-20)

**Description** : 16 liens `target="_blank"` dans `index.html` sans `rel="noopener noreferrer"`.

**Fichier** : `index.html` (lignes 167, 178, 189, 200, 930, 938, 946, etc.), `simulateur.html:44`

```html
<!-- Rechercher/remplacer dans les 2 fichiers -->
<!-- AVANT -->
target="_blank"
<!-- APRES -->
target="_blank" rel="noopener noreferrer"
```

**Impact** : Securite renforcee contre l'attaque `window.opener` sur anciens navigateurs. Bonne pratique universelle.
**Effort** : 10 minutes (rechercher/remplacer global).

---

### QW-3 : Ajouter `min="0"` aux inputs du simulateur (BUG-18)

**Description** : Les inputs `type="number"` acceptent des valeurs negatives.

**Fichier** : `simulateur.html:75,83,100,108,119`

```html
<!-- Taux horaire -->
<input type="number" id="input-rate" value="12.02" step="0.01" min="0" class="...">
<!-- Heures -->
<input type="number" id="input-hours" value="24" step="0.5" min="0" max="48" class="...">
<!-- KMs -->
<input type="number" id="input-kms" value="150" min="0" class="...">
<!-- Tickets -->
<input type="number" id="input-tickets" value="20" min="0" max="31" class="...">
<!-- Mutuelle -->
<input type="number" id="input-mutuelle-cost" value="20" min="0" class="...">
```

**Impact** : Empeche les resultats aberrants (salaire negatif, kms negatifs).
**Effort** : 5 minutes.

---

### QW-4 : Supprimer la meta Cache-Control inutile (BUG-15)

**Description** : `<meta http-equiv="Cache-Control">` est ignoree par les navigateurs modernes.

**Fichier** : `index.html:6`

```html
<!-- SUPPRIMER cette ligne -->
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
```

**Impact** : Code plus propre, suppression d'une fausse impression de controle du cache.
**Effort** : 1 minute.

---

### QW-5 : Simplifier la detection iOS (BUG-17)

**Description** : `!window.MSStream` est obsolete (IE/Edge Legacy n'existent plus).

**Fichier** : `index.html:1435`

```javascript
// AVANT
if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
// APRES
if (/iPad|iPhone|iPod/.test(userAgent)) {
```

**Impact** : Code plus lisible, suppression de code mort.
**Effort** : 1 minute.

---

### QW-6 : Enrichir les manifests PWA (BUG-19)

**Description** : Ajouter `lang`, `dir`, `description` aux manifests.

**Fichiers** : `manifest-nord.json`, `manifest-loches.json`

```json
{
  "lang": "fr",
  "dir": "ltr",
  "description": "Guide complet pour les intervenants O2 - remuneration, contacts, documents",
  "id": "Nord-Touraine",
  ...
}
```

**Impact** : Meilleure experience d'installation PWA, meilleur referencement dans les stores PWA.
**Effort** : 5 minutes.

---

### QW-7 : Changer le scope des manifests (BUG-16)

**Description** : `"scope": "/AppIntervenants/"` est hardcode et non portable.

**Fichiers** : `manifest-nord.json:6`, `manifest-loches.json:6`

```json
"scope": "./"
```

**Impact** : PWA portable, fonctionne si le chemin de deploiement change.
**Effort** : 1 minute.

---

### QW-8 : Ajouter `<link rel="preconnect">` pour les CDN

**Description** : Reduire la latence de chargement des CDN.

**Fichier** : `index.html` (apres la ligne 7), idem dans `simulateur.html`

```html
<link rel="preconnect" href="https://cdn.tailwindcss.com">
<link rel="preconnect" href="https://unpkg.com">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

**Impact** : Gain de 100-300ms sur le premier chargement (economie de DNS lookup + TCP + TLS).
**Effort** : 5 minutes.

---

### QW-9 : Supprimer le code mort (BUG-22, BUG-26)

**Description** : `index.tsx` (fichier vide) et `GEMINI_API_KEY` dans `vite.config.ts`.

```bash
# Supprimer le fichier vide
rm index.tsx

# Ou nettoyer vite.config.ts lignes 13-16
```

```typescript
// vite.config.ts - Supprimer le bloc define
// AVANT
define: {
    'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
},
// APRES
// (supprimer entierement le bloc define)
```

**Impact** : Moins de confusion pour les developpeurs. Elimine le risque de fuite de cle API si Vite est active.
**Effort** : 5 minutes.

---

### QW-10 : Ajouter `<meta name="description">` (BUG-27)

**Fichiers** : `index.html`, `simulateur.html`

```html
<meta name="description" content="Guide complet pour les intervenants O2 - remuneration, contacts, documents, simulateur de salaire">
```

**Impact** : SEO (si l'app est indexee), meilleur apercu lors du partage de lien.
**Effort** : 2 minutes.

---

## 3. Ameliorations structurelles (moyen terme)

### AS-1 : Decoupe du monolithe `index.html`

**Probleme** : 1522 lignes de HTML + CSS + JS dans un seul fichier.

**Solution** : Activer le pipeline Vite (deja configure) et decouper :

```
src/
  styles/
    base.css          # CSS custom (fade-in, nav-btn, etc.)
  scripts/
    app.js            # switchTab, applyConfig, installBanner, autoReload
    simulateur.js     # calculate, formatCurrency, loadAgencyConfig
  data/
    config.js         # GRILLE_SALARIALE + AGENCY_CONFIGS (deja separe)
  index.html          # Structure HTML uniquement
  simulateur.html     # Structure HTML uniquement
```

**Benefice** : Separation des concerns, tree-shaking, minification automatique, hot reload en dev.
**Effort** : 1-2 jours.

### AS-2 : Remplacer Tailwind CDN par Tailwind CLI/PostCSS

**Probleme** : Le CDN Tailwind charge ~300KB de CSS dont ~95% est inutilise. Deconseille en production par Tailwind Labs.

**Solution** :
```bash
npm install -D tailwindcss
npx tailwindcss init
```

Configurer `tailwind.config.js` avec `content: ["./*.html"]`, puis generer un CSS minifie (~10-20KB).

**Benefice** : -280KB de CSS, chargement 2-3x plus rapide, independance du CDN.
**Effort** : 2-3 heures.

### AS-3 : Externaliser le contenu RH dans un fichier de donnees

**Probleme** : Textes des 18 obligations, procedures, montants codes en dur dans `index.html`.

**Solution** : Creer un `content.js` avec les donnees structurees, generer le HTML dynamiquement.

```javascript
// content.js
const OBLIGATIONS = [
  { icon: "briefcase", color: "blue", text: "..." },
  // ...
];
```

**Benefice** : Mise a jour du contenu sans toucher au HTML. Possibilite de charger depuis un CMS/API plus tard.
**Effort** : 1 jour.

### AS-4 : Ajouter des tests pour le simulateur

**Probleme** : Les formules de paie ne sont pas testees. Les coefficients `0.1131`, `0.9825`, `0.097` sont des magic numbers.

**Solution** : Extraire la logique de calcul dans un module JS testable.

```javascript
// calculator.js
export function calculateNet(brut, mutuelleCost) {
  const COTISATIONS_SALARIALES = 0.1131;  // Source: bulletin paie type
  const ASSIETTE_CSG = 0.9825;            // 98.25% du brut = assiette CSG/CRDS
  const TAUX_CSG_CRDS = 0.097;            // CSG 9.2% + CRDS 0.5% = 9.7%
  return brut - (brut * COTISATIONS_SALARIALES) - (((brut * ASSIETTE_CSG) + mutuelleCost) * TAUX_CSG_CRDS);
}
```

Puis tester avec Vitest (deja compatible avec la config Vite existante).

**Benefice** : Confiance dans les formules de paie, documentation implicite des coefficients.
**Effort** : 1 jour.

### AS-5 : Configurer un linter et formatter

**Solution** :
```bash
npm install -D eslint prettier
```

**Benefice** : Coherence du code, detection d'erreurs statiques.
**Effort** : 1-2 heures.

---

## 4. UX / Accessibilite

### A-1 : Animation fade-in ne rejoue pas entre onglets (BUG-24)

**Fichier** : `index.html` - fonction `switchTab()`

```javascript
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.remove('active');
        el.classList.remove('fade-in');  // AJOUTER
    });
    const target = document.getElementById('tab-' + tabName);
    if(target) {
        target.classList.add('active');
        void target.offsetWidth; // Force reflow pour rejouer l'animation
        target.classList.add('fade-in');  // AJOUTER
    }
    // ... reste du code existant
```

**Impact** : Transition fluide entre les onglets au lieu d'un switch brut.

### A-2 : Navigation clavier entre onglets

**Probleme** : Les onglets ont `role="tab"` mais pas de gestion des fleches gauche/droite (pattern ARIA tabs).

**Solution** : Ajouter un gestionnaire clavier sur le tablist.

```javascript
// Ajouter apres la fonction switchTab()
const tabNames = ['home', 'daily', 'money', 'docs', 'keys'];
document.querySelector('[role="tablist"]').addEventListener('keydown', (e) => {
    const current = tabNames.findIndex(name =>
        document.getElementById('btn-' + name).getAttribute('aria-selected') === 'true'
    );
    let next = current;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (current + 1) % tabNames.length;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (current - 1 + tabNames.length) % tabNames.length;
    if (next !== current) {
        e.preventDefault();
        switchTab(tabNames[next]);
        document.getElementById('btn-' + tabNames[next]).focus();
    }
});
```

**Impact** : Conformite ARIA, navigation clavier complete pour les technologies d'assistance.

### A-3 : Ajouter des `aria-label` aux liens externes

**Probleme** : Les cartes outils (Gestion Cles, Declaration Kms, My Silae, Coffre Fort) sont des `<a>` sans `aria-label` explicite. Le texte est reparti entre `<span>` enfants, ce qui peut etre mal interprete par les lecteurs d'ecran.

**Solution** :
```html
<a href="#" id="link-gestion-cles" target="_blank" rel="noopener noreferrer"
   aria-label="Gestion des cles - Formulaire de suivi (ouvre un nouvel onglet)"
   class="...">
```

### A-4 : Contraste des textes `opacity-80` et `opacity-50`

**Probleme** : Certains textes utilisent `opacity-80` ou `opacity-50` (ex: ligne 106, 173, 184, 270), ce qui peut reduire le contraste sous le seuil WCAG AA (4.5:1).

**Solution** : Remplacer les opacites par des couleurs explicites avec contraste suffisant. Verifier avec un outil comme WebAIM Contrast Checker.

---

## 5. Performance

### P-1 : Supprimer Tailwind CDN (gain : -280KB)

Voir AS-2. Le CDN Tailwind est la plus grosse penalite de performance. Migrer vers Tailwind CLI reduit le CSS de ~300KB a ~15KB.

**Metrique attendue** : First Contentful Paint (FCP) reduit de 0.5-1s sur 3G.

### P-2 : Figer et auto-heberger Lucide Icons (gain : -80KB)

**Probleme** : `unpkg.com/lucide@0.460.0` charge le bundle complet (~80KB). L'app n'utilise qu'une trentaine d'icones.

**Solution** : Installer `lucide` via npm et importer uniquement les icones utilisees.

```bash
npm install lucide
```

```javascript
import { createIcons, Home, Phone, Euro, FileText, Key, /* ... */ } from 'lucide';
createIcons({ icons: { Home, Phone, Euro, FileText, Key, /* ... */ } });
```

**Metrique attendue** : -60KB de JS a charger.

### P-3 : Lazy-load des onglets non visibles

**Probleme** : Tout le contenu des 5 onglets est dans le DOM au chargement, meme si seul l'accueil est visible.

**Solution legere** : Charger le contenu des onglets au premier clic.

**Metrique attendue** : DOM initial reduit de ~60%, First Input Delay ameliore.

### P-4 : Optimiser le chargement des fonts

```html
<!-- Ajouter display=swap ET preconnect -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<!-- Reduire les poids charges (300 et 800-900 sont-ils vraiment utilises ?) -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
```

**Metrique attendue** : -50KB de fonts, FOIT reduit.

### P-5 : Metriques cibles Lighthouse

| Metrique | Estimation actuelle | Cible apres optimisations |
|----------|--------------------|-----------------------------|
| Performance | ~60-70 | 90+ |
| Accessibility | ~80 | 95+ |
| Best Practices | ~75 | 90+ |
| PWA | ~85 | 95+ |

---

## 6. Securite

### S-1 : Supprimer `GEMINI_API_KEY` de `vite.config.ts`

**Priorite** : Haute. Meme si Vite n'est pas utilise, la cle est dans le repo Git.

```typescript
// vite.config.ts - Supprimer les lignes 13-16
// Et verifier que .env n'est pas committe (le .gitignore actuel ne le mentionne pas)
```

### S-2 : Ajouter `.env` au `.gitignore`

**Fichier** : `.gitignore`

```
# Ajouter
.env
.env.local
.env.*.local
```

### S-3 : Ajouter un Content Security Policy (CSP)

```html
<!-- index.html - Dans <head> -->
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://unpkg.com;
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
               font-src https://fonts.gstatic.com;
               img-src 'self' data:;
               connect-src 'self'">
```

> Note : `unsafe-inline` et `unsafe-eval` sont necessaires tant que Tailwind CDN est utilise (il genere du CSS inline et evalue du JS). Migrer vers Tailwind CLI permettrait de supprimer ces directives.

### S-4 : Valider les inputs du simulateur cote JS

```javascript
// Au debut de calculate()
function calculate() {
    const rate = Math.max(0, parseFloat(inputs.rate.value) || 0);
    const hoursWeekly = Math.max(0, Math.min(48, parseFloat(inputs.hours.value) || 0));
    const kms = Math.max(0, parseFloat(inputs.kms.value) || 0);
    const tickets = Math.max(0, Math.min(31, parseFloat(inputs.tickets.value) || 0));
    // ...
}
```

### S-5 : Verifier le contenu du simulateur (BUG-11)

Le BUG-11 (titres restaurant ajoutes au net au lieu d'etre deduits) n'est pas encore corrige. La formule actuelle (`simulateur.html:280`) :

```javascript
const netMensuel = netBase + gainKms + costTickets - mutuelleCost;
```

Si `costTickets` represente la part salariale (deduite du salaire), le signe devrait etre `-` :

```javascript
const netMensuel = netBase + gainKms - costTickets - mutuelleCost;
```

**Action requise** : Confirmer avec le metier si les titres restaurant sont un gain ou une deduction sur le net affiche.

---

## 7. Roadmap

### Immediat (cette semaine)

| # | Action | Bug | Effort | Fichier |
|---|--------|-----|--------|---------|
| 1 | Corriger "agent" -> "argent" | BUG-21 | 2 min | `index.html:878` |
| 2 | Ajouter `rel="noopener noreferrer"` | BUG-20 | 10 min | `index.html`, `simulateur.html` |
| 3 | Ajouter `min="0"` aux inputs | BUG-18 | 5 min | `simulateur.html` |
| 4 | Supprimer meta Cache-Control | BUG-15 | 1 min | `index.html:6` |
| 5 | Simplifier detection iOS (`MSStream`) | BUG-17 | 1 min | `index.html:1435` |
| 6 | Enrichir manifests (`lang`, `description`) | BUG-19 | 5 min | `manifest-*.json` |
| 7 | Changer scope manifests -> `"./"` | BUG-16 | 1 min | `manifest-*.json` |
| 8 | Supprimer `index.tsx` et nettoyer `vite.config.ts` | BUG-22, BUG-26 | 5 min | `index.tsx`, `vite.config.ts` |
| 9 | Ajouter meta description | BUG-27 | 2 min | `index.html`, `simulateur.html` |
| 10 | Ajouter preconnect pour les CDN | - | 5 min | `index.html`, `simulateur.html` |
| 11 | Ajouter `.env` au `.gitignore` | - | 1 min | `.gitignore` |
| 12 | Ajouter icone `maskable` au manifest | BUG-28 | 15 min | `manifest-*.json` + icone |

**Effort total immediat** : ~1 heure.

### Court terme (1-2 semaines)

| # | Action | Effort |
|---|--------|--------|
| 1 | Faire rejouer l'animation fade-in (BUG-24) | 30 min |
| 2 | Ajouter navigation clavier entre onglets | 1h |
| 3 | Documenter les formules du simulateur (BUG-12, BUG-13) | 2h |
| 4 | Valider le calcul titres restaurant avec le metier (BUG-11) | 1h |
| 5 | Reduire les poids de Google Fonts (supprimer 300, 800, 900) | 30 min |
| 6 | Configurer ESLint + Prettier | 1-2h |
| 7 | Ajouter un CSP basique | 1h |
| 8 | Extraire le numero Ligne Salaries dans config.js (BUG-23) | 30 min |

**Effort total court terme** : ~1 semaine.

### Moyen terme (1-2 mois)

| # | Action | Effort | Impact |
|---|--------|--------|--------|
| 1 | Activer Vite : decoupe `index.html` en modules | 1-2 jours | Maintenabilite +++ |
| 2 | Migrer Tailwind CDN -> Tailwind CLI | 2-3h | Performance +++ (-280KB) |
| 3 | Auto-heberger Lucide (import selectif) | 2h | Performance ++ (-60KB) |
| 4 | Externaliser le contenu RH dans un fichier de donnees | 1 jour | Maintenabilite ++ |
| 5 | Ecrire des tests pour le simulateur (Vitest) | 1 jour | Fiabilite ++ |
| 6 | Ajouter un pipeline CI (lint + test + build) | 1 jour | Qualite ++ |
| 7 | Auditer les contrastes couleur (WCAG AA) | 2h | Accessibilite + |

**Effort total moyen terme** : ~2 semaines de travail effectif.

---

## Resume des bugs restants (post-corrections)

| ID | Severite | Description | Statut |
|----|----------|-------------|--------|
| BUG-11 | Mineur | Titres restaurant : signe +/- a verifier | En attente metier |
| BUG-12 | Mineur | Formule heures complementaires non documentee | A documenter |
| BUG-13 | Mineur | SMIC net biaise par la mutuelle | A documenter |
| BUG-14 | Mineur | `innerHTML` avec contenu statique | Acceptable |
| BUG-15 | Mineur | Meta Cache-Control inutile | A corriger |
| BUG-16 | Mineur | Scope PWA hardcode | A corriger |
| BUG-17 | Mineur | `MSStream` obsolete | A corriger |
| BUG-18 | Mineur | Pas de `min="0"` sur inputs | A corriger |
| BUG-19 | Mineur | Manifests incomplets | A corriger |
| BUG-20 | Mineur | Pas de `rel="noopener"` | A corriger |
| BUG-21 | Mineur | "agent" au lieu de "argent" | A corriger |
| BUG-22 | Cosmetique | GEMINI_API_KEY code mort | A nettoyer |
| BUG-23 | Cosmetique | Tel header hardcode | A externaliser |
| BUG-24 | Cosmetique | Animation fade-in ne rejoue pas | A corriger |
| BUG-25 | Cosmetique | Commentaire numerotation | Negligeable |
| BUG-26 | Cosmetique | `index.tsx` vide | A supprimer |
| BUG-27 | Cosmetique | Pas de meta description | A ajouter |
| BUG-28 | Cosmetique | Pas d'icone maskable | A ajouter |
