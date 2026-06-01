# AppIntervenants

Application web (PWA) de gestion pour les intervenants O2. Guide complet avec simulateur de salaire, documents RH, contacts et informations quotidiennes.

## Fonctionnalites

- **Accueil** : outils rapides (gestion cles, declaration kms, My Silae, coffre-fort bulletins)
- **Quotidien** : equipements, securite, obligations, fiches de route
- **Remuneration** : grille salariale 3 metiers, primes, avantages, conges
- **Simulateur** : estimation du salaire net en temps reel
- **Documents** : guides metier, convention collective, accords d'entreprise
- **Contacts** : urgences, agence, medecine du travail

## Stack

- HTML / CSS minimaliste écrits main
- JS Vanilla (modules ES natifs), zéro build navigateur
- PWA : Service Worker et manifests écrits main
- Icônes : SVG inline (aucune dépendance runtime)
- Tests : Vitest (~45 tests) sur le calculateur ; types vérifiés par `tsc --checkJs`
- CI/CD : GitHub Actions → GitHub Pages

## Démarrage

```bash
python3 -m http.server   # servir les fichiers statiques, puis ouvrir index.html
```

Aucune installation requise pour faire tourner l'app : ce sont des fichiers statiques bruts.

## Commandes

| Commande | Description |
|----------|-------------|
| `python3 -m http.server` | Servir l'app en local |
| `npx vitest run` | Tests (calculateur + intégrité des données) |
| `npx tsc --noEmit` | Vérification des types (JSDoc, `checkJs`) |
| `npx eslint .` | Lint |
| `npx prettier --write .` | Formatage |

## Multi-agence

L'app supporte plusieurs agences via le parametre `?agence=` :
- `nord-touraine` (defaut)
- `loches`

Ajouter une agence = un objet dans `config.js` + un manifest JSON à la racine.

## Deploiement

Push sur `main` → CI (lint + tsc + tests + assemblage statique) → deploy automatique sur GitHub Pages.
