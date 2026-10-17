# AppIntervenants — gouvernance

Projet conforme au CLAUDE.md global : HTML / CSS minimaliste écrits main, JS Vanilla DOM-local, servis en fichiers statiques bruts sur GitHub Pages. **Aucun build navigateur, aucun bundler, aucun framework, aucune dépendance runtime.**

## Conforme au global
- HTML + CSS écrits main (`styles.css`, classes sémantiques, dark mode en `prefers-color-scheme`).
- JS Vanilla en modules ES natifs (`src/*.js`), chargés directement par le navigateur.
- Icônes en SVG inline. Partiels d'onglets chargés par `fetch()`.
- PWA : `sw.js` et manifests écrits main.
- Déploiement : la source EST le déployé. La CI assemble `_site/` (copie de fichiers, zéro build).
- `CACHE_VERSION` (`sw.js`) ne se bumpe JAMAIS à la main : le fichier porte `'__BUILD_VERSION__'`, que `scripts/build-site.sh` remplace par un hash du contenu de `_site/` (`scripts/sw-version.js`). Même contenu = même version (un redéploiement n'invalide rien), tout changement de fichier déployé = nouvelle version. Le build échoue si la substitution n'a pas eu lieu.

## Exception Node, limitée aux tests et au build CI
Node sert à `vitest` + `tsc --checkJs` (tests `src/*.test.js` : calcul salaire de `src/calculator.js` annoté JSDoc, intégrité des données, version du service worker) et, en CI, à `scripts/sw-version.js` appelé par `scripts/build-site.sh`.

Justification : ce module calcule des salaires. On garde la garantie « le code livré au navigateur est exactement celui couvert par les tests » (fichier unique, importé par le navigateur ET testé). C'est la seule chose que le global ne peut pas fournir pour un calcul interactif côté client.

Rien d'autre n'introduit de Node ni de dépendance runtime : le code servi au navigateur n'est pas transformé.

## Levé du global, et pourquoi
- **Python / uv** : sans objet, PWA 100 % client sans runtime serveur.
- **HTMX** : sans objet, site 100 % statique (aucun backend pour servir des fragments). On utilise l'allocation « JS Vanilla DOM-local » de la règle.
- **pytest** : les seuls tests portent sur le calculateur JS, lancés par Vitest.

## Commandes
- `./node_modules/.bin/vitest run` : tests.
- `./node_modules/.bin/tsc --noEmit` : vérification de types (JSDoc, `checkJs`).
- `./node_modules/.bin/eslint '**/*.{js,ts}' --ignore-pattern 'dist/**' --ignore-pattern 'node_modules/**'` / `./node_modules/.bin/prettier` : lint et format.
- Servir en local : `uv run python -m http.server 8004` à la racine (port de `.claude/launch.json`), ouvrir `index.html` (ajouter `?agence=loches` pour l'autre agence).

Ni `npm`, ni `npx`, ni `node` ou `python` nus : lancer les binaires de `node_modules/.bin` directement. La CI (GitHub Actions) rejoue lint, tests et types.

## Livraison
- Un push sur main alimente deux chaînes indépendantes : GitHub Pages (environ 1 min 40) et Cloudflare Pages (environ 11 min, mesuré le 2026-09-04). Le check `Cloudflare Pages` du commit (`gh api repos/emmanuelperreau/AppIntervenants/commits/<sha>/check-runs`) est le signal fiable ; `in_progress` n'est pas un échec.
- Livré = la ligne 4 de `sw.js` (`const CACHE_VERSION = '<12 hex>';`) identique sur les cinq hôtes, lue avec `?t=<aléa>` contre le cache : `appintervenants.pages.dev`, `o2loches.serviam.app`, `o2nordtouraine.serviam.app`, `o2langeais.serviam.app`, `emmanuelperreau.github.io/AppIntervenants`. `'v11'` ou `'__BUILD_VERSION__'` : substitution ratée, les PWA installées servent du contenu périmé (vécu le 2026-07-06 et le 2026-07-29). Deux valeurs différentes : un déploiement en retard, attendre et relire. Un fichier déployé modifié doit changer la valeur.
