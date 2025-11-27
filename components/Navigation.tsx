import React from 'react';
import { Home, Euro, CalendarCheck, Phone } from 'lucide-react';
import { Tab } from '../types';

interface NavigationProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const IconWrapper = ({ children, active }: { children?: React.ReactNode; active: boolean }) => (
  <div className={`transition-transform duration-300 ${active ? 'scale-110' : ''}`}>
    {children}
  </div>
);

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onTabChange }) => {
  const getTabClass = (tab: Tab) => {
    const isActive = currentTab === tab;
    return `relative flex flex-col md:flex-row items-center justify-center w-full h-full md:space-x-2 space-y-1 md:space-y-0 transition-all duration-300 rounded-xl md:px-4 md:py-2 ${
      isActive 
        ? 'text-[#11183b] md:bg-blue-50' 
        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
    }`;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 pointer-events-none md:bottom-6">
      <div className="pointer-events-auto bg-white/90 backdrop-blur-lg border-t md:border border-slate-200 h-20 md:h-16 md:rounded-full md:shadow-2xl md:max-w-2xl mx-auto pb-safe md:pb-0">
        <div className="flex justify-around items-center h-full px-2 md:px-6">
          <button onClick={() => onTabChange(Tab.HOME)} className={getTabClass(Tab.HOME)}>
            <IconWrapper active={currentTab === Tab.HOME}>
              <Home size={24} strokeWidth={currentTab === Tab.HOME ? 2.5 : 2} />
            </IconWrapper>
            <span className="text-[10px] md:text-sm font-medium">Accueil</span>
          </button>
          
          <button onClick={() => onTabChange(Tab.DAILY)} className={getTabClass(Tab.DAILY)}>
            <IconWrapper active={currentTab === Tab.DAILY}>
              <CalendarCheck size={24} strokeWidth={currentTab === Tab.DAILY ? 2.5 : 2} />
            </IconWrapper>
            <span className="text-[10px] md:text-sm font-medium">Quotidien</span>
          </button>

          <button onClick={() => onTabChange(Tab.MONEY)} className={getTabClass(Tab.MONEY)}>
            <IconWrapper active={currentTab === Tab.MONEY}>
              <Euro size={24} strokeWidth={currentTab === Tab.MONEY ? 2.5 : 2} />
            </IconWrapper>
            <span className="text-[10px] md:text-sm font-medium">Paie</span>
          </button>
          
          <button onClick={() => onTabChange(Tab.ADMIN)} className={getTabClass(Tab.ADMIN)}>
            <IconWrapper active={currentTab === Tab.ADMIN}>
              <Phone size={24} strokeWidth={currentTab === Tab.ADMIN ? 2.5 : 2} />
            </IconWrapper>
            <span className="text-[10px] md:text-sm font-medium">Contacts</span>
          </button>
        </div>
      </div>
    </div>
  );
};