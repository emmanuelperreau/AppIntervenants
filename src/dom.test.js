import { describe, it, expect } from 'vitest';
import { OBLIGATIONS, DOCUMENTS } from './content.js';
import { GRILLE_SALARIALE, AGENCY_CONFIGS } from '../config.js';

// ---------------------------------------------------------------------------
// Tests d'intégrité des données de contenu (content.js)
// ---------------------------------------------------------------------------

describe('Content data integrity', () => {
    it('OBLIGATIONS has 18 entries', () => {
        expect(OBLIGATIONS).toHaveLength(18);
    });

    it('Each obligation has required fields', () => {
        for (const ob of OBLIGATIONS) {
            expect(ob).toHaveProperty('icon');
            expect(ob).toHaveProperty('borderClass');
            expect(ob).toHaveProperty('iconClass');
            expect(ob).toHaveProperty('textClass');
            expect(ob.text || ob.html).toBeTruthy();
        }
    });

    it('DOCUMENTS has 12 entries', () => {
        expect(DOCUMENTS).toHaveLength(12);
    });

    it('Each document has required fields', () => {
        for (const doc of DOCUMENTS) {
            expect(doc).toHaveProperty('title');
            expect(doc).toHaveProperty('url');
            expect(doc).toHaveProperty('icon');
            expect(doc).toHaveProperty('hoverClass');
            expect(doc).toHaveProperty('iconBgClass');
            expect(doc).toHaveProperty('iconTextClass');
            expect(doc).toHaveProperty('hoverTextClass');
        }
    });

    it('No Tailwind class uses dynamic interpolation', () => {
        const allClasses = [
            ...OBLIGATIONS.flatMap((ob) =>
                [ob.borderClass, ob.iconClass, ob.textClass, ob.overlayClass].filter(Boolean)
            ),
            ...DOCUMENTS.flatMap((doc) =>
                [doc.hoverClass, doc.iconBgClass, doc.iconTextClass, doc.hoverTextClass].filter(
                    Boolean
                )
            ),
        ];

        for (const cls of allClasses) {
            expect(cls).not.toContain('${');
            expect(cls).not.toContain('undefined');
        }
    });
});

// ---------------------------------------------------------------------------
// Tests d'intégrité des données de configuration (config.js)
// ---------------------------------------------------------------------------

describe('Config data integrity', () => {
    it('GRILLE_SALARIALE has all required fields', () => {
        expect(GRILLE_SALARIALE).toHaveProperty('smicHoraire');
        expect(GRILLE_SALARIALE).toHaveProperty('kmRate');
        expect(GRILLE_SALARIALE).toHaveProperty('ticketValue');
        expect(GRILLE_SALARIALE).toHaveProperty('primeCarburantMax');
        expect(GRILLE_SALARIALE.smicHoraire).toBeGreaterThan(0);
    });

    it('AGENCY_CONFIGS has nord-touraine and loches', () => {
        expect(AGENCY_CONFIGS).toHaveProperty('nord-touraine');
        expect(AGENCY_CONFIGS).toHaveProperty('loches');
        expect(AGENCY_CONFIGS).toHaveProperty('langeais');
    });

    it('Each agency config has all required sections', () => {
        for (const [, config] of Object.entries(AGENCY_CONFIGS)) {
            expect(config).toHaveProperty('name');
            expect(config).toHaveProperty('telephone');
            expect(config).toHaveProperty('home');
            expect(config).toHaveProperty('remuneration');
            expect(config).toHaveProperty('docs');
            expect(config).toHaveProperty('contacts');
        }
    });
});
