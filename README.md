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

- HTML / CSS / TypeScript strict (Vite)
- Tailwind CSS v4
- PWA avec vite-plugin-pwa (Workbox)
- Lucide Icons (seule dependance runtime)
- Tests : Vitest (40 tests)
- CI/CD : GitHub Actions → GitHub Pages

## Demarrage

```bash
npm install
npx vite          # serveur de dev (port 3000)
```

## Commandes

| Commande | Description |
|----------|-------------|
| `npx vite` | Serveur de developpement |
| `npx vite build` | Build de production |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Verification des types |
| `npm test` | Tests Vitest |
| `npm run format` | Formatage Prettier |

## Multi-agence

L'app supporte plusieurs agences via le parametre `?agence=` :
- `nord-touraine` (defaut)
- `loches`

Ajouter une agence = un objet dans `config.ts` + un manifest JSON dans `public/`.

## Deploiement

Push sur `main` → CI (lint + tsc + test + build) → deploy automatique sur GitHub Pages.
