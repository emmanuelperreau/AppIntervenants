// Contenu RH externalise -- modifiable sans toucher au HTML
// NOTE : les classes Tailwind sont ecrites en entier (pas de concatenation dynamique)
//        pour que le moteur de purge puisse les detecter.

interface ObligationBase {
    icon: string;
    borderClass: string;
    iconClass: string;
    textClass: string;
}

interface ObligationWithText extends ObligationBase {
    text: string;
    html?: undefined;
    overlayIcon?: string;
    overlayClass?: string;
}

interface ObligationWithHtml extends ObligationBase {
    html: string;
    text?: undefined;
    overlayIcon?: string;
    overlayClass?: string;
}

export type Obligation = ObligationWithText | ObligationWithHtml;

export interface DocumentLink {
    title: string;
    url: string;
    icon: string;
    id?: string;
    hoverClass: string;
    iconBgClass: string;
    iconTextClass: string;
    hoverTextClass: string;
}

/**
 * Les 18 obligations de l'intervenant au quotidien.
 * Chaque entree genere une carte dans l'onglet "Quotidien".
 */
export const OBLIGATIONS: readonly Obligation[] = [
    {
        icon: "shirt",
        borderClass: "border-pink-100 dark:border-pink-900/30",
        iconClass: "text-pink-600 dark:text-pink-400",
        textClass: "text-pink-900 dark:text-pink-200",
        text: "Avoir une pr\u00e9sentation correcte et une tenue de travail adapt\u00e9e en portant les \u00e9quipements fournis par O2"
    },
    {
        icon: "clock",
        borderClass: "border-blue-100 dark:border-blue-900/30",
        iconClass: "text-blue-600 dark:text-blue-400",
        textClass: "text-blue-900 dark:text-blue-200",
        text: "\u00catre ponctuel (ne pas d\u00e9cider les horaires) et avertir en cas de retard ou d'absence"
    },
    {
        icon: "qr-code",
        borderClass: "border-sky-100 dark:border-sky-900/30",
        iconClass: "text-sky-500",
        textClass: "text-sky-900 dark:text-sky-200",
        text: "Scanner le QR code au d\u00e9but et \u00e0 la fin de chaque intervention"
    },
    {
        icon: "phone",
        borderClass: "border-orange-100 dark:border-orange-900/30",
        iconClass: "text-orange-600 dark:text-orange-400",
        textClass: "text-orange-900 dark:text-orange-200",
        html: "<p class=\"mb-1\">En cas d'absence, pr\u00e9venir directement la <span class=\"font-bold\">Ligne des Salari\u00e9s</span></p>"
    },
    {
        icon: "clipboard-list",
        borderClass: "border-indigo-100 dark:border-indigo-900/30",
        iconClass: "text-indigo-500",
        textClass: "text-indigo-900 dark:text-indigo-200",
        text: "Respecter la feuille de route (t\u00e2ches \u00e0 r\u00e9aliser lors de la prestation)"
    },
    {
        icon: "key",
        borderClass: "border-amber-100 dark:border-amber-900/30",
        iconClass: "text-amber-500",
        textClass: "text-amber-900 dark:text-amber-200",
        text: "\u00catre responsable des cl\u00e9s confi\u00e9es"
    },
    {
        icon: "message-circle",
        borderClass: "border-fuchsia-100 dark:border-fuchsia-900/30",
        iconClass: "text-fuchsia-500",
        textClass: "text-fuchsia-900 dark:text-fuchsia-200",
        text: "Vouvoyer les clients, \u00eatre poli et utiliser un vocabulaire correct"
    },
    {
        icon: "eye-off",
        borderClass: "border-emerald-100 dark:border-emerald-900/30",
        iconClass: "text-emerald-500",
        textClass: "text-emerald-900 dark:text-emerald-200",
        text: "Faire preuve de discr\u00e9tion (ne pas diffuser les informations personnelles, ne pas se confier...)"
    },
    {
        icon: "heart",
        borderClass: "border-rose-100 dark:border-rose-900/30",
        iconClass: "text-rose-500 fill-rose-100 dark:fill-rose-900",
        textClass: "text-rose-900 dark:text-rose-200",
        text: "Respecter les habitudes et les choix de vie (religion, culture, intimit\u00e9 ...)"
    },
    {
        icon: "ear",
        borderClass: "border-sky-100 dark:border-sky-900/30",
        iconClass: "text-sky-400",
        textClass: "text-sky-900 dark:text-sky-200",
        text: "Remonter \u00e0 votre agence toute modification de planning convenue avec le client ou toutes \u00e9volutions possibles de ses besoins"
    },
    {
        icon: "gift",
        borderClass: "border-red-100 dark:border-red-900/30",
        iconClass: "text-red-500",
        textClass: "text-red-900 dark:text-red-200",
        text: "Ne pas accepter d'argent ou de cadeaux de la part des clients",
        overlayIcon: "x",
        overlayClass: "text-red-600"
    },
    {
        icon: "headset",
        borderClass: "border-violet-100 dark:border-violet-900/30",
        iconClass: "text-violet-600",
        textClass: "text-violet-900 dark:text-violet-200",
        text: "Informer O2 en cas de situation pr\u00e9occupante"
    },
    {
        icon: "book-open",
        borderClass: "border-green-100 dark:border-green-900/30",
        iconClass: "text-green-600",
        textClass: "text-green-900 dark:text-green-200",
        text: "Remplir le cahier de liaison \u00e0 chaque intervention"
    },
    {
        icon: "alert-octagon",
        borderClass: "border-cyan-100 dark:border-cyan-900/30",
        iconClass: "text-cyan-500",
        textClass: "text-cyan-900 dark:text-cyan-200",
        text: "Informer imm\u00e9diatement O2 de tout sinistre, casse ou probl\u00e8me"
    },
    {
        icon: "arrow-left-right",
        borderClass: "border-amber-100 dark:border-amber-900/30",
        iconClass: "text-amber-500",
        textClass: "text-amber-900 dark:text-amber-200",
        text: "Assurer les remplacements avec professionnalisme (pr\u00e9sentez votre carte O2 aupr\u00e8s d'un nouveau client)"
    },
    {
        icon: "file-edit",
        borderClass: "border-blue-100 dark:border-blue-900/30",
        iconClass: "text-blue-700 dark:text-blue-400",
        textClass: "text-blue-900 dark:text-blue-200",
        text: "Signaler \u00e0 O2 tout changement personnel (\u00e9tat civil, allergies, adresse, permis de conduire, aptitude...)"
    },
    {
        icon: "cigarette-off",
        borderClass: "border-slate-100 dark:border-slate-600",
        iconClass: "text-slate-500",
        textClass: "text-slate-900 dark:text-slate-200",
        text: "Ne pas fumer ou consommer de boissons alcoolis\u00e9es chez les clients"
    },
    {
        icon: "lock",
        borderClass: "border-red-100 dark:border-red-900/30",
        iconClass: "text-red-600",
        textClass: "text-red-900 dark:text-red-200",
        text: "Ne pas utiliser d'objets et mat\u00e9riels appartenant aux clients sans leur autorisation"
    }
] as const;

