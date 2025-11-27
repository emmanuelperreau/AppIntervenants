import React from 'react';
import { Card } from '../ui/Card';
import { SENIORITY_DATA, SALARY_GRID } from '../../constants';
import { Euro, TrendingUp, Car, Utensils, Gift, CalendarClock, Coins, Sparkles, Users, HeartHandshake } from 'lucide-react';

export const MoneySection: React.FC = () => {
  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
      
      {/* 1. Top Banner - Interactive Visual */}
      <div className="relative bg-[#11183b] rounded-3xl overflow-hidden shadow-xl p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl -ml-10 -mb-10"></div>
        <div className="absolute right-10 bottom-0 opacity-10 transform translate-y-4">
           <Coins size={120} />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-start gap-4">
            <div className="p-4 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl shadow-lg text-white">
               <CalendarClock size={32}/>
            </div>
            <div>
              <h2 className="text-white font-bold text-2xl mb-1">Paie & Avantages</h2>
              <div className="flex flex-col gap-1">
                 <p className="text-teal-100 text-sm flex items-center gap-2">
                   <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span>
                   Versement le 7 du mois M+1
                 </p>
                 <p className="text-slate-400 text-xs">(ex: salaire de Janvier versé le 7 Février)</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 w-full md:w-auto">
             <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10 flex items-center justify-between gap-4">
                <div className="text-xs font-medium text-teal-200 uppercase tracking-wider">Acompte</div>
                <div className="text-white font-bold">le 26 du mois</div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 2. Grille de Salaire */}
        <Card title="Grille de Salaire" icon={<Euro size={20} />}>
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Niveau</th>
                    <th className="px-4 py-3 font-semibold">Postes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {SALARY_GRID.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3 font-bold text-[#11183b] whitespace-nowrap text-xs sm:text-sm">{row.level}</td>
                      <td className="px-4 py-3 text-slate-600 text-xs">{row.roles.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </Card>

        {/* 3. Prime Ancienneté */}
        <Card title="Prime d'Ancienneté" icon={<Sparkles size={20} />} headerColor="bg-gradient-to-r from-teal-600 to-emerald-600">
            <div className="space-y-4">
              <p className="text-xs text-slate-500 mb-2">Majoration du taux horaire selon l'ancienneté :</p>
              
              <div className="space-y-3">
                 {SENIORITY_DATA.map((item, idx) => {
                    const percentage = (item.amount / 30) * 100;
                    return (
                       <div key={idx} className="relative">
                          <div className="flex justify-between items-center text-sm font-bold text-slate-700 mb-1 z-10 relative">
                             <span>{item.years}</span>
                             <span className="text-teal-700">+{item.amount} cts/h</span>
                          </div>
                          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                             <div 
                                style={{ width: `${percentage}%` }} 
                                className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full shadow-sm"
                             ></div>
                          </div>
                       </div>
                    )
                 })}
              </div>
            </div>
        </Card>

        {/* 4. Transport */}
        <Card title="Mobilité & Transport" icon={<Car size={20} />} headerColor="bg-gradient-to-r from-orange-500 to-red-500">
            <div className="space-y-4">
              <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                <div className="flex justify-between items-center mb-2">
                   <div className="flex gap-3 items-center">
                      <div className="bg-white p-2 rounded-lg shadow-sm text-orange-500 h-fit">
                          <Car size={20} />
                      </div>
                      <span className="font-bold text-slate-800 text-sm">Indemnités Km</span>
                   </div>
                   <div className="text-right">
                       <span className="block text-2xl font-bold text-orange-600">0,45€</span>
                       <span className="text-[10px] text-orange-400 font-medium">/ km</span>
                   </div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-orange-100">
                   <p className="text-xs text-slate-600 font-medium">
                      Rémunération du temps de trajet et des frais kilométriques entre 2 prestations, 
                      si le temps d'intermission (hors trajet) est inférieur à 15 min.
                   </p>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 px-1">
                   Aussi pour trajets domicile-travail > 20km (début/fin de journée).
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-3">
                 <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                        <div className="bg-white p-2 rounded-lg shadow-sm text-slate-600">
                          <TrendingUp size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">Prime Carburant</p>
                          <p className="text-[10px] text-slate-500">Juin & Décembre</p>
                        </div>
                    </div>
                    <span className="bg-[#11183b] text-white px-3 py-1 rounded-lg text-sm font-bold shadow-sm">300 € /an</span>
                 </div>
                 <p className="text-[10px] text-slate-500 italic border-t border-slate-200 pt-2">
                    Proratisée au temps de présence et au temps de travail effectif. Le salarié doit être présent au versement.
                 </p>
              </div>
            </div>
        </Card>

        {/* 5. Titres Restaurant */}
        <Card title="Titres Restaurant" icon={<Utensils size={20} />} headerColor="bg-gradient-to-r from-blue-500 to-indigo-500">
             <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 mb-4">
                <div className="flex justify-between items-end mb-2">
                   <h4 className="font-bold text-blue-900">Valeur Faciale</h4>
                   <span className="text-2xl font-black text-blue-600">6 €</span>
                </div>
                <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden flex">
                   <div className="w-1/2 bg-[#11183b]"></div>
                   <div className="w-1/2 bg-blue-400"></div>
                </div>
                <div className="flex justify-between text-[10px] font-bold mt-1 uppercase tracking-wide">
                   <span className="text-[#11183b]">Part O2 (50%) : 3€</span>
                   <span className="text-blue-500">Votre Part (50%) : 3€</span>
                </div>
             </div>
             
             <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                   <Sparkles size={14} className="text-yellow-500" />
                   <span className="font-bold">Sans condition d'ancienneté</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                   Eligible si la pause méridienne est supérieure à 1 heure. La part salariale est prélevée sur le salaire.
                </p>
                <div className="bg-slate-100 text-slate-600 text-[10px] px-2 py-1 rounded inline-block">
                   Carte UPone
                </div>
             </div>
        </Card>

        {/* 6. Chèques Cadeaux */}
        <Card title="Chèques Cadeaux" icon={<Gift size={20} />} headerColor="bg-gradient-to-r from-pink-500 to-rose-500">
             <div className="space-y-3">
                <div className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                   <div className="bg-pink-100 p-3 rounded-full text-pink-600">
                      <Gift size={24} />
                   </div>
                   <div className="flex-1">
                      <div className="flex justify-between items-center">
                         <h4 className="font-bold text-slate-800">Noël</h4>
                         <span className="bg-pink-100 text-pink-700 text-xs font-bold px-2 py-1 rounded-full">Novembre</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        <span className="font-bold text-pink-600">50€ /an</span> + 15€ par enfant (-16 ans)
                      </p>
                   </div>
                </div>

                <div className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                   <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                      <Sparkles size={24} />
                   </div>
                   <div className="flex-1">
                      <div className="flex justify-between items-center">
                         <h4 className="font-bold text-slate-800">Vacances</h4>
                         <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-full">Juin</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        <span className="font-bold text-orange-600">100€ /an</span> (Co-financement 20% salarié)
                      </p>
                   </div>
                </div>
             </div>
        </Card>
      
      </div>
      
      {/* 7. PARRAINAGES (Full width block) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Parrainage Client - First */}
        <div className="bg-[#ee9572] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform">
           <div className="absolute -right-4 -bottom-4 bg-white/10 w-32 h-32 rounded-full blur-2xl"></div>
           <div className="relative z-10 flex flex-col items-center text-center gap-2">
              <h3 className="text-lg font-medium uppercase tracking-widest opacity-90">Parrainage Clients</h3>
              <Users size={48} className="my-2" />
              <div className="text-5xl font-black tracking-tighter">40 €</div>
              <p className="text-sm opacity-90 font-medium bg-white/20 px-3 py-1 rounded-full">Pour chaque nouveau client</p>
           </div>
        </div>

        {/* Parrainage Salarié - Second */}
        <div className="bg-[#b93c7d] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform">
           <div className="absolute -right-4 -bottom-4 bg-white/10 w-32 h-32 rounded-full blur-2xl"></div>
           <div className="relative z-10 flex flex-col items-center text-center gap-2">
              <h3 className="text-lg font-medium uppercase tracking-widest opacity-90">Parrainage Salariés</h3>
              <Users size={48} className="my-2" />
              <div className="text-5xl font-black tracking-tighter">200 €</div>
              <p className="text-sm opacity-90 font-medium bg-white/20 px-3 py-1 rounded-full">Pour chaque salarié recruté</p>
           </div>
        </div>
      </div>

       {/* 8. Mutuelle Santé (Moved Here - Before Majorations) */}
       <Card title="Mutuelle Santé (CPMS)" icon={<HeartHandshake size={20} />} className="bg-gradient-to-br from-white to-blue-50/30">
             <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="flex items-start gap-4">
                   <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                      <HeartHandshake size={32} />
                   </div>
                   <div>
                     <p className="font-bold text-lg text-slate-800">Couverture Collective</p>
                     <p className="text-sm text-slate-500 mb-2">Prise en charge à 50% par O2</p>
                     <div className="inline-block bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded-full">
                        Sans condition d'ancienneté
                     </div>
                   </div>
                </div>
                <div className="flex flex-col items-end">
                   <div className="text-right">
                      <span className="text-sm text-slate-400 font-medium">Votre part / mois</span>
                      <div className="flex items-baseline gap-1">
                         <span className="text-3xl font-extrabold text-[#11183b]">13,55</span>
                         <span className="text-lg font-bold text-[#11183b]">€</span>
                      </div>
                   </div>
                   <p className="text-[10px] text-slate-400 mt-1">Déduit du salaire</p>
                </div>
             </div>
        </Card>

       {/* 9. Majorations (Last) */}
       <Card title="Majorations Horaires" icon={<TrendingUp size={20} />} className="border-t-4 border-t-purple-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-teal-50 rounded-xl border border-teal-100 flex flex-col items-center text-center justify-center">
               <span className="text-xs font-bold text-slate-500 uppercase mb-1">Dimanche & Nuit</span>
               <span className="text-2xl font-black text-teal-600">+ 10%</span>
               <span className="text-[10px] text-slate-400">du taux horaire</span>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 flex flex-col items-center text-center justify-center">
               <span className="text-xs font-bold text-slate-500 uppercase mb-1">Heures Compl.</span>
               <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-purple-600">10%</span>
                  <span className="text-xs text-purple-400">à</span>
                  <span className="text-xl font-bold text-purple-600">25%</span>
               </div>
               <span className="text-[10px] text-slate-400">selon volume</span>
            </div>
            <div className="p-4 bg-[#11183b] rounded-xl text-white flex flex-col items-center text-center justify-center shadow-md relative overflow-hidden">
               <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full blur-xl -mr-8 -mt-8"></div>
               <span className="text-xs font-bold text-teal-100 uppercase mb-1">Jours Fériés</span>
               <span className="text-3xl font-black text-white">+ 100%</span>
               <span className="text-[10px] text-slate-400">Noël et 1er Mai chômés</span>
            </div>
          </div>
        </Card>
    </div>
  );
};