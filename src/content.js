// src/content.js — Données RH (obligations + documents)
// Les classes CSS correspondent aux classes sémantiques de styles.css.
// NOTE : pas de concatenation dynamique, tout est écrit en entier.

/**
 * Les 18 obligations de l'intervenant au quotidien.
 * Chaque entrée génère une carte dans l'onglet "Quotidien".
 * @type {readonly {icon:string,borderClass:string,iconClass:string,textClass:string,text?:string,html?:string,overlayIcon?:string,overlayClass?:string}[]}
 */
export const OBLIGATIONS = [
    {
        icon: 'shirt',
        borderClass: 'border-pink-100 dark:border-pink-900/30',
        iconClass: 'text-pink-600 dark:text-pink-400',
        textClass: 'text-pink-900 dark:text-pink-200',
        text: 'Avoir une présentation correcte et une tenue de travail adaptée en portant les équipements fournis par O2'
    },
    {
        icon: 'clock',
        borderClass: 'border-blue-100 dark:border-blue-900/30',
        iconClass: 'text-blue-600 dark:text-blue-400',
        textClass: 'text-blue-900 dark:text-blue-200',
        text: 'Être ponctuel (ne pas décider les horaires) et avertir en cas de retard ou d\'absence'
    },
    {
        icon: 'qr-code',
        borderClass: 'border-sky-100 dark:border-sky-900/30',
        iconClass: 'text-sky-500',
        textClass: 'text-sky-900 dark:text-sky-200',
        text: 'Scanner le QR code au début et à la fin de chaque intervention'
    },
    {
        icon: 'phone',
        borderClass: 'border-orange-100 dark:border-orange-900/30',
        iconClass: 'text-orange-600 dark:text-orange-400',
        textClass: 'text-orange-900 dark:text-orange-200',
        html: '<p class="mb-1">En cas d\'absence, prévenir directement la <span class="font-bold">Ligne des Salariés</span></p>'
    },
    {
        icon: 'clipboard-list',
        borderClass: 'border-indigo-100 dark:border-indigo-900/30',
        iconClass: 'text-indigo-500',
        textClass: 'text-indigo-900 dark:text-indigo-200',
        text: 'Respecter la feuille de route (tâches à réaliser lors de la prestation)'
    },
    {
        icon: 'key',
        borderClass: 'border-amber-100 dark:border-amber-900/30',
        iconClass: 'text-amber-500',
        textClass: 'text-amber-900 dark:text-amber-200',
        text: 'Être responsable des clés confiées'
    },
    {
        icon: 'message-circle',
        borderClass: 'border-fuchsia-100 dark:border-fuchsia-900/30',
        iconClass: 'text-fuchsia-500',
        textClass: 'text-fuchsia-900 dark:text-fuchsia-200',
        text: 'Vouvoyer les clients, être poli et utiliser un vocabulaire correct'
    },
    {
        icon: 'eye-off',
        borderClass: 'border-emerald-100 dark:border-emerald-900/30',
        iconClass: 'text-emerald-500',
        textClass: 'text-emerald-900 dark:text-emerald-200',
        text: 'Faire preuve de discrétion (ne pas diffuser les informations personnelles, ne pas se confier...)'
    },
    {
        icon: 'heart',
        borderClass: 'border-rose-100 dark:border-rose-900/30',
        iconClass: 'text-rose-500',
        textClass: 'text-rose-900 dark:text-rose-200',
        text: 'Respecter les habitudes et les choix de vie (religion, culture, intimité ...)'
    },
    {
        icon: 'ear',
        borderClass: 'border-sky-100 dark:border-sky-900/30',
        iconClass: 'text-sky-400',
        textClass: 'text-sky-900 dark:text-sky-200',
        text: 'Remonter à votre agence toute modification de planning convenue avec le client ou toutes évolutions possibles de ses besoins'
    },
    {
        icon: 'ban',
        borderClass: 'border-red-100 dark:border-red-900/30',
        iconClass: 'text-red-500',
        textClass: 'text-red-900 dark:text-red-200',
        text: 'Ne pas accepter d\'argent ou de cadeaux de la part des clients'
    },
    {
        icon: 'phone-call',
        borderClass: 'border-violet-100 dark:border-violet-900/30',
        iconClass: 'text-violet-600',
        textClass: 'text-violet-900 dark:text-violet-200',
        text: 'Informer O2 en cas de situation préoccupante'
    },
    {
        icon: 'book-open',
        borderClass: 'border-green-100 dark:border-green-900/30',
        iconClass: 'text-green-600',
        textClass: 'text-green-900 dark:text-green-200',
        text: 'Remplir le cahier de liaison à chaque intervention'
    },
    {
        icon: 'alert-octagon',
        borderClass: 'border-cyan-100 dark:border-cyan-900/30',
        iconClass: 'text-cyan-500',
        textClass: 'text-cyan-900 dark:text-cyan-200',
        text: 'Informer immédiatement O2 de tout sinistre, casse ou problème'
    },
    {
        icon: 'arrow-left-right',
        borderClass: 'border-amber-100 dark:border-amber-900/30',
        iconClass: 'text-amber-500',
        textClass: 'text-amber-900 dark:text-amber-200',
        text: 'Assurer les remplacements avec professionnalisme (présentez votre carte O2 auprès d\'un nouveau client)'
    },
    {
        icon: 'file-edit',
        borderClass: 'border-blue-100 dark:border-blue-900/30',
        iconClass: 'text-blue-700 dark:text-blue-400',
        textClass: 'text-blue-900 dark:text-blue-200',
        text: 'Signaler à O2 tout changement personnel (état civil, allergies, adresse, permis de conduire, aptitude...)'
    },
    {
        icon: 'ban',
        borderClass: 'border-slate-100 dark:border-slate-600',
        iconClass: 'text-slate-500',
        textClass: 'text-slate-900 dark:text-slate-200',
        text: 'Ne pas fumer ou consommer de boissons alcoolisées chez les clients'
    },
    {
        icon: 'lock',
        borderClass: 'border-red-100 dark:border-red-900/30',
        iconClass: 'text-red-600',
        textClass: 'text-red-900 dark:text-red-200',
        text: 'Ne pas utiliser d\'objets et matériels appartenant aux clients sans leur autorisation'
    }
];

