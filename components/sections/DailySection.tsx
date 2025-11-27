import React from 'react';
import { Card } from '../ui/Card';
import { OBLIGATIONS, EQUIPMENT_LIST } from '../../constants';
import { 
  Smartphone, QrCode, Briefcase, 
  Shirt, Clock, PhoneCall, Gift, FileEdit, 
  UserCheck, HeartHandshake, Key, Lock, 
  AlertTriangle, BookOpen, Baby, Info, Ban, Users,
  HardHat, Footprints, ShieldCheck, CheckCircle
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  shirt: <Shirt size={20} />,
  clock: <Clock size={20} />,
  phone: <PhoneCall size={20} />,
  gift: <Gift size={20} />,
  'file-edit': <FileEdit size={20} />,
  'user-check': <UserCheck size={20} />,
  'heart-handshake': <HeartHandshake size={20} />,
  key: <Key size={20} />,
  lock: <Lock size={20} />,
  'alert-triangle': <AlertTriangle size={20} />,
  book: <BookOpen size={20} />,
  baby: <Baby size={20} />,
  ban: <Ban size={20} />,
  users: <Users size={20} />,
  vest: <ShieldCheck size={20} />,
  footprints: <Footprints size={20} />,
};

export const DailySection: React.FC = () => {
  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Column 1: Tools & Scan */}
        <div className="space-y-6 lg:col-span-1">
          <Card title="Téléphone & Pointage" icon={<Smartphone size={20} />} headerColor="bg-gradient-to-r from-[#11183b] to-[#1e2952]">
            <div className="space-y-5">
              {/* QR Code Scan Visual */}
              <div className="relative overflow-hidden bg-[#11183b] rounded-2xl p-5 shadow-lg text-white group">
                <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4">
                  <QrCode size={100} />
                </div>
                <div className="relative z-10 flex gap-4 items-center">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm border border-white/20">
                    <QrCode size={28} className="text-teal-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg leading-none">Scan</h4>
                    <span className="inline-block mt-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm animate-pulse">
                      OBLIGATOIRE
                    </span>
                  </div>
                </div>
                <p className="relative z-10 mt-4 text-xs text-slate-300 leading-relaxed">
                  À réaliser au début et à la fin de chaque intervention. Garantit le paiement de vos heures.
                </p>
              </div>
              
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-1">
                 <div className="bg-slate-50 rounded-lg p-3 mb-1">
                    <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                       <Smartphone size={16} className="text-teal-600"/> Usage Professionnel
                    </h4>
                 </div>
                 <div className="p-3 grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-blue-50/50 rounded-lg">
                       <span className="block font-bold text-blue-700 text-sm">Illimités</span>
                       <span className="text-slate-500 text-xs">Appels & SMS</span>
                    </div>
                    <div className="text-center p-2 bg-teal-50/50 rounded-lg">
                       <span className="block font-bold text-teal-700 text-sm">4 Go</span>
                       <span className="text-[10px] text-slate-500">Internet / mois</span>
                    </div>
                 </div>
                 <p className="text-[10px] text-slate-400 text-center p-2">Usage personnel autorisé</p>
              </div>

               {/* BON COMPORTEMENT - GREEN */}
               <div className="bg-[#00cba9] text-white p-4 rounded-xl shadow-md">
                  <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                     <CheckCircle size={16} className="text-white" />
                     Les bons comportements :
                  </h4>
                  <p className="text-xs leading-relaxed font-medium">
                     Le téléphone portable professionnel étant un outil de travail, vous devez toujours l'emporter avec vous en intervention (poche dédiée dans votre tablier), tout en veillant à ce que la batterie soit chargée.
                  </p>
               </div>
            </div>
          </Card>

          {/* New Card: Matériel */}
          <Card title="Mes Équipements" icon={<HardHat size={20} />} headerColor="bg-gradient-to-r from-orange-500 to-amber-500">
             <div className="grid grid-cols-2 gap-3">
               {EQUIPMENT_LIST.map((item, idx) => (
                 <div key={idx} className="bg-orange-50/50 p-3 rounded-xl border border-orange-100 flex flex-col items-center text-center gap-2 hover:bg-orange-100/50 transition-colors">
                    <div className="bg-white p-2 rounded-full shadow-sm text-orange-500">
                       {iconMap[item.icon] || <Shirt size={20}/>}
                    </div>
                    <span className="text-xs font-bold text-slate-700 leading-tight">{item.name}</span>
                 </div>
               ))}
             </div>
             <p className="text-[10px] text-slate-400 text-center mt-4">
               Matériel fourni par l'agence. À porter <span className="font-bold text-orange-600 uppercase">obligatoirement</span>.
             </p>
          </Card>
        </div>

        {/* Column 2: Documents & Obligations */}
        <div className="space-y-6 md:col-span-1 lg:col-span-2">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Fiche de Route */}
             <Card title="Fiche de Route" icon={<Briefcase size={20} />} headerColor="bg-gradient-to-r from-emerald-500 to-teal-500">
                <div className="space-y-3">
                   <p className="text-xs text-slate-600 mb-2">Disponible dans le <span className="font-bold">cahier de liaison</span> et sur l'app <span className="font-bold">O2 et moi</span>. Liste les tâches pour satisfaire le client.</p>
                   
                   {/* BON COMPORTEMENT - ORANGE */}
                   <div className="bg-[#ee9572] text-white p-4 rounded-xl shadow-sm">
                     <h4 className="font-bold text-sm mb-1">Les bons comportements :</h4>
                     <p className="text-xs leading-relaxed">
                        Si vous vous rendez compte que la fiche de route n'est plus à jour ou qu'il manque des informations, il est <span className="font-bold underline">impératif</span> d'informer votre agence pour que le document soit rectifié.
                     </p>
                   </div>
                </div>
             </Card>

             {/* Cahier de Liaison */}
             <Card title="Cahier de Liaison" icon={<BookOpen size={20} />} headerColor="bg-gradient-to-r from-pink-500 to-rose-500">
                <div className="space-y-3">
                   <p className="text-xs text-slate-600 mb-2">Essentiel pour les échanges. Permet au client de lister les priorités et à vous de communiquer les infos.</p>
                   
                   {/* BON COMPORTEMENT - PINK */}
                   <div className="bg-[#c2185b] text-white p-4 rounded-xl shadow-sm">
                     <h4 className="font-bold text-sm mb-1">Les bons comportements :</h4>
                     <p className="text-xs leading-relaxed">
                        Il est obligatoire que vous complétiez le cahier de liaison à la fin de chaque prestation. N'oubliez pas d'ajouter une formule de politesse (bon week-end, bonne semaine...).
                     </p>
                   </div>
                </div>
             </Card>
          </div>

          <Card title="Code de Conduite & Obligations" icon={<Info size={20} />} headerColor="bg-gradient-to-r from-teal-600 to-teal-500">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {OBLIGATIONS.map((obl, idx) => (
                <div key={idx} className="group bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-300 flex flex-col items-center text-center gap-3 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 shadow-inner group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                    {iconMap[obl.icon]}
                  </div>
                  <p className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors leading-snug">{obl.text}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};