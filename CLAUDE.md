Exception stack : ce projet utilise NodeJS / TypeScript / Vite / Tailwind v4 (PWA).
Stack autorisee malgre la regle globale Python/HTML.

Justification (ne pas migrer) :
- PWA installable mobile : Service Worker precis exige (vite-plugin-pwa/Workbox).
- Deploiement 100% statique sur GitHub Pages : HTMX necessiterait un backend serveur.
- Tailwind v4 (moteur Oxide) impose un build step, plus de mode CDN production.
- TypeScript strict couvre le simulateur de salaire (45 tests Vitest).
- Projet clos en production (2026-04-25) — maintenance annuelle uniquement.
