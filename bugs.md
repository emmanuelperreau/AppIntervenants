# Rapport de Bugs - AppIntervenants

Audit complet du projet. Classement par severite.

---

## CRITIQUE

### BUG-01 : `user-scalable=no` bloque le zoom (Accessibilite WCAG)
- **Fichier** : `index.html:5`, `simulateur.html:5`
- **Categorie** : HTML/Accessibilite
- **Description** : `user-scalable=no` et `maximum-scale=1.0` empechent les utilisateurs malvoyants de zoomer. Violation WCAG 2.1 critere 1.4.4 (niveau AA). Certains navigateurs mobiles ignorent desormais cette directive, mais c'est un signal negatif.
- **Impact** : Exclusion des utilisateurs a mobilite visuelle reduite. Non-conformite reglementaire potentielle (RGAA).
- **Fix** :
```html
<!-- index.html:5 et simulateur.html:5 -->
<!-- AVANT -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<!-- APRES -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### BUG-02 : CDN Tailwind et Lucide non versionnees - risque de casse en production
- **Fichier** : `index.html:48,62`, `simulateur.html:14,28`
- **Categorie** : Performance / Securite
- **Description** : `cdn.tailwindcss.com` (sans version) et `unpkg.com/lucide@latest` peuvent introduire des breaking changes a tout moment. Tailwind Labs deconseille explicitement le CDN pour la production. Un changement de l'API Lucide ou Tailwind peut casser l'UI entiere sans avertissement.
- **Impact** : Casse potentielle de l'app entiere pour tous les utilisateurs en meme temps.
- **Fix** :
```html
<!-- Figer les versions -->
<script src="https://cdn.tailwindcss.com/3.4.17"></script>
<script src="https://unpkg.com/lucide@0.460.0"></script>
```

### BUG-03 : SW pre-cache des CDN externes - echec d'installation silencieux
- **Fichier** : `sw.js:18-20`
- **Categorie** : PWA
- **Description** : `cache.addAll()` echoue si UNE SEULE ressource est injoignable. Les URLs CDN externes (`cdn.tailwindcss.com`, `unpkg.com/lucide@latest`, Google Fonts) sont dans la liste. Si un CDN est temporairement indisponible, l'installation du SW echoue completement et AUCUNE ressource n'est mise en cache.
- **Impact** : Le SW peut ne jamais s'installer, rendant l'app inutilisable hors-ligne.
- **Fix** :
```javascript
// sw.js - Install Event : separer les assets locaux (obligatoires) des CDN (optionnels)
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      // Assets locaux : obligatoires
      await cache.addAll([
        './', './index.html', './config.js', './simulateur.html',
        './offline.html', './manifest-loches.json', './manifest-nord.json',
        './icon.svg', './icon-192.png', './icon-384.png', './icon-512.png',
        './apple-touch-icon.png'
      ]);
      // CDN : optionnels (best effort)
      const cdnAssets = [
        'https://cdn.tailwindcss.com',
        'https://unpkg.com/lucide@latest',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap'
      ];
      for (const url of cdnAssets) {
        try { await cache.add(url); } catch (e) { console.warn('CDN cache fail:', url); }
      }
    })
  );
});
```

---

## MAJEUR

### BUG-04 : Incoherence manifest par defaut vs config par defaut
- **Fichier** : `index.html:28-29` vs `index.html:1255`
- **Categorie** : JS/Logique
- **Description** : Dans le script manifest (ligne 28), l'agence par defaut (quand `?agence` est absent) charge `manifest-loches.json` et affiche "O2 Loches". Mais dans `applyConfig()` (ligne 1255), l'agence par defaut est `'nord-touraine'`. Un utilisateur sans parametre d'agence verra le manifest Loches mais les contacts/donnees de Nord Touraine.
- **Impact** : Confusion pour l'utilisateur : nom PWA = "O2 Loches" mais contenu = Nord Touraine. Icone d'installation avec le mauvais nom.
- **Fix** :
```javascript
// index.html:28 - Aligner le defaut sur 'nord-touraine'
// AVANT
else {
    manifestLink.setAttribute('href', 'manifest-loches.json');
    document.title = "O2 Loches";
    if(appleTitle) appleTitle.setAttribute('content', 'O2 Loches');
}
// APRES
else {
    manifestLink.setAttribute('href', 'manifest-nord.json');
    document.title = "O2 Nord Touraine";
    if(appleTitle) appleTitle.setAttribute('content', 'O2 Nord Touraine');
}
```

### BUG-05 : `getElementById('apple-web-app-title')` retourne `null`
- **Fichier** : `index.html:19` vs `index.html:40`
- **Categorie** : JS/Logique
- **Description** : Le script en ligne 19 fait `document.getElementById('apple-web-app-title')`, mais la balise `<meta id="apple-web-app-title" ...>` est declaree a la ligne 40, APRES le script. Au moment de l'execution, l'element n'existe pas encore dans le DOM.
- **Impact** : Le `if(appleTitle)` protege du crash, mais la meta `apple-mobile-web-app-title` n'est jamais mise a jour dynamiquement. Sur iOS, le nom PWA affiche peut etre incorrect.
- **Fix** :
```html
<!-- Deplacer la meta AVANT le script, ou deplacer le script apres la meta -->
<!-- Option 1 : Deplacer la meta avant le script (ligne 40 -> avant ligne 10) -->
<meta id="apple-web-app-title" name="apple-mobile-web-app-title" content="Agence O2">
<link rel="manifest" id="dynamic-manifest" />
<script>
    (function() { ... })();
