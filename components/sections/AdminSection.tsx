import React from 'react';
import { Card } from '../ui/Card';
import { CONTACTS, AGENCY_PHONE } from '../../constants';
import { Phone, Calendar, ExternalLink, Clock, ShieldAlert, Stethoscope } from 'lucide-react';

export const AdminSection: React.FC = () => {
  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Contacts */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
             <h2 className="text-xl font-bold text-[#11183b] mb-6 flex items-center gap-3">
               <div className="bg-teal-50 p-2 rounded-lg text-teal-600">
                  <Phone size={24} />
               </div>
               Annuaire Utile
             </h2>
             <div className="space-y-4">
              {CONTACTS.map((contact, idx) => (
                <div key={idx} className={`relative group rounded-2xl p-5 border transition-all duration-300 ${contact.urgent ? 'bg-red-50/50 border-red-100 hover:bg-red-50' : 'bg-slate-50/50 border-slate-100 hover:bg-white hover:border-teal-200 hover:shadow-md'}`}>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                         {contact.urgent && <ShieldAlert size={16} className="text-red-500" />}
                         <h3 className={`font-bold text-base ${contact.urgent ? 'text-red-700' : 'text-[#11183b]'}`}>{contact.title}</h3>
                      </div>
                      
                      {contact.description && <p className="text-xs text-slate-500 mb-3 leading-relaxed">{contact.description}</p>}
                      
                      {contact.hours && (
                        <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-white rounded-md border border-slate-100 text-[10px] font-medium text-slate-400">
                          <Clock size={10} /> {contact.hours}
                        </div>
                      )}
                    </div>
                    
                    <a 
                      href={`tel:${contact.phone.replace(/\s/g, '')}`} 
                      className={`w-12 h-12 flex items-center justify-center rounded-full shadow-sm transition-transform active:scale-90 shrink-0 ${contact.urgent ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-white text-teal-600 border border-slate-100 hover:border-teal-200'}`}
                    >
                      <Phone size={20} fill={contact.urgent ? "currentColor" : "none"} />
                    </a>
                  </div>
                  <div className={`mt-3 font-mono text-lg font-bold tracking-tight ${contact.urgent ? 'text-red-600' : 'text-slate-700'}`}>
                    {contact.phone}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Maladie & Congés Info */}
        <div className="space-y-6">
           {/* Maladie */}
          <Card title="Arrêt Maladie" icon={<Stethoscope size={20} />} headerColor="bg-gradient-to-r from-orange-500 to-red-500">
            <div className="space-y-4">
               <div className="bg-orange-50 p-4 rounded-xl border-l-4 border-orange-400">
                  <h4 className="font-bold text-orange-900 text-sm mb-1">Délai 48h strict</h4>
                  <p className="text-xs text-orange-800">Le justificatif doit parvenir à l'agence sous 48h, même pour 1/2 journée.</p>
               </div>

               <div className="relative pl-4 space-y-6 before:absolute before:top-2 before:bottom-2 before:left-1.5 before:w-0.5 before:bg-slate-200">
                  <div className="relative">
                     <span className="absolute -left-[19px] top-1 w-3 h-3 bg-white border-2 border-orange-400 rounded-full"></span>
                     <p className="text-sm font-bold text-slate-800">1. Appeler O2</p>
                     <p className="text-xs text-slate-500">Immédiatement. Nous prévenons les clients.</p>
                  </div>
                  <div className="relative">
                     <span className="absolute -left-[19px] top-1 w-3 h-3 bg-white border-2 border-orange-400 rounded-full"></span>
                     <p className="text-sm font-bold text-slate-800">2. Envoyer le justificatif</p>
                     <p className="text-xs text-slate-500">Ligne Salariés : {AGENCY_PHONE}</p>
                  </div>
                  <div className="relative">
                     <span className="absolute -left-[19px] top-1 w-3 h-3 bg-white border-2 border-orange-400 rounded-full"></span>
                     <p className="text-sm font-bold text-slate-800">3. Reprise</p>
                     <p className="text-xs text-slate-500">Confirmer votre retour la veille.</p>
                  </div>
               </div>

               {/* BON COMPORTEMENT - BLUE */}
               <div className="bg-[#60a5fa] text-white p-4 rounded-xl shadow-sm">
                 <h4 className="font-bold text-sm mb-1">Les bons comportements :</h4>
                 <p className="text-xs leading-relaxed">
                    Reprenez contact avec votre agence avant la fin de votre arrêt maladie afin d'organiser votre reprise ou l'informer d'une prolongation éventuelle.
                 </p>
               </div>
            </div>
          </Card>

          {/* Congés Info */}
          <Card title="Règles des Congés" icon={<Calendar size={20} />} headerColor="bg-gradient-to-r from-teal-600 to-blue-600">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-center mb-2">
                  <div className="bg-teal-50 p-3 rounded-xl border border-teal-100">
                     <div className="text-2xl font-bold text-teal-700">2,5</div>
                     <div className="text-[10px] uppercase font-bold text-teal-800/60">Jours / mois</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                     <div className="text-2xl font-bold text-blue-700">5</div>
                     <div className="text-[10px] uppercase font-bold text-blue-800/60">Semaines / an</div>
                  </div>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-4">
                 <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Périodes de demande</h4>
                 <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                       <span className="font-bold text-slate-700">En Septembre</span>
                       <span className="text-slate-500 text-xs">pour Déc. à Mai</span>
                    </div>
                    <div className="w-full h-px bg-slate-200"></div>
                    <div className="flex justify-between items-center text-sm">
                       <span className="font-bold text-slate-700">En Mars</span>
                       <span className="text-slate-500 text-xs">pour Juin à Nov.</span>
                    </div>
                 </div>
              </div>

               {/* BON COMPORTEMENT - ORANGE */}
               <div className="bg-[#ee9572] text-white p-4 rounded-xl shadow-sm">
                 <h4 className="font-bold text-sm mb-1">Les bons comportements :</h4>
                 <p className="text-xs leading-relaxed">
                    Sans clés, les remplacements sont impossibles. Veillez donc à mettre l'ensemble de vos clés à disposition de votre agence avant votre départ en congés. Lors de votre retour, pensez à récupérer les clés.
                 </p>
               </div>
            </div>
          </Card>
        </div>

      </div>

      {/* Bottom Banner MySilae */}
      <div className="bg-[#11183b] rounded-2xl p-1 shadow-lg overflow-hidden mt-6">
        <div className="bg-white/5 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-sm">
           <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                  <span className="font-extrabold text-2xl text-[#11183b] tracking-tighter">S</span>
              </div>
              <div className="text-white text-center sm:text-left">
                 <h2 className="text-2xl font-bold mb-1">My Silae</h2>
                 <p className="text-teal-200 text-sm font-medium">Votre portail RH (Paie & Congés)</p>
                 <p className="text-teal-100 text-xs mt-1 bg-white/10 px-2 py-1 rounded inline-block">Règle congés : pose du Lundi au Samedi</p>
              </div>
           </div>
           
           <a 
              href="https://www.mysilae.fr" 
              target="_blank" 
              rel="noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-teal-500/20 transition-all active:scale-95"
           >
              <span>Accéder à mon espace</span>
              <ExternalLink size={18} />
           </a>
        </div>
      </div>
    </div>
  );
};