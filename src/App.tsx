import React, { useEffect, useState } from 'react';
import { setupTelegramApp } from './lib/telegram';
import { useUserStore } from './store/userStore';
import Onboarding from './components/Onboarding/Onboarding';
import Navigation from './components/Layout/Navigation';
import HomePage from './pages/HomePage';
import TimerPage from './pages/TimerPage';
import FuturePage from './pages/FuturePage';

type Page = 'home' | 'timer' | 'future';

function App() {
  const { isFirstVisit } = useUserStore();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  
  useEffect(() => {
    // Setup Telegram Web App
    setupTelegramApp();
  }, []);
  
  return (
    <div className="relative min-h-screen bg-blue-950 text-white overflow-hidden">
      {/* Background gradient and decoration */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-blue-950" />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute top-3/4 left-1/4 w-60 h-60 bg-blue-600/5 rounded-full blur-3xl" />
          <div className="absolute top-2/4 right-0 w-80 h-80 bg-blue-700/5 rounded-full blur-3xl" />
        </div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10">
        {isFirstVisit && <Onboarding />}
        
        <div className="relative min-h-screen">
          <HomePage isVisible={currentPage === 'home'} />
          <TimerPage isVisible={currentPage === 'timer'} />
          <FuturePage isVisible={currentPage === 'future'} />
        </div>
        
        <Navigation 
          currentPage={currentPage}
          onNavigate={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default App;