</script>
```

### BUG-06 : Onglets sans roles ARIA - inaccessibles au clavier et lecteur d'ecran
- **Fichier** : `index.html:1212-1242`
- **Categorie** : HTML/Accessibilite
- **Description** : La navigation par onglets n'utilise pas les roles ARIA (`role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`). Les boutons de navigation n'ont pas d'`aria-label`. Impossible de naviguer au clavier (pas de gestion des fleches). Les lecteurs d'ecran ne comprennent pas la structure.
- **Impact** : Inaccessible pour les utilisateurs de technologies d'assistance.
- **Fix** :
```html
<!-- Navigation -->
<div class="flex justify-around ..." role="tablist" aria-label="Navigation principale">
    <button onclick="switchTab('home')" role="tab" aria-selected="true" aria-controls="tab-home" id="btn-home" ...>
        ...
    </button>
    <!-- idem pour les autres boutons avec aria-selected="false" -->
</div>

<!-- Panneaux -->
<div id="tab-home" role="tabpanel" aria-labelledby="btn-home" class="tab-content active ...">
```
```javascript
// Dans switchTab(), mettre a jour aria-selected
function switchTab(tabName) {
    document.querySelectorAll('[role="tab"]').forEach(el => el.setAttribute('aria-selected', 'false'));
    const btn = document.getElementById('btn-' + tabName);
    if(btn) btn.setAttribute('aria-selected', 'true');
    // ... reste du code existant
}
```

### BUG-07 : SW `activate` - `clients.claim()` dans un `return` hors `waitUntil`
- **Fichier** : `sw.js:46`
- **Categorie** : PWA
- **Description** : `return self.clients.claim()` est appele apres `event.waitUntil(...)`, mais en dehors de celui-ci. Le `return` ne sert a rien dans un event listener. `clients.claim()` devrait etre chaine dans `waitUntil` pour garantir son execution avant la fin de l'evenement.
- **Impact** : `clients.claim()` peut ne pas se terminer avant que le navigateur ne suspende le SW. Les pages ouvertes risquent de ne pas etre prises en charge par le nouveau SW immediatement.
- **Fix** :
```javascript
// sw.js - Activate Event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim()) // Chaine dans waitUntil
  );
});
```

### BUG-08 : SW fetch navigation - reponse reseau non mise en cache
- **Fichier** : `sw.js:52-59`
- **Categorie** : PWA
- **Description** : La strategie "Network First" pour la navigation fait un `fetch` puis tombe sur le cache en cas d'erreur. Mais la reponse reseau reussie n'est jamais stockee dans le cache. Si l'HTML est mis a jour sur le serveur, le cache contient toujours l'ancienne version du pre-cache. En cas de perte reseau ulterieure, c'est l'ancienne version qui est servie.
- **Impact** : Apres une mise a jour, le mode hors-ligne affiche un contenu obsolete indefiniment (jusqu'au prochain changement de CACHE_NAME).
- **Fix** :
```javascript
if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).then(response => {
        // Mettre en cache la reponse fraiche
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => {
        return caches.match(event.request)
          .then(cached => cached || caches.match('./offline.html'));
      })
    );
}
```

### BUG-09 : Valeur mutuelle hardcodee dans index.html ne correspond a aucune agence
- **Fichier** : `index.html:596`
- **Categorie** : JS/Logique
- **Description** : Le HTML affiche `13,55 EUR` comme prix mutuelle par defaut (ligne 596), mais aucune agence dans `config.js` n'a ce prix (Nord = `17,22 EUR`, Loches = `21,13 EUR`). `applyConfig()` ecrase cette valeur, mais pendant un bref instant (ou si `config.js` ne charge pas), l'utilisateur voit un montant incorrect.
- **Impact** : Affichage d'un montant de mutuelle faux si le JS ne s'execute pas (mode degradation, erreur reseau).
- **Fix** :
```html
<!-- index.html:596 - Remplacer par un placeholder -->
<span id="remun-mutuelle-price" class="text-3xl font-extrabold text-[#11183b] dark:text-white">--,-- EUR</span>
```

### BUG-10 : `skipWaiting()` appele hors de `event.waitUntil()`
- **Fichier** : `sw.js:25`
- **Categorie** : PWA
- **Description** : `self.skipWaiting()` est appele avant `event.waitUntil()`. `skipWaiting()` retourne une Promise, mais elle n'est pas chainee dans `waitUntil`. Si le navigateur suspend le SW avant la fin de `skipWaiting()`, le nouveau SW pourrait ne pas s'activer immediatement.
- **Impact** : Race condition possible lors des mises a jour du SW.
- **Fix** :
```javascript
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting()) // Chaine dans waitUntil
      .catch(err => console.error('Erreur installation SW:', err))
  );
});
```

---

## MINEUR

### BUG-11 : Simulateur - titres restaurant ajoutes au net au lieu d'etre deduits
- **Fichier** : `simulateur.html:280`
- **Categorie** : JS/Logique
- **Description** : `costTickets = tickets * TICKET_EMPLOYEE_SHARE` (3 EUR x nb tickets) est AJOUTE au net mensuel (ligne 280 : `netBase + gainKms + costTickets`). Or les titres restaurant sont un avantage non-monetaire : la part salariale est prelevee sur le salaire. La variable `costTickets` devrait etre soustraite du net, pas ajoutee.
- **Impact** : Le simulateur surestime le salaire net de 60 EUR/mois pour 20 titres. Mauvaise surprise pour le salarie.
- **Fix** :
```javascript
// simulateur.html:280
// AVANT
const netMensuel = netBase + gainKms + costTickets - mutuelleCost;
// APRES
const netMensuel = netBase + gainKms - costTickets - mutuelleCost;
```
> **Note** : A verifier avec le metier. Si l'intention est d'afficher le "gain total" (salaire + avantages en nature), le calcul actuel est correct mais le label "Net mensuel" est trompeur.

### BUG-12 : Formule heures complementaires sans sens apparent
- **Fichier** : `simulateur.html:301`
- **Categorie** : JS/Logique
- **Description** : `heuresComp = (hoursWeekly * HEURES_COMP_COEFF) / 24` ou `HEURES_COMP_COEFF = 60`. Pour 24h/semaine : `(24 * 60) / 24 = 60 EUR`. Le diviseur `24` est hardcode et egal a la valeur par defaut des heures hebdo, ce qui fait que le resultat est toujours `60 * (heures/24)`. La formule et son sens metier ne sont pas documentes.
- **Impact** : Impossible de verifier la justesse du calcul. Risque d'erreur si le diviseur devrait etre dynamique.
- **Fix** : Documenter la formule ou la remplacer par une logique metier explicite.
```javascript
// Exemple de documentation a ajouter
// Heures complementaires estimees annuelles
// Source: [document RH reference]
// Formule: heures_hebdo * coefficient_annuel / base_reference
const HEURES_COMP_COEFF = 60; // TODO: documenter la source de ce coefficient
const HEURES_COMP_BASE = 24;  // TODO: documenter pourquoi 24
```

### BUG-13 : SMIC net du simulateur inclut la mutuelle - comparaison biaisee
- **Fichier** : `simulateur.html:272,283`
- **Categorie** : JS/Logique
- **Description** : Le calcul du SMIC net de reference (ligne 272) utilise le meme montant de mutuelle que le salarie. Or le SMIC de reference devrait etre un SMIC "brut standard" pour comparaison. Inclure la mutuelle dans le calcul SMIC rend la comparaison dependante d'un parametre personnel (choix mutuelle/cout mutuelle).
- **Impact** : Comparaison SMIC trompeuse, variable selon le cout mutuelle saisi.
- **Fix** : Calculer le SMIC net sans mutuelle, ou documenter clairement que la comparaison inclut la mutuelle.

### BUG-14 : `innerHTML` utilise pour les instructions d'installation PWA
- **Fichier** : `index.html:1436-1443`
- **Categorie** : Securite
- **Description** : `step1.innerHTML` et `step2.innerHTML` sont utilises avec du contenu statique (pas d'injection utilisateur). Pas de faille XSS directe ici car le contenu est hardcode. Neanmoins, l'utilisation de `innerHTML` est une mauvaise pratique qui peut devenir un vecteur XSS si le code evolue.
- **Impact** : Risque faible (contenu statique), mais mauvaise hygiene securitaire.
- **Fix** : Acceptable en l'etat. Si on souhaite ameliorer :
```javascript
// Utiliser des templates HTML caches plutot que innerHTML
// Ou utiliser textContent + elements DOM crees dynamiquement
```

### BUG-15 : `meta Cache-Control` inutile
- **Fichier** : `index.html:6`
- **Categorie** : Performance
- **Description** : `<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">` est ignore par la plupart des navigateurs modernes et par les CDN. Le controle du cache se fait via les headers HTTP du serveur, pas via des meta tags.
- **Impact** : Fausse impression de controle du cache. Aucun effet reel.
- **Fix** : Supprimer la meta et configurer les headers HTTP cote serveur (GitHub Pages ne permet pas de les personnaliser, donc cette meta est doublement inutile).

