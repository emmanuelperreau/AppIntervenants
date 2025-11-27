import React from 'react';
import { Home, PhoneCall } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-xl z-40 border-b border-slate-200 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)]">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
         <div className="flex items-center gap-3 md:gap-4">
            {/* Custom Logo */}
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[#11183b] rounded-full text-white shadow-md border-2 border-teal-400 relative">
               <Home className="w-5 h-5 md:w-6 md:h-6 fill-white" />
               <div className="absolute -top-1 -right-1 w-4 h-4 bg-teal-500 border-2 border-white rounded-full"></div>
            </div>
            
            <div className="flex flex-col justify-center">
              <span className="text-[10px] text-teal-600 uppercase tracking-widest font-extrabold mb-0.5">Guide Intervenant</span>
              <h1 className="text-base md:text-lg font-bold text-[#11183b] leading-tight">O2 Nord Touraine</h1>
            </div>
         </div>
         
         {/* Quick Call Button Ligne Salariés */}
         <a 
           href="tel:0243724345"
           className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 px-3 py-2 rounded-xl border border-red-100 transition-all active:scale-95 shadow-sm"
         >
            <div className="bg-red-500 text-white p-1 rounded-full">
              <PhoneCall size={14} />
            </div>
            <div className="hidden sm:flex flex-col items-start leading-none">
              <span className="text-[10px] uppercase font-bold text-red-400">Urgence / Retard</span>
              <span className="text-xs font-bold">Ligne Salariés</span>
            </div>
            <span className="sm:hidden text-xs font-bold">Ligne Salariés</span>
         </a>
      </div>
    </header>
  );
};