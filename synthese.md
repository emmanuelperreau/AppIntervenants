# Synthese Architecturale - AppIntervenants

## 1. Stack technique

| Couche | Technologie | Details |
|--------|-------------|---------|
| **Frontend** | HTML/CSS/JS vanilla | Pas de framework JS (React, Vue, etc.) |
| **CSS** | Tailwind CSS CLI + Vite plugin | `@tailwindcss/vite` — CSS purgé (~15KB vs ~300KB CDN) |
| **Icones** | Lucide Icons via npm | `lucide` installé en local, import sélectif dans `src/app.js` |
| **Fonts** | Google Fonts (Inter) | Poids 400, 600, 700 uniquement |
| **PWA** | Service Worker manuel | `sw.js` - Cache API, strategie hybride |
| **Build** | Vite 6.2 + TypeScript | **Actif** — `vite build` génère `dist/` ; modules dans `src/` |
| **Tests** | Vitest | `src/calculator.test.js` — `npm test` |
| **Linter** | ESLint + Prettier | `.eslintrc.json`, `.prettierrc` configurés |
| **Dark mode** | Tailwind `darkMode: 'media'` | Suit le reglage systeme |

## 2. Arborescence commentee

```
AppIntervenants/
├── index.html              # Page principale - app mono-page a onglets (structure HTML + import src/app.js)
├── simulateur.html         # Simulateur de salaire net - page autonome (import src/simulateur.js)
├── offline.html            # Page fallback hors-ligne pour le SW
├── config.js               # Configuration centralisee : grille salariale + configs agences
├── sw.js                   # Service Worker : cache + strategies fetch
├── vite.config.ts          # Config Vite active : plugin tailwindcss, build multi-page
├── tailwind.config.js      # Config Tailwind : content, darkMode, theme
├── tsconfig.json           # Config TypeScript
├── package.json            # Runtime: lucide. Dev: vite, tailwindcss, eslint, prettier, vitest
├── .eslintrc.json          # Config ESLint
├── .prettierrc             # Config Prettier
├── manifest-nord.json      # Manifest PWA agence Nord Touraine (scope "./" , lang "fr")
├── manifest-loches.json    # Manifest PWA agence Loches (scope "./", lang "fr")
├── metadata.json           # Metadata projet
├── icon.svg                # Icone SVG vectorielle
├── icon-192.png            # Icone PWA 192x192
├── icon-384.png            # Icone PWA 384x384
├── icon-512.png            # Icone PWA 512x512
├── apple-touch-icon.png    # Icone iOS
├── .gitignore              # Exclusions standard
├── src/                    # Modules JS (bundlés par Vite)
│   ├── app.js              # Logique principale : switchTab, applyConfig, install banner, icons Lucide
│   ├── simulateur.js       # Logique simulateur : listeners, affichage résultats
│   ├── calculator.js       # Fonctions de calcul pures (exportées, testées)
│   ├── content.js          # Contenu RH externalisé : obligations, structure docs
│   ├── calculator.test.js  # Tests Vitest pour toutes les fonctions de calcul
│   ├── styles.css          # CSS custom global (fade-in, nav-btn, etc.)
│   └── simulateur-styles.css # CSS custom simulateur
└── dist/                   # Build de production généré par `vite build`
    ├── index.html
    ├── simulateur.html
    └── assets/             # JS/CSS bundlés et minifiés
```

## 3. Flux utilisateur

### Navigation principale (`index.html`)
L'app utilise un systeme d'onglets maison via `switchTab()` (`index.html:1457-1492`).

| Onglet | ID | Contenu |
|--------|----|---------|
| **Accueil** | `tab-home` | Grille 2x2 d'outils (Gestion Cles, Declaration Kms, My Silae, Coffre Fort) + mission/valeurs O2 |
| **Quotidien** | `tab-daily` | Telephone & Scan, Equipements, Fiche de route, Cahier de liaison, 18 obligations |
| **Remuneration** | `tab-money` | Grille salariale (3 metiers x niveaux), primes, transport, tickets resto, mutuelle, cheques, majorations, conges |
| **Docs** | `tab-docs` | 11 liens vers Google Drive / Legifrance (guides metier, convention collective, DUE) |
| **Contacts** | `tab-keys` | Urgences (112), Ligne Salaries, Agence, Porte close, Maladie/Accident, Medecine du travail |