### BUG-16 : Scope PWA hardcode dans les manifests
- **Fichier** : `manifest-nord.json:6`, `manifest-loches.json:6`
- **Categorie** : PWA
- **Description** : `"scope": "/AppIntervenants/"` est hardcode. Si le repo est renomme ou deploye ailleurs, la PWA ne fonctionnera plus.
- **Impact** : Probleme de portabilite du deploiement.
- **Fix** :
```json
"scope": "./"
```

### BUG-17 : `window.MSStream` utilise pour la detection iOS - obsolete
- **Fichier** : `index.html:1435`
- **Categorie** : JS/Logique
- **Description** : `!window.MSStream` etait utilise pour exclure Internet Explorer/Edge Legacy qui imitait le UA d'iOS. IE/Edge Legacy n'existent plus. Ce check est obsolete.
- **Impact** : Code mort, complexite inutile.
- **Fix** : Simplifier la detection :
```javascript
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
```

### BUG-18 : Pas de gestion des valeurs negatives dans le simulateur
- **Fichier** : `simulateur.html:72-110`
- **Categorie** : JS/Logique
- **Description** : Les inputs `type="number"` n'ont pas de `min="0"`. Un utilisateur peut saisir des valeurs negatives (taux horaire negatif, kms negatifs, etc.) ce qui produit des resultats absurdes.
- **Impact** : Resultats aberrants affiches sans message d'erreur.
- **Fix** :
```html
<input type="number" id="input-rate" value="12.02" step="0.01" min="0" ...>
<input type="number" id="input-hours" value="24" step="0.5" min="0" max="48" ...>
<input type="number" id="input-kms" value="150" min="0" ...>
<input type="number" id="input-tickets" value="20" min="0" max="31" ...>
```