/**
 * Liens documents affiches dans l'onglet "Docs".
 * Les liens avec un `id` sont mis a jour dynamiquement via config.ts (applyConfig).
 * Les liens avec un `url` statique pointent directement vers leur destination.
 */
export const DOCUMENTS: readonly DocumentLink[] = [
    {
        title: "Guide Assistant(e) M\u00e9nager(\u00e8re)",
        url: "https://drive.google.com/file/d/1QwaUc8TZ1Ob-WEUbJF61WDoL5lIWYYZI/view?usp=sharing",
        icon: "sparkles",
        hoverClass: "hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-200",
        iconBgClass: "bg-orange-100 dark:bg-orange-900/50",
        iconTextClass: "text-orange-600 dark:text-orange-400",
        hoverTextClass: "group-hover:text-orange-700 dark:group-hover:text-orange-300"
    },
    {
        title: "Guide Garde d'Enfant(s)",
        url: "https://drive.google.com/file/d/1WQ38xAV4ZLMPdgYLpp1PbkHLa_uO4Ek_/view?usp=sharing",
        icon: "baby",
        hoverClass: "hover:bg-fuchsia-50 dark:hover:bg-fuchsia-900/20 hover:border-fuchsia-200",
        iconBgClass: "bg-fuchsia-100 dark:bg-fuchsia-900/50",
        iconTextClass: "text-fuchsia-600 dark:text-fuchsia-400",
        hoverTextClass: "group-hover:text-fuchsia-700 dark:group-hover:text-fuchsia-300"
    },
    {
        title: "Guide Assistant(e) de Vie",
        url: "https://drive.google.com/file/d/1SscPY3Q6noC3F1ddvqJ9jouXdxVm6smh/view?usp=sharing",
        icon: "heart-handshake",
        hoverClass: "hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-200",
        iconBgClass: "bg-purple-100 dark:bg-purple-900/50",
        iconTextClass: "text-purple-600 dark:text-purple-400",
        hoverTextClass: "group-hover:text-purple-700 dark:group-hover:text-purple-300"
    },
    {
        title: "Convention Collective",
        url: "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000027084096",
        icon: "scale",
        hoverClass: "hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:border-slate-300",
        iconBgClass: "bg-slate-100 dark:bg-slate-700",
        iconTextClass: "text-slate-600 dark:text-slate-300",
        hoverTextClass: "group-hover:text-slate-900 dark:group-hover:text-white"
    },
    {
        title: "Mes Avantages Salaire",
        url: "#",
        icon: "gem",
        id: "doc-link-avantages",
        hoverClass: "hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-200",
        iconBgClass: "bg-emerald-100 dark:bg-emerald-900/50",
        iconTextClass: "text-emerald-600 dark:text-emerald-400",
        hoverTextClass: "group-hover:text-emerald-700 dark:group-hover:text-emerald-300"
    },
    {
        title: "Note Pose des Cong\u00e9s",
        url: "#",
        icon: "sun",
        id: "doc-link-conges",
        hoverClass: "hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:border-amber-200",
        iconBgClass: "bg-amber-100 dark:bg-amber-900/50",
        iconTextClass: "text-amber-600 dark:text-amber-400",
        hoverTextClass: "group-hover:text-amber-700 dark:group-hover:text-amber-300"
    },
    {
        title: "Ma Couverture Sant\u00e9",
        url: "#",
        icon: "stethoscope",
        id: "doc-link-due-sante",
        hoverClass: "hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:border-teal-200",
        iconBgClass: "bg-teal-100 dark:bg-teal-900/50",
        iconTextClass: "text-teal-600 dark:text-teal-400",
        hoverTextClass: "group-hover:text-teal-700 dark:group-hover:text-teal-300"
    },
    {
        title: "Garantie Frais Sant\u00e9",
        url: "#",
        icon: "shield-check",
        id: "doc-link-garantie-sante",
        hoverClass: "hover:bg-cyan-50 dark:hover:bg-cyan-900/20 hover:border-cyan-200",
        iconBgClass: "bg-cyan-100 dark:bg-cyan-900/50",
        iconTextClass: "text-cyan-600 dark:text-cyan-400",
        hoverTextClass: "group-hover:text-cyan-700 dark:group-hover:text-cyan-300"
    },
    {
        title: "Mon Int\u00e9ressement",
        url: "#",
        icon: "coins",
        id: "doc-link-due-interessement",
        hoverClass: "hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:border-rose-200",
        iconBgClass: "bg-rose-100 dark:bg-rose-900/50",
        iconTextClass: "text-rose-600 dark:text-rose-400",
        hoverTextClass: "group-hover:text-rose-700 dark:group-hover:text-rose-300"
    },
    {
        title: "Accord Temps de Travail",
        url: "#",
        icon: "timer",
        id: "doc-link-accord-temps",
        hoverClass: "hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-200",
        iconBgClass: "bg-indigo-100 dark:bg-indigo-900/50",
        iconTextClass: "text-indigo-600 dark:text-indigo-400",
        hoverTextClass: "group-hover:text-indigo-700 dark:group-hover:text-indigo-300"
    },
    {
        title: "Sensibilisation \u00e0 la Confidentialit\u00e9",
        url: "https://drive.google.com/file/d/1FsTsWV1i1u-hXZhHQcinDwzSixnLduCx/view?usp=drive_link",
        icon: "shield",
        hoverClass: "hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:border-slate-300",
        iconBgClass: "bg-slate-100 dark:bg-slate-700",
        iconTextClass: "text-slate-600 dark:text-slate-300",
        hoverTextClass: "group-hover:text-slate-900 dark:group-hover:text-white"
    }
];