/**
 * Liens documents affichés dans l'onglet "Docs".
 * Les liens avec un `id` sont mis à jour dynamiquement via config.js (applyConfig).
 * colorClass correspond au préfixe doc-xxx de styles.css.
 */
export const DOCUMENTS = [
    {
        title: 'Guide Assistant(e) Ménager(ère)',
        url: 'https://drive.google.com/file/d/1QwaUc8TZ1Ob-WEUbJF61WDoL5lIWYYZI/view?usp=sharing',
        icon: 'sparkles',
        colorClass: 'doc-orange',
        hoverClass: 'hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-200',
        iconBgClass: 'bg-orange-100 dark:bg-orange-900/50',
        iconTextClass: 'text-orange-600 dark:text-orange-400',
        hoverTextClass: 'group-hover:text-orange-700 dark:group-hover:text-orange-300'
    },
    {
        title: 'Guide Garde d\'Enfant(s)',
        url: 'https://drive.google.com/file/d/1WQ38xAV4ZLMPdgYLpp1PbkHLa_uO4Ek_/view?usp=sharing',
        icon: 'baby',
        colorClass: 'doc-fuchsia',
        hoverClass: 'hover:bg-fuchsia-50 dark:hover:bg-fuchsia-900/20 hover:border-fuchsia-200',
        iconBgClass: 'bg-fuchsia-100 dark:bg-fuchsia-900/50',
        iconTextClass: 'text-fuchsia-600 dark:text-fuchsia-400',
        hoverTextClass: 'group-hover:text-fuchsia-700 dark:group-hover:text-fuchsia-300'
    },
    {
        title: 'Guide Assistant(e) de Vie',
        url: 'https://drive.google.com/file/d/1SscPY3Q6noC3F1ddvqJ9jouXdxVm6smh/view?usp=sharing',
        icon: 'heart-handshake',
        colorClass: 'doc-purple',
        hoverClass: 'hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-200',
        iconBgClass: 'bg-purple-100 dark:bg-purple-900/50',
        iconTextClass: 'text-purple-600 dark:text-purple-400',
        hoverTextClass: 'group-hover:text-purple-700 dark:group-hover:text-purple-300'
    },
    {
        title: 'Convention Collective',
        url: 'https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000027084096',
        icon: 'scale',
        colorClass: 'doc-slate',
        hoverClass: 'hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:border-slate-300',
        iconBgClass: 'bg-slate-100 dark:bg-slate-700',
        iconTextClass: 'text-slate-600 dark:text-slate-300',
        hoverTextClass: 'group-hover:text-slate-900 dark:group-hover:text-white'
    },
    {
        title: 'Mes Avantages Salaire',
        url: '#',
        icon: 'gem',
        id: 'doc-link-avantages',
        colorClass: 'doc-emerald',
        hoverClass: 'hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-200',
        iconBgClass: 'bg-emerald-100 dark:bg-emerald-900/50',
        iconTextClass: 'text-emerald-600 dark:text-emerald-400',
        hoverTextClass: 'group-hover:text-emerald-700 dark:group-hover:text-emerald-300'
    },
    {
        title: 'Ma Couverture Santé',
        url: '#',
        icon: 'stethoscope',
        id: 'doc-link-due-sante',
        colorClass: 'doc-teal',
        hoverClass: 'hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:border-teal-200',
        iconBgClass: 'bg-teal-100 dark:bg-teal-900/50',
        iconTextClass: 'text-teal-600 dark:text-teal-400',
        hoverTextClass: 'group-hover:text-teal-700 dark:group-hover:text-teal-300'
    },
    {
        title: 'Garantie Frais Santé',
        url: '#',
        icon: 'shield-check',
        id: 'doc-link-garantie-sante',
        colorClass: 'doc-cyan',
        hoverClass: 'hover:bg-cyan-50 dark:hover:bg-cyan-900/20 hover:border-cyan-200',
        iconBgClass: 'bg-cyan-100 dark:bg-cyan-900/50',
        iconTextClass: 'text-cyan-600 dark:text-cyan-400',
        hoverTextClass: 'group-hover:text-cyan-700 dark:group-hover:text-cyan-300'
    },
    {
        title: 'Mon Intéressement',
        url: '#',
        icon: 'coins',
        id: 'doc-link-due-interessement',
        colorClass: 'doc-rose',
        hoverClass: 'hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:border-rose-200',
        iconBgClass: 'bg-rose-100 dark:bg-rose-900/50',
        iconTextClass: 'text-rose-600 dark:text-rose-400',
        hoverTextClass: 'group-hover:text-rose-700 dark:group-hover:text-rose-300'
    },
    {
        title: 'Accord Temps de Travail',
        url: '#',
        icon: 'timer',
        id: 'doc-link-accord-temps',
        colorClass: 'doc-indigo',
        hoverClass: 'hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-200',
        iconBgClass: 'bg-indigo-100 dark:bg-indigo-900/50',
        iconTextClass: 'text-indigo-600 dark:text-indigo-400',
        hoverTextClass: 'group-hover:text-indigo-700 dark:group-hover:text-indigo-300'
    },
    {
        title: 'Sensibilisation à la Confidentialité',
        url: 'https://drive.google.com/file/d/1FsTsWV1i1u-hXZhHQcinDwzSixnLduCx/view?usp=drive_link',
        icon: 'shield',
        colorClass: 'doc-slate',
        hoverClass: 'hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:border-slate-300',
        iconBgClass: 'bg-slate-100 dark:bg-slate-700',
        iconTextClass: 'text-slate-600 dark:text-slate-300',
        hoverTextClass: 'group-hover:text-slate-900 dark:group-hover:text-white'
    }
];
