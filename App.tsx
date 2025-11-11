
import React from 'react';
import HeroSection from './components/HeroSection';
import ObjectivesSection from './components/ObjectivesSection';
import WhySection from './components/WhySection';
import TechStackSection from './components/TechStackSection';
import KeyIndicatorsSection from './components/KeyIndicatorsSection';
import MethodSection from './components/MethodSection';
import ScreensSection from './components/ScreensSection';
import GoalsManagementSection from './components/GoalsManagementSection';
import ChatbotSection from './components/ChatbotSection';
import BackendSection from './components/BackendSection';

const App: React.FC = () => {
  return (
    <main className="text-slate-800 font-sans">
      <HeroSection />
      <ObjectivesSection />
      <WhySection />
      <TechStackSection />
      <KeyIndicatorsSection />
      <MethodSection />
      <ScreensSection />
      <GoalsManagementSection />
      <ChatbotSection />
      <BackendSection />
    </main>
  );
};

export default App;