### Barre de navigation
- Fixee en bas (`index.html:1212-1242`)
- 5 boutons avec icones Lucide
- Responsive : `flex-col` mobile, `flex-row` desktop
- Style actif via classes `.nav-btn.active` + CSS custom (`index.html:74-83`)

### Simulateur (`simulateur.html`)
- Page autonome avec lien retour vers `index.html?agence=X`
- Inputs : taux horaire, heures hebdo, kms, titres restaurant, mutuelle
- Calcul temps reel via listeners `input`/`change` (`simulateur.html:331-339`)
- Affiche : net mensuel, net horaire, comparaison SMIC, cout employeur
- Formule nette : `(Brut * 0.8869) - (((Brut * 0.9825) + Mutuelle) * 0.097)` (`simulateur.html:268`)

### Installation PWA (`index.html:1383-1455`)
1. Capture `beforeinstallprompt` (Android Chrome) -> bouton natif
2. Fallback apres 3s : instructions manuelles iOS (Partager > Ecran d'accueil) ou Android (Menu > Ajouter)
3. Dismiss stocke dans `localStorage` avec expiration 7 jours

## 4. Dependances

### NPM (`package.json`)
- **Runtime** : `lucide@^1.7.0` (icônes, bundlé par Vite)
- **Dev** : `vite@^6.2.0`, `@tailwindcss/vite@^4.2.2`, `tailwindcss@^4.2.2`, `typescript@~5.8.2`, `@types/node@^22.14.0`, `eslint@^10.1.0`, `prettier@^3.8.1`, `vitest@^4.1.2`

### CDN (chargees a chaque visite)
| Ressource | URL | Risque |
|-----------|-----|--------|
| ~~Tailwind CSS~~ | ~~`cdn.tailwindcss.com`~~ | **Supprimé** — migré vers Tailwind CLI |
| ~~Lucide Icons~~ | ~~`unpkg.com/lucide`~~ | **Supprimé** — installé via npm |
| Google Fonts Inter | `fonts.googleapis.com` (400, 600, 700 seulement) | Stable, risque faible |

### Services externes
- **Google Forms** : Gestion cles + Declaration kms (URLs dans `config.js:23-24, 61-62`)
- **Google Drive** : Hebergement documents RH (liens dans `config.js:37-42, 75-80` et `index.html:930-1015`)
- **My Silae** : `my.silae.fr/sign-in` - Portail conges/paie (`index.html:189`)
- **edocperso.fr** : Coffre-fort bulletins de paie (`index.html:200`)
- **Legifrance** : Convention collective CCN 3127 (`index.html:954`)

### APIs
- Aucune API backend consommee
- `vite.config.ts:14-15` definit `GEMINI_API_KEY` mais **jamais utilisee** dans le code

## 5. Architecture

### Pattern global
**Application statique multi-page** (2 pages HTML) sans build necessaire. Deployable en copiant les fichiers sur n'importe quel serveur statique (GitHub Pages).

### Gestion d'etat
- **Aucun state management** : tout est dans le DOM
- Navigation par onglets : `display: none/block` via classes CSS (`index.html:72-73`)
- Configuration agence : lecture du query param `?agence=X` a chaque chargement (`index.html:1253-1258`)
- Persistence : uniquement `localStorage` pour le dismiss du bandeau d'installation (`index.html:1396-1399`)

### Gestion multi-agence
Architecture data-driven via `config.js` :
- Objet `GRILLE_SALARIALE` : constantes salariales partagees (ligne 2-16)
- Objet `AGENCY_CONFIGS` : 2 agences configurees (`nord-touraine`, `loches`) avec URLs, contacts, docs (lignes 18-93)
- `applyConfig()` (`index.html:1250-1362`) injecte les valeurs dans le DOM via `getElementById`
- Manifest PWA dynamique : choix du fichier manifest selon `?agence=` (`index.html:11-33`)

### Service Worker (`sw.js`)
- **Cache name** : `o2-guide-v5` (ligne 1)
- **Install** : pre-cache assets locaux (obligatoires via `addAll`) + CDN optionnels (try/catch individuel) + `skipWaiting()` chainé dans `waitUntil`
- **Activate** : nettoyage des anciens caches + `clients.claim()` chaîné dans `waitUntil`
- **Fetch** :
  - Navigation : **Network First** (met en cache la réponse fraîche) puis cache puis `offline.html`
  - Assets : **Cache First** puis network
- **Auto-reload** : si l'app est en arriere-plan > 10 min, force reload au retour (`src/app.js`)

### Stockage
| Type | Usage | Fichier:Ligne |
|------|-------|---------------|
| `localStorage` | Dismiss bandeau install (cle `install_banner_dismissed`) | `index.html:1393-1399` |
| Cache API (SW) | Assets statiques + CDN | `sw.js:2-21` |

## 6. Observations cles

### Forces
1. **Zero dependance runtime** : pas de node_modules en production, deploiement trivial (copier les fichiers)
2. **PWA complete** : manifest, service worker, icones multi-tailles, support offline, banniere d'installation adaptee iOS/Android
3. **Multi-agence extensible** : ajouter une agence = ajouter un objet dans `AGENCY_CONFIGS` + un manifest JSON
4. **Dark mode natif** : suit le reglage systeme sans toggle, applique partout via classes Tailwind `dark:`
5. **UI soignee** : design mobile-first, animations, gradients, bonne hierarchie visuelle
6. **Simulateur salaire** : outil concret et utile pour les intervenants

### Faiblesses (etat initial — mai etre resolues)

1. ~~**`index.html` monolithique**~~ : **Résolu** — JS deplacé dans `src/app.js`, CSS dans `src/styles.css`, contenu RH dans `src/content.js`. `index.html` ne contient plus que la structure HTML.

2. ~~**CDN non versionnees**~~ : **Résolu** — Tailwind migré vers CLI (plugin Vite), Lucide installé via npm, CDN supprimés.

3. ~~**Vite/TypeScript configures mais inutilises**~~ : **Résolu** — Vite actif, build fonctionnel (`dist/`), `index.tsx` supprimé, `GEMINI_API_KEY` supprimé.

4. ~~**Pas de minification/bundling**~~ : **Résolu** — `vite build` produit des assets bundlés et minifiés dans `dist/assets/`.

5. ~~**Hardcoded content**~~ : **Résolu** — Les 18 obligations et la structure docs sont dans `src/content.js`. Modifier le contenu RH ne nécessite plus de toucher au HTML.

6. ~~**Pas de tests**~~ : **Résolu** — `src/calculator.test.js` teste toutes les fonctions de calcul via Vitest.

7. ~~**Accessibilite partielle**~~ : **Amélioré** — Roles ARIA complets, navigation clavier (flèches), `rel="noopener noreferrer"` sur tous les liens externes, `min="0"` sur les inputs.

8. ~~**SEO limite**~~ : **Partiellement résolu** — `<meta description>` ajouté dans `index.html` et `simulateur.html`.

### Faiblesses restantes

1. **Pas de pipeline CI** : pas de `.github/workflows`. Les tests et le build ne tournent pas automatiquement à chaque commit.

2. **Formules de paie non documentees** : les coefficients `0.1131`, `0.9825`, `0.097` dans `src/calculator.js` ne sont pas liés à leur source RH officielle.

3. **BUG-11 non confirme** : le signe des titres restaurant dans le calcul du net est en attente de validation métier.

4. **Icone maskable manquante** : les manifests PWA n'ont pas d'icone avec `"purpose": "maskable"`, ce qui peut donner un rendu dégradé sur Android.

### Points d'attention

1. **Scope PWA** (`manifest-*.json:6`) : `"scope": "/AppIntervenants/"` est code en dur. Si le deploiement change de path, la PWA ne fonctionnera plus correctement.

2. **Cache SW agressif** : les ressources CDN externes sont pre-cachees (`sw.js:18-20`). Si Tailwind ou Lucide sont mis a jour, les utilisateurs garderont l'ancienne version jusqu'a changement du `CACHE_NAME`.

3. **Formules de paie non documentees** : les coefficients `0.1131`, `0.9825`, `0.097` (`simulateur.html:268`) ne sont pas expliques. Risque d'erreur si quelqu'un doit les mettre a jour sans comprendre leur origine.

4. **Valeur hardcodee inconsistante** : `CHEQUES_VACANCES` dans `config.js:15` vaut `100` (total) mais `chequesVacancesEmployeur` vaut `80`. Dans `simulateur.html:189`, c'est `80` qui est utilise. Dans `index.html:623`, le texte affiche "100 EUR /an (Co-financement 20%)". La logique est correcte mais le nommage prete a confusion.

5. **Coefficient heures complementaires** : `HEURES_COMP_COEFF = 60` (`simulateur.html:190`) est un magic number sans explication.

6. **`user-scalable=no`** (`index.html:5`, `simulateur.html:5`) : desactive le zoom utilisateur. Probleme d'accessibilite pour les malvoyants.