### BUG-19 : Manifests PWA sans champ `description` ni `categories`
- **Fichier** : `manifest-nord.json`, `manifest-loches.json`
- **Categorie** : PWA
- **Description** : Les manifests ne contiennent pas de `description`, `lang`, ni `dir`. Certains stores PWA et certains navigateurs utilisent ces champs pour l'affichage.
- **Impact** : Installation PWA moins riche en informations.
- **Fix** :
```json
{
  "lang": "fr",
  "dir": "ltr",
  "description": "Guide complet pour les intervenants O2",
  ...
}
```

### BUG-20 : Pas de `rel="noopener"` sur les liens `target="_blank"`
- **Fichier** : `index.html` (multiples lignes : 167, 178, 189, 200, 930, etc.), `simulateur.html:44`
- **Categorie** : Securite
- **Description** : Les liens avec `target="_blank"` n'ont pas `rel="noopener noreferrer"`. Les navigateurs modernes ajoutent `noopener` implicitement, mais les anciens navigateurs sont vulnerables a l'attaque `window.opener`.
- **Impact** : Risque faible sur navigateurs modernes, mais mauvaise pratique.
- **Fix** :
```html
<a href="..." target="_blank" rel="noopener noreferrer">...</a>
```

### BUG-21 : Erreur de texte "agent" au lieu de "argent"
- **Fichier** : `index.html:878`
- **Categorie** : Contenu
- **Description** : Le texte dit "Ne pas accepter d'**agent** ou de cadeaux" au lieu de "d'**argent** ou de cadeaux".
- **Impact** : Erreur de sens. L'obligation est mal formulee.
- **Fix** :
```html
<!-- AVANT -->
<p ...>Ne pas accepter d'agent ou de cadeaux de la part des clients</p>
<!-- APRES -->
<p ...>Ne pas accepter d'argent ou de cadeaux de la part des clients</p>
```

