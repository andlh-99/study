import React from 'react';
import StudyTimer from '../components/Timer/StudyTimer';
import PageTransition from '../components/Layout/PageTransition';

interface TimerPageProps {
  isVisible: boolean;
}

const TimerPage: React.FC<TimerPageProps> = ({ isVisible }) => {
  return (
    <PageTransition isVisible={isVisible} id="timer-page">
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-800 to-blue-950 pt-6 pb-20 px-4">
        <div className="flex flex-col items-center justify-center flex-1">
          <h1 className="text-2xl font-bold text-white mb-4">Study Timer</h1>
          
          <div className="relative w-full max-w-sm">
            {/* Decorative background elements */}
            <div className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-blue-500/10 blur-xl" />
            <div className="absolute bottom-1/4 right-1/3 w-16 h-16 rounded-full bg-blue-400/10 blur-xl" />
            
            <StudyTimer />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default TimerPage;