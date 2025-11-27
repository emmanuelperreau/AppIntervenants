import React, { useState } from 'react';
import { Tab } from './types';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HomeSection } from './components/sections/HomeSection';
import { MoneySection } from './components/sections/MoneySection';
import { DailySection } from './components/sections/DailySection';
import { AdminSection } from './components/sections/AdminSection';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.HOME:
        return <HomeSection onNavigate={setActiveTab} />;
      case Tab.MONEY:
        return <MoneySection />;
      case Tab.DAILY:
        return <DailySection />;
      case Tab.ADMIN:
        return <AdminSection />;
      default:
        return <HomeSection onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/80 text-slate-900 pb-24 md:pb-10 font-sans antialiased">
      <Header />
      
      {/* Main Container - Responsive Width */}
      <main className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
        {renderContent()}
      </main>

      <Navigation currentTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default App;