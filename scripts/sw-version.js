#!/usr/bin/env node
// Derive CACHE_VERSION de sw.js depuis le contenu reellement deploye (_site/)
// au lieu d'un bump manuel oublie a chaque deploiement.
// Usage: node scripts/sw-version.js _site

import { createHash } from 'crypto';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative, sep } from 'path';
import { pathToFileURL } from 'url';

const PLACEHOLDER = '__BUILD_VERSION__';

function listFilesRecursive(dir) {
    const files = [];
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        const stat = statSync(full);
        if (stat.isDirectory()) {
            files.push(...listFilesRecursive(full));
        } else {
            files.push(full);
        }
    }
    return files;
}

// Parcourt TOUS les fichiers de siteDir (sw.js compris, encore au placeholder
// a ce stade) et cumule un sha256 de (chemin relatif + contenu binaire).
// Deterministe : meme contenu -> meme version.
export function computeSiteVersion(siteDir) {
    const files = listFilesRecursive(siteDir)
        .map(full => relative(siteDir, full).split(sep).join('/'))
        .sort();

    const hash = createHash('sha256');
    for (const relPath of files) {
        hash.update(relPath);
        hash.update(readFileSync(join(siteDir, relPath)));
    }
    return hash.digest('hex').slice(0, 12);
}

// Calcule la version AVANT substitution (le placeholder fait partie du hash),
// puis remplace __BUILD_VERSION__ dans sw.js. Casse bruyamment si le
// placeholder est absent ou si l'ecriture ne verifie pas les invariants.
export function stampServiceWorker(siteDir) {
    const swPath = join(siteDir, 'sw.js');
    const original = readFileSync(swPath, 'utf-8');

    if (!original.includes(PLACEHOLDER)) {
        throw new Error(
            `stampServiceWorker: placeholder ${PLACEHOLDER} absent de ${swPath}`
        );
    }

    const version = computeSiteVersion(siteDir);
    const stamped = original.replace(PLACEHOLDER, version);
    writeFileSync(swPath, stamped);

    const written = readFileSync(swPath, 'utf-8');
    if (written.includes(PLACEHOLDER)) {
        throw new Error(
            `stampServiceWorker: le placeholder ${PLACEHOLDER} est toujours present apres ecriture`
        );
    }
    if (!/^[0-9a-f]{12}$/.test(version)) {
        throw new Error(
            `stampServiceWorker: version invalide "${version}" (attendu 12 hex)`
        );
    }

    return version;
}

const isCli =
    process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isCli) {
    const siteDir = process.argv[2];
    if (!siteDir) {
        console.error('Usage: node scripts/sw-version.js <siteDir>');
        process.exit(1);
    }
    try {
        const version = stampServiceWorker(siteDir);
        console.log(`sw.js stampe avec CACHE_VERSION=${version}`);
    } catch (err) {
        console.error(`[sw-version] echec: ${err.message}`);
        process.exit(1);
    }
}
