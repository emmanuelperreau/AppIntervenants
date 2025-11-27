import React from 'react';
import { Card } from '../ui/Card';
import { Briefcase, Calendar, Phone, Award, Heart, Shield, Smile, ArrowRight } from 'lucide-react';
import { AGENCY_NAME, AGENCY_ADDRESS, AGENCY_PHONE } from '../../constants';
import { Tab } from '../../types';

interface HomeSectionProps {
  onNavigate?: (tab: Tab) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Hero Welcome Header */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[180px] flex flex-col justify-center">
        {/* Background with abstract gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#11183b] via-[#2d3b6e] to-[#009688]"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-teal-400/20 rounded-full blur-2xl -ml-10 -mb-10"></div>
        
        <div className="relative z-10 p-8 text-white">
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Bonjour,</h1>
          <p className="text-teal-50 text-base mb-6 font-light max-w-md">
            Bienvenue sur votre espace intervenant. Retrouvez l'essentiel de vos informations RH et avantages.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Shortcuts */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-[#11183b] font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-teal-500 rounded-full"></span>
              Accès Rapide
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button 
                onClick={() => onNavigate && onNavigate(Tab.ADMIN)}
                className="group bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-3 hover:shadow-md hover:border-teal-200 transition-all active:scale-95"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-[#11183b] group-hover:bg-[#11183b] group-hover:text-white transition-colors">
                  <Calendar size={24} />
                </div>
                <span className="text-sm font-bold text-slate-700">Poser Congés</span>
              </button>
              
              <button 
                className="group bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-3 hover:shadow-md hover:border-teal-200 transition-all active:scale-95"
                onClick={() => onNavigate && onNavigate(Tab.DAILY)}
              >
                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <Briefcase size={24} />
                </div>
                <span className="text-sm font-bold text-slate-700">Mon Quotidien</span>
              </button>
               
               <a 
                 href={`tel:${AGENCY_PHONE.replace(/\s/g, '')}`}
                 className="group bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-3 hover:shadow-md hover:border-teal-200 transition-all active:scale-95"
                >
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <Phone size={24} />
                </div>
                <span className="text-sm font-bold text-slate-700">Appeler</span>
              </a>

              <button 
                onClick={() => onNavigate && onNavigate(Tab.MONEY)}
                className="group bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-3 hover:shadow-md hover:border-teal-200 transition-all active:scale-95"
              >
                <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Award size={24} />
                </div>
                <span className="text-sm font-bold text-slate-700">Mes Avantages</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Values */}
        <div className="lg:col-span-1">
           <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-full">
              <h3 className="font-bold text-[#11183b] mb-4 flex items-center gap-2">
                 <Heart className="text-teal-500 fill-teal-500" size={18}/> Nos Valeurs
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-50 p-2 rounded-lg text-[#11183b]"><Shield size={20}/></div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Respect</p>
                    <p className="text-xs text-slate-500">Le respect des clients et des collègues.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-slate-50 p-2 rounded-lg text-[#11183b]"><Award size={20}/></div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Excellence</p>
                    <p className="text-xs text-slate-500">Le goût du travail bien fait et de l'amélioration continue.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-slate-50 p-2 rounded-lg text-[#11183b]"><Smile size={20}/></div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Attitude Positive</p>
                    <p className="text-xs text-slate-500">Le sourire, fournisseur de confort</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-slate-50 p-2 rounded-lg text-[#11183b]"><Heart size={20}/></div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Esprit d'équipe</p>
                    <p className="text-xs text-slate-500">Communication & Entraide</p>
                  </div>
                </div>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
};