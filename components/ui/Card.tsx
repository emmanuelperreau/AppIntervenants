import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  headerColor?: string; // Tailwind class like 'bg-blue-600'
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ title, children, className = "", icon, headerColor, noPadding = false }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full flex flex-col ${className}`}>
      {title && (
        <div className={`px-5 py-4 border-b border-slate-50 flex items-center gap-3 relative overflow-hidden ${headerColor ? headerColor : 'bg-gradient-to-r from-slate-50 to-white'}`}>
          {/* subtle pattern overlay for colored headers */}
          {headerColor && <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px]"></div>}
          
          <div className="relative z-10 flex items-center gap-3 w-full">
            {icon && (
              <div className={`p-2 rounded-xl shrink-0 ${headerColor ? 'bg-white/20 text-white backdrop-blur-sm shadow-sm' : 'bg-white shadow-sm text-[#11183b] border border-slate-100'}`}>
                {icon}
              </div>
            )}
            <h3 className={`font-bold text-base leading-tight ${headerColor ? 'text-white' : 'text-slate-800'}`}>
              {title}
            </h3>
          </div>
        </div>
      )}
      <div className={`flex-1 ${noPadding ? '' : 'p-5'}`}>
        {children}
      </div>
    </div>
  );
};