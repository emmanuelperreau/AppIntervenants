// inject.js — Charge les partiels HTML via fetch() et les injecte dans les slots

const TEMPLATES = ['home', 'daily', 'docs', 'keys'];

/**
 * Charge et injecte tous les partiels d'onglets.
 * tab-money est composé de 3 fichiers concaténés.
 * @returns {Promise<void>}
 */
export async function injectTemplates() {
    const base = './src/templates/';

    const fetches = TEMPLATES.map(name =>
        fetch(base + 'tab-' + name + '.html')
            .then(r => r.text())
            .then(html => {
                const slot = document.getElementById('tab-' + name);
                if (slot) slot.innerHTML = html;
            })
    );

    // tab-money = grille + carriere + primes
    const moneyFetch = Promise.all([
        fetch(base + 'tab-money/grille.html').then(r => r.text()),
        fetch(base + 'tab-money/carriere.html').then(r => r.text()),
        fetch(base + 'tab-money/primes.html').then(r => r.text()),
    ]).then(([grille, carriere, primes]) => {
        const slot = document.getElementById('tab-money');
        if (slot) slot.innerHTML = grille + carriere + primes;
    });

    await Promise.all([...fetches, moneyFetch]);
}
