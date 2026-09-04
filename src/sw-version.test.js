import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { execFileSync } from 'child_process';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { computeSiteVersion, stampServiceWorker } from '../scripts/sw-version.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');
const PLACEHOLDER = '__BUILD_VERSION__';

function writeFile(root, relPath, content) {
    const full = join(root, relPath);
    mkdirSync(dirname(full), { recursive: true });
    writeFileSync(full, content);
}

function createFakeSite(root) {
    writeFile(root, 'sw.js', `const CACHE_VERSION = '${PLACEHOLDER}';\n`);
    writeFile(root, 'index.html', '<html></html>\n');
    writeFile(root, 'styles/base.css', 'body { margin: 0; }\n');
}

let siteDir;

beforeEach(() => {
    siteDir = mkdtempSync(join(tmpdir(), 'sw-version-test-'));
});

afterEach(() => {
    rmSync(siteDir, { recursive: true, force: true });
});

describe('sw.js du depot', () => {
    it('contient le placeholder __BUILD_VERSION__ et aucune version figee type v11', () => {
        const swContent = readFileSync(join(REPO_ROOT, 'sw.js'), 'utf-8');
        expect(swContent).toContain(PLACEHOLDER);
        expect(swContent).not.toMatch(/CACHE_VERSION\s*=\s*'v\d+'/);
    });
});

describe('stampServiceWorker', () => {
    it('remplace le placeholder par 12 hex', () => {
        createFakeSite(siteDir);
        const version = stampServiceWorker(siteDir);

        expect(version).toMatch(/^[0-9a-f]{12}$/);
        const stamped = readFileSync(join(siteDir, 'sw.js'), 'utf-8');
        expect(stamped).not.toContain(PLACEHOLDER);
        expect(stamped).toContain(version);
    });

    it('produit la meme version pour un meme contenu (redeploiement sans changement)', () => {
        createFakeSite(siteDir);
        const version1 = stampServiceWorker(siteDir);

        const siteDir2 = mkdtempSync(join(tmpdir(), 'sw-version-test-'));
        try {
            createFakeSite(siteDir2);
            const version2 = stampServiceWorker(siteDir2);
            expect(version2).toBe(version1);
        } finally {
            rmSync(siteDir2, { recursive: true, force: true });
        }
    });

    it('produit une version differente si un fichier quelconque change', () => {
        createFakeSite(siteDir);
        const version1 = computeSiteVersion(siteDir);

        writeFile(siteDir, 'styles/base.css', 'body { margin: 1px; }\n');
        const version2 = computeSiteVersion(siteDir);

        expect(version2).not.toBe(version1);
    });

    it('produit une version differente si sw.js lui-meme change (hors placeholder)', () => {
        createFakeSite(siteDir);
        const version1 = computeSiteVersion(siteDir);

        writeFile(
            siteDir,
            'sw.js',
            `const CACHE_VERSION = '${PLACEHOLDER}';\nconst EXTRA = 1;\n`
        );
        const version2 = computeSiteVersion(siteDir);

        expect(version2).not.toBe(version1);
    });

    it('leve une erreur explicite si le placeholder est absent', () => {
        writeFile(siteDir, 'sw.js', "const CACHE_VERSION = 'v11';\n");
        writeFile(siteDir, 'index.html', '<html></html>\n');

        expect(() => stampServiceWorker(siteDir)).toThrow(PLACEHOLDER);
    });
});

// Le point d'entree CLI est ce que build-site.sh appelle : s'il ne s'executait
// pas, le placeholder partirait en prod sans que rien n'echoue.
describe('CLI node scripts/sw-version.js', () => {
    const CLI = join(REPO_ROOT, 'scripts', 'sw-version.js');

    it('stampe sw.js et sort en 0', () => {
        createFakeSite(siteDir);
        const stdout = execFileSync(process.execPath, [CLI, siteDir], {
            encoding: 'utf-8',
        });

        expect(stdout).toMatch(/CACHE_VERSION=[0-9a-f]{12}/);
        expect(readFileSync(join(siteDir, 'sw.js'), 'utf-8')).not.toContain(
            PLACEHOLDER
        );
    });

    it('sort en 1 si le placeholder est absent', () => {
        writeFile(siteDir, 'sw.js', "const CACHE_VERSION = 'v11';\n");

        expect(() =>
            execFileSync(process.execPath, [CLI, siteDir], { stdio: 'pipe' })
        ).toThrow();
    });
});
