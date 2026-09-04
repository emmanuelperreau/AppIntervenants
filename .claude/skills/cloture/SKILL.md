---
name: cloture
description: Clôture de session pour AppIntervenants (PWA statique, JS/Vitest, double déploiement GitHub Pages + Cloudflare Pages). Remplace le rituel générique pour ce projet. À charger en fin de session, ou quand Emmanuel tape /cloture ici.
---

# Clôture de session — AppIntervenants

Version projet du rituel de clôture. Elle prime sur la commande globale `/cloture` tant qu'on travaille dans ce dépôt : le global est calibré Python/uv/pytest/alembic, absents ici, et il ignore les deux points qui font vraiment échouer une livraison sur ce projet — la seconde chaîne de déploiement et le `sw.js` stampé.

Exécute les étapes dans l'ordre. Communication ultra-courte. Une seule étape se délègue, l'étape 3.

## Étape 0 : Faits de vérité

```bash
git rev-parse --short HEAD && git status -sb | head -1
git fetch origin --quiet && git rev-list --left-right --count HEAD...@{u}
git branch --merged | grep -v '^\*' | tr -d ' ' | tr '\n' ' '
git branch -r --merged origin/main | grep -v 'origin/main\|origin/HEAD' | tr -d ' ' | tr '\n' ' '
git worktree list | tail -n +2
ls .memory/
```

Le `git branch -r --merged` n'est pas décoratif : ce dépôt accumule des branches **distantes** mergées que le tri local ne voit pas (résidu de sessions Claude, ex. `origin/claude/audit-optimize-code-JulMx`, mergée et laissée 6 mois). Les supprimer avec `git push origin --delete <branche>`.

## Étape 1 : Vérifier, commiter, pousser

Pas de `uv`, pas de `pytest`, pas d'alembic. Le hook global interdit `node`/`npm`/`npx` en local : lancer les binaires directement.

```bash
./node_modules/.bin/vitest run
./node_modules/.bin/tsc --noEmit
./node_modules/.bin/eslint '**/*.{js,ts}' --ignore-pattern 'dist/**' --ignore-pattern 'node_modules/**'
```

Le hook pre-commit relance les tests et bloque si rouge : c'est lui le gate, ne pas le refaire à la main. Commits en français, format `type: description`. `.memory/` est gitignoré, jamais commité.

Push : le hook `review-gate.sh` joue la revue sur `@{u}..HEAD` et bloque sur finding critique. Un blocage est un verdict : corriger et re-pousser, ou empiler dans `plan.md` et ne pas livrer. **Jamais `git commit` et `git push` dans la même commande** (les deux gates s'additionnent sous le plafond de 600 s).

Aucun `.claude/visual-check.conf` dans ce projet : il n'y a **pas** de vérification visuelle au push. Ne pas la déclarer faite. Un jugement de rendu se prend dans le Browser pane, serveur local `python3 -m http.server 8000`.

## Étape 2 : Vérifier les DEUX déploiements (spécifique au projet)

Un push alimente deux chaînes indépendantes. La CI GitHub verte ne dit rien de Cloudflare, et le hook `deploy-verify.sh` ne surveille que le run GitHub Action. Ne pas clore sans avoir vu les deux.

```bash
gh run list --limit 3
gh api "repos/emmanuelperreau/AppIntervenants/commits/$(git rev-parse HEAD)/check-runs" \
  --jq '.check_runs[] | "\(.name) \(.status) \(.conclusion)"'
```

Le check `Cloudflare Pages` est le signal fiable. Mesuré le 2026-09-04 : **1m38 pour GitHub Actions, 11 minutes pour Cloudflare**. Un `in_progress` n'est pas un échec, poller jusqu'à `completed`.

`gh` échoue en `x509: OSStatus -26276` sous sandbox (accès trousseau refusé) : relancer à l'identique avec `dangerouslyDisableSandbox`, c'est un faux bug.

Puis vérifier ce qui est réellement servi, sur les cinq hôtes :

```bash
for u in https://appintervenants.pages.dev https://o2loches.serviam.app \
         https://o2nordtouraine.serviam.app https://o2langeais.serviam.app \
         https://emmanuelperreau.github.io/AppIntervenants; do
  printf "%-50s %s\n" "$u" "$(curl -sL "$u/sw.js?t=$RANDOM" | sed -n 4p)"
done
```

Attendu : `const CACHE_VERSION = '<12 hex>';`, **identique partout**. Deux lectures de ce résultat, toutes deux bloquantes :

- une valeur `'v11'` ou `'__BUILD_VERSION__'` = la substitution de `scripts/sw-version.js` n'a pas eu lieu, les PWA installées vont servir du contenu périmé. C'est le bug vécu deux fois (2026-07-06, 2026-07-29) ;
- deux hôtes avec des hash différents = un des deux déploiements est en retard, attendre et relire.

Si le code a changé cette session, le hash doit avoir changé aussi.

## Étape 3 : `.memory/` (délégué)

Délègue à un sous-agent qui charge la skill `memory-bank`. Lui transmettre les faits FINAUX de l'étape 1 et 2 : HEAD post-commit, compte Vitest, hash `CACHE_VERSION` déployé, état des deux déploiements, tri des branches locales ET distantes. Il rend une ligne, tu ne relis pas les fichiers.

Il n'y a pas de CHANGELOG dans ce dépôt : aucune version à aligner, ne pas en inventer une.

## Étape 4 : Clore

Valide la ligne de retour sans rouvrir les fichiers, recoupe avec ce que tu as constaté toi-même. Termine par ce rappel, en gras, seul sur sa ligne :

**✅ Session clôturée. Tape maintenant `/clear` pour vider le contexte.**
