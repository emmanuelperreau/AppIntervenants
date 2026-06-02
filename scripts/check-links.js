#!/usr/bin/env node
// Verifie que les liens Google Drive / externes sont accessibles (HTTP 200 ou redirect)
// Usage: node scripts/check-links.js

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

function readSource(name) {
    const tsPath = resolve(ROOT, name.replace(/\.js$/, '.ts'));
    const jsPath = resolve(ROOT, name);
    if (existsSync(tsPath)) return readFileSync(tsPath, 'utf-8');
    return readFileSync(jsPath, 'utf-8');
}

// Certains sites (Legifrance, Drive) renvoient 403 sans User-Agent navigateur.
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

async function checkLinks() {
    const configContent = readSource('config.js');
    const contentContent = readSource('src/content.js');

    const allContent = configContent + '\n' + contentContent;
    const urlRegex = /https?:\/\/[^\s"'`,)]+/g;
    const urls = [...new Set(allContent.match(urlRegex) || [])];

    console.log(`Checking ${urls.length} URLs...\n`);

    let failed = 0;
    for (const url of urls) {
        try {
            const headRes = await fetch(url, {
                method: 'HEAD',
                redirect: 'follow',
                headers: { 'User-Agent': UA },
                signal: AbortSignal.timeout(10000),
            });
            if (headRes.ok) {
                console.log(`[OK] ${headRes.status} ${url}`);
                continue;
            }
            // HEAD a echoue (405/403 faux positif possible) : retenter en GET
            const getRes = await fetch(url, {
                method: 'GET',
                redirect: 'follow',
                headers: { 'User-Agent': UA },
                signal: AbortSignal.timeout(10000),
            });
            if (getRes.ok) {
                console.log(`[OK] ${getRes.status} ${url} (via GET)`);
            } else {
                failed++;
                console.log(`[FAIL] ${getRes.status} ${url}`);
            }
        } catch (err) {
            failed++;
            console.log(`[FAIL] ${url} (${err.message})`);
        }
    }

    console.log(`\n${urls.length - failed}/${urls.length} OK`);
    if (failed > 0) process.exit(1);
}

checkLinks();
