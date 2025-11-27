import { Contact, SalaryLevel, SeniorityBonus } from './types';

export const AGENCY_NAME = "O2 Nord Touraine";
export const AGENCY_PHONE = "02 46 65 68 80";
export const AGENCY_EMAIL = "nordtouraine@o2.fr";
export const AGENCY_ADDRESS = "134 Bd Charles de Gaulle, 37540 Saint-Cyr-Sur-Loire";

export const SENIORITY_DATA: SeniorityBonus[] = [
  { years: '1 an', amount: 5 },
  { years: '2 ans', amount: 10 },
  { years: '3 ans', amount: 15 },
  { years: '5 ans', amount: 20 },
  { years: '10 ans', amount: 30 },
];

export const SALARY_GRID: SalaryLevel[] = [
  { level: "SMIC (ou Conv)", roles: ["AM1"] },
  { level: "SMIC (ou Conv)", roles: ["AM2", "GE2"] },
  { level: "SMIC + 5 cts", roles: ["AM2 Confirmé", "GE3", "AV2"] },
  { level: "SMIC + 10 cts", roles: ["AM2 Expert", "GE3 Confirmé", "AV3"] },
  { level: "SMIC + 15 cts", roles: ["AM2 Référent", "GE3 Expert", "AV3 Confirmé"] },
  { level: "SMIC + 20 cts", roles: ["GE3 Référent", "AV3 Expert"] },
];

export const EQUIPMENT_LIST = [
  { name: "Guides métiers", icon: "book" },
  { name: "Chaussures antidérapantes", icon: "footprints" },
  { name: "Tabliers & Gants", icon: "shirt" },
  { name: "Gilet fluo & Bracelet", icon: "vest" }, 
];

export const CONTACTS: Contact[] = [
  {
    title: "Urgences",
    phone: "112",
    urgent: true,
    description: "Médical, Police, Pompiers, Danger immédiat"
  },
  {
    title: "Ligne Salariés O2",
    phone: "02 43 72 43 45",
    hours: "Lun-Ven: 7h-20h30",
    description: "Retards, Problèmes de scan, Maladie"
  },
  {
    title: "Agence / Planning",
    phone: "02 46 65 68 80",
    hours: "Lun-Ven: 9h-12h / 14h-18h",
    description: "Accident de trajet, Sinistre, Changement planning"
  }
];

export const OBLIGATIONS = [
  { icon: 'shirt', text: "Tenue correcte et équipements O2" },
  { icon: 'clock', text: "Ponctualité (avertir en cas de retard)" },
  { icon: 'phone', text: "Remonter les changements de planning" },
  { icon: 'gift', text: "Ne pas accepter d'argent ou cadeaux" },
  { icon: 'file-edit', text: "Signaler tout changement personnel" },
  { icon: 'user-check', text: "Discrétion sur la vie privée" },
  { icon: 'heart-handshake', text: "Vouvoyer et rester poli" },
  { icon: 'key', text: "Responsable des clés confiées" },
  { icon: 'lock', text: "Pas d'animaux/tiers sans accord" },
  { icon: 'alert-triangle', text: "Informer O2 de tout sinistre" },
  { icon: 'book', text: "Remplir le cahier de liaison" },
  { icon: 'baby', text: "Alerter : situation préoccupante" },
  { icon: 'users', text: "Assurer les remplacements avec professionnalisme" },
  { icon: 'ban', text: "Ne pas utiliser le matériel client sans accord" },
];