---

## COSMETIQUE

### BUG-22 : `vite.config.ts` expose `GEMINI_API_KEY` en define - code mort
- **Fichier** : `vite.config.ts:14-15`
- **Categorie** : Securite / Code mort
- **Description** : `GEMINI_API_KEY` est definie dans `vite.config.ts` mais Vite n'est pas utilise en production. Neanmoins, si quelqu'un lance `npm run dev`, la cle API serait injectee dans le bundle client, exposee publiquement.
- **Impact** : Pas d'impact actuel (Vite non utilise), mais risque de fuite de cle API si Vite est active un jour.
- **Fix** : Supprimer les lignes define ou au minimum ne pas exposer cote client :
```typescript
// Supprimer ces lignes
define: {
    'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
},
```

### BUG-23 : Numero de telephone header hardcode, pas dans config
- **Fichier** : `index.html:112`
- **Categorie** : JS/Logique
- **Description** : Le bouton "Ligne Salaries" dans le header utilise `tel:0243724345` en dur. Ce numero n'est pas dans `config.js` et n'est pas mis a jour par `applyConfig()`. Si une agence a un numero different pour la ligne salaries, il ne sera pas affiche.
- **Impact** : Faible (la Ligne Salaries est nationale et identique pour toutes les agences), mais inconsistance architecturale.
- **Fix** : Extraire dans `config.js` ou documenter que ce numero est intentionnellement identique pour toutes les agences.

### BUG-24 : Animation `fade-in` jouee a chaque changement d'onglet
- **Fichier** : `index.html:162,252,713,925,1030`
- **Categorie** : CSS/UI
- **Description** : Les sections ont la classe `fade-in` en dur, mais l'animation CSS ne se rejoue pas au `display:block` car l'animation n'est pas re-declenchee par le toggle de la classe `active`. L'animation ne joue qu'au premier affichage.
- **Impact** : Cosmetique - l'animation de transition entre onglets ne fonctionne pas apres le premier affichage.
- **Fix** :
```javascript
// Dans switchTab(), forcer le reflow pour rejouer l'animation
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.remove('active');
        el.classList.remove('fade-in');
    });
    const target = document.getElementById('tab-' + tabName);
    if(target) {
        target.classList.add('active');
        // Force reflow
        void target.offsetWidth;
        target.classList.add('fade-in');
    }
    // ... reste du code
}
```

### BUG-25 : Commentaire HTML numerotation incorrecte
- **Fichier** : `simulateur.html:126`
- **Categorie** : Contenu
- **Description** : Le commentaire dit `<!-- 4. Avantages Annuels -->` mais la section 3 (Resultats) a ete supprimee du template, creant un saut dans la numerotation (1, 2, 4, 5).
- **Impact** : Aucun impact fonctionnel, juste du bruit dans le code.

### BUG-26 : `index.tsx` vide - fichier vestige
- **Fichier** : `index.tsx`
- **Categorie** : Code mort
- **Description** : Fichier vide, vestiges d'une tentative de migration Vite/React. Ajoute de la confusion pour les developpeurs.
- **Impact** : Aucun impact fonctionnel.
- **Fix** : Supprimer `index.tsx`.

