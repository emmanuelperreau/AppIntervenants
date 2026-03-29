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
            const res = await fetch(url, {
                method: 'HEAD',
                redirect: 'follow',
                signal: AbortSignal.timeout(10000),
            });
            const status = res.ok ? 'OK' : 'WARN';
            if (!res.ok) failed++;
            console.log(`[${status}] ${res.status} ${url}`);
        } catch (err) {
            failed++;
            console.log(`[FAIL] ${url} (${err.message})`);
        }
    }

    console.log(`\n${urls.length - failed}/${urls.length} OK`);
    if (failed > 0) process.exit(1);
}

checkLinks();
