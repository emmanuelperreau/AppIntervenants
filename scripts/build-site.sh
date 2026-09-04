#!/usr/bin/env bash
set -euo pipefail

mkdir -p _site/src/templates/tab-money _site/styles
cp index.html simulateur.html agence-init.js sw.js _site/
cp styles/base.css styles/components.css styles/contacts.css styles/simulateur.css _site/styles/
cp manifest-nord.json manifest-loches.json manifest-langeais.json offline.html _site/
cp icon.svg icon-192.png icon-384.png icon-512.png apple-touch-icon.png _site/
mkdir -p _site/fonts
cp fonts/inter-400.woff2 fonts/inter-600.woff2 fonts/inter-700.woff2 _site/fonts/
cp config.js _site/
# Copier les JS sources (hors fichiers de test)
find src -name '*.js' ! -name '*.test.js' -exec cp --parents {} _site/ \;
# Copier les partiels HTML
find src/templates -name '*.html' -exec cp --parents {} _site/ \;
# Substituer CACHE_VERSION dans _site/sw.js par un hash du contenu deploye
node scripts/sw-version.js _site
# Garde-fou : le build echoue si la substitution n'a pas eu lieu
if grep -q '__BUILD_VERSION__' _site/sw.js; then
    echo "build-site: CACHE_VERSION non substituee dans _site/sw.js" >&2
    exit 1
fi