### BUG-27 : Pas de `<meta name="description">`
- **Fichier** : `index.html`, `simulateur.html`
- **Categorie** : HTML
- **Description** : Aucune balise meta description. Acceptable si l'app est privee, mais problematique si indexee par Google.
- **Impact** : SEO (si applicable).
- **Fix** :
```html
<meta name="description" content="Guide complet pour les intervenants O2 - remuneration, contacts, documents">
```

### BUG-28 : Manifests sans icone `maskable`
- **Fichier** : `manifest-nord.json`, `manifest-loches.json`
- **Categorie** : PWA
- **Description** : Aucune icone n'a `"purpose": "maskable"`. Sur Android, l'icone PWA peut etre recadree de facon disgracieuse.
- **Impact** : Rendu visuel de l'icone PWA non optimal sur certains devices Android.
- **Fix** : Ajouter une icone avec `"purpose": "maskable"` (necessite une icone avec padding suffisant).

---

## Resume

| Severite | Nombre |
|----------|--------|
| Critique | 3 |
| Majeur | 7 |
| Mineur | 11 |
| Cosmetique | 7 |
| **Total** | **28** |

### Top 5 des correctifs prioritaires
1. **BUG-04** : Incoherence manifest/config par defaut (fix en 1 min, impact visible)
2. **BUG-21** : "agent" -> "argent" (faute de sens, 1 ligne)
3. **BUG-01** : `user-scalable=no` (accessibilite, 2 lignes)
4. **BUG-03** : SW pre-cache CDN (fiabilite hors-ligne)
5. **BUG-05** : Meta apple-web-app-title jamais mise a jour (ordre DOM)

---

## Statut global (mis a jour 29 mars 2026)

| ID | Severite | Description | Statut |
|----|----------|-------------|--------|
| BUG-01 | Critique | `user-scalable=no` | ✅ Corrigé |
| BUG-02 | Critique | CDN non versionnées | ✅ Corrigé (puis migré vers npm/CLI) |
| BUG-03 | Critique | SW pre-cache CDN | ✅ Corrigé |
| BUG-04 | Majeur | Incohérence manifest/config | ✅ Corrigé |
| BUG-05 | Majeur | apple-web-app-title hors DOM | ✅ Corrigé |
| BUG-06 | Majeur | Onglets sans ARIA | ✅ Corrigé |
| BUG-07 | Majeur | clients.claim() hors waitUntil | ✅ Corrigé |
| BUG-08 | Majeur | Réponses navigation non cachées | ✅ Corrigé |
| BUG-09 | Majeur | Mutuelle hardcodée incorrecte | ✅ Corrigé |
| BUG-10 | Majeur | skipWaiting() hors waitUntil | ✅ Corrigé |
| BUG-11 | Mineur | Titres restaurant signe +/- | En attente métier |
| BUG-12 | Mineur | Formule heures comp non documentée | A documenter |
| BUG-13 | Mineur | SMIC net biaisé par mutuelle | A documenter |
| BUG-14 | Mineur | innerHTML contenu statique | Acceptable |
| BUG-15 | Mineur | Meta Cache-Control inutile | ✅ Corrigé |
| BUG-16 | Mineur | Scope PWA hardcodé | ✅ Corrigé |
| BUG-17 | Mineur | MSStream obsolète | ✅ Corrigé |
| BUG-18 | Mineur | Pas de min="0" sur inputs | ✅ Corrigé |
| BUG-19 | Mineur | Manifests incomplets | ✅ Corrigé (lang, dir, description ajoutés) |
| BUG-20 | Mineur | Pas de rel="noopener" | ✅ Corrigé |
| BUG-21 | Mineur | "agent" au lieu de "argent" | ✅ Corrigé (dans src/content.js) |
| BUG-22 | Cosmetique | GEMINI_API_KEY code mort | ✅ Corrigé (supprimé de vite.config.ts) |
| BUG-23 | Cosmetique | Tel header hardcodé | ✅ Corrigé (extrait dans config.js + app.js) |
| BUG-24 | Cosmetique | Animation fade-in ne rejoue pas | ✅ Corrigé (app.js switchTab) |
| BUG-25 | Cosmetique | Commentaire numérotation | Négligeable |
| BUG-26 | Cosmetique | index.tsx vide | ✅ Corrigé (fichier supprimé) |
| BUG-27 | Cosmetique | Pas de meta description | ✅ Corrigé |
| BUG-28 | Cosmetique | Pas d'icone maskable | Toujours ouvert |
