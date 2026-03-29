# Corrections de bugs - Agent 3 (Chirurgien)

Corrections des bugs critiques et majeurs identifiés dans `bugs.md`.

---

## Bugs Critiques

### BUG-01 : `user-scalable=no` bloque le zoom
- **Fichiers** : `index.html:5`, `simulateur.html:5`
- **Correction** : Suppression de `maximum-scale=1.0, user-scalable=no` de la balise meta viewport dans les deux fichiers. La balise devient `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
- **Statut** : ✅ Corrigé

### BUG-02 : CDN non versionnées
- **Fichiers** : `index.html:48,62`, `simulateur.html:14,28`
- **Correction** : Tailwind figé à `3.4.17`, Lucide figé à `0.460.0` dans les deux fichiers HTML.
- **Statut** : ✅ Corrigé

### BUG-03 : SW pre-cache CDN qui peut faire échouer l'installation
- **Fichier** : `sw.js`
- **Correction** : Séparation des assets en `LOCAL_ASSETS` (obligatoires via `cache.addAll`) et `CDN_ASSETS` (optionnels, chargés individuellement avec try/catch). Les URLs CDN sont désormais versionnées (cohérent avec BUG-02).
- **Statut** : ✅ Corrigé

---

## Bugs Majeurs

### BUG-04 : Incohérence manifest par défaut vs config par défaut
- **Fichier** : `index.html:28-32`
- **Correction** : Le bloc `else` (défaut sans paramètre `?agence`) charge maintenant `manifest-nord.json` et affiche "O2 Nord Touraine", aligné avec le défaut `'nord-touraine'` de `applyConfig()`. Le `if` teste maintenant `agence === 'loches'` (au lieu de `nord-touraine`) pour que Loches reste accessible via `?agence=loches` et que le défaut soit Nord Touraine.
- **Statut** : ✅ Corrigé

### BUG-05 : meta apple-web-app-title inaccessible (DOM pas encore parsé)
- **Fichier** : `index.html:9`
- **Correction** : La balise `<meta id="apple-web-app-title">` a été déplacée avant le script inline (ligne 9, avant le `<link rel="manifest">`), et l'ancienne occurrence supprimée. Le `getElementById('apple-web-app-title')` la trouve désormais au moment de l'exécution.
- **Statut** : ✅ Corrigé

### BUG-06 : Onglets sans rôles ARIA
- **Fichier** : `index.html` (navigation + panneaux + script switchTab)
- **Correction** :
  - Ajout de `role="tablist"` et `aria-label="Navigation principale"` sur le conteneur des boutons.
  - Ajout de `role="tab"`, `aria-selected`, et `aria-controls` sur chaque bouton de navigation.
  - Ajout de `role="tabpanel"` et `aria-labelledby` sur chaque panneau de contenu.
  - Mise à jour de `switchTab()` pour basculer `aria-selected` dynamiquement.
- **Statut** : ✅ Corrigé

### BUG-07 : `clients.claim()` hors `waitUntil`
- **Fichier** : `sw.js` (événement activate)
- **Correction** : `self.clients.claim()` est maintenant chaîné dans `waitUntil` via `.then(() => self.clients.claim())` après le nettoyage des anciens caches.
- **Statut** : ✅ Corrigé

### BUG-08 : Réponses navigation non mises en cache par le SW
- **Fichier** : `sw.js` (événement fetch, mode navigate)
- **Correction** : La réponse réseau réussie est maintenant clonée et stockée dans le cache avant d'être retournée. En cas de perte réseau ultérieure, la version fraîche sera servie depuis le cache.
- **Statut** : ✅ Corrigé

### BUG-09 : Valeur mutuelle hardcodée incorrecte
- **Fichier** : `index.html:596`
- **Correction** : Remplacement de `13,55 €` par `--,-- €` comme placeholder. La valeur réelle est injectée dynamiquement par `applyConfig()`.
- **Statut** : ✅ Corrigé

### BUG-10 : `skipWaiting()` hors `waitUntil`
- **Fichier** : `sw.js` (événement install)
- **Correction** : `self.skipWaiting()` est maintenant chaîné dans `waitUntil` via `.then(() => self.skipWaiting())` après le chargement du cache.
- **Statut** : ✅ Corrigé

---

## Résumé

| ID | Sévérité | Statut |
|----|----------|--------|
| BUG-01 | 🔴 Critique | ✅ Corrigé |
| BUG-02 | 🔴 Critique | ✅ Corrigé |
| BUG-03 | 🔴 Critique | ✅ Corrigé |
| BUG-04 | 🟠 Majeur | ✅ Corrigé |
| BUG-05 | 🟠 Majeur | ✅ Corrigé |
| BUG-06 | 🟠 Majeur | ✅ Corrigé |
| BUG-07 | 🟠 Majeur | ✅ Corrigé |
| BUG-08 | 🟠 Majeur | ✅ Corrigé |
| BUG-09 | 🟠 Majeur | ✅ Corrigé |
| BUG-10 | 🟠 Majeur | ✅ Corrigé |

**10/10 bugs critiques et majeurs corrigés.**

Fichiers modifiés :
- `index.html` (BUG-01, 02, 04, 05, 06, 09)
- `simulateur.html` (BUG-01, 02)
- `sw.js` (BUG-03, 07, 08, 10)
