// agence-init.js — chargé en <head>, configure manifest et titre avant rendu
// Pas de dépendance ; exécuté en IIFE pour ne pas polluer le scope global.
(function () {
    function detectAgence() {
        var host = window.location.hostname;
        if (host.indexOf('o2loches') === 0) return 'loches';
        if (host.indexOf('o2nordtouraine') === 0) return 'nord-touraine';
        var params = new URLSearchParams(window.location.search);
        var agence = params.get('agence');
        if (agence === 'loches' || agence === 'nord-touraine') return agence;
        return 'nord-touraine';
    }

    window.__AGENCE__ = detectAgence();

    var manifestLink = document.getElementById('dynamic-manifest');
    if (manifestLink) {
        var appleTitle = document.getElementById('apple-web-app-title');
        if (window.__AGENCE__ === 'loches') {
            manifestLink.setAttribute('href', './manifest-loches.json');
            document.title = 'O2 Loches';
            if (appleTitle) appleTitle.setAttribute('content', 'O2 Loches');
        } else {
            manifestLink.setAttribute('href', './manifest-nord.json');
            document.title = 'O2 Nord Touraine';
            if (appleTitle) appleTitle.setAttribute('content', 'O2 Nord Touraine');
        }
    }
})();
