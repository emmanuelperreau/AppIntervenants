// agence-init.js — chargé en <head>, configure manifest et titre avant rendu
// Pas de dépendance ; exécuté en IIFE pour ne pas polluer le scope global.
(function () {
    var params = new URLSearchParams(window.location.search);
    var agence = params.get('agence');
    var manifestLink = document.getElementById('dynamic-manifest');
    var appleTitle = document.getElementById('apple-web-app-title');

    if (agence === 'loches') {
        if (manifestLink) manifestLink.setAttribute('href', './manifest-loches.json');
        document.title = 'O2 Loches';
        if (appleTitle) appleTitle.setAttribute('content', 'O2 Loches');
    } else {
        if (manifestLink) manifestLink.setAttribute('href', './manifest-nord.json');
        document.title = 'O2 Nord Touraine';
        if (appleTitle) appleTitle.setAttribute('content', 'O2 Nord Touraine');
    }
})();
