import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { useTimerStore } from '../../store/timerStore';
import { useUserStore } from '../../store/userStore';

const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0')
  ].join(':');
};

const StudyTimer: React.FC = () => {
  const { 
    isRunning, 
    elapsedTime, 
    startTimer, 
    stopTimer, 
    handleVisibilityChange,
    saveSession
  } = useTimerStore();
  
  const { currentUser, updateUserScore } = useUserStore();
  const [displayTime, setDisplayTime] = useState('00:00:00');
  
  useEffect(() => {
    // Set up event listener for page visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);
  
  useEffect(() => {
    let interval: number;
    
    if (isRunning) {
      interval = window.setInterval(() => {
        const newElapsedTime = Date.now() - (useTimerStore.getState().startTime || 0);
        setDisplayTime(formatTime(newElapsedTime));
      }, 1000);
    } else {
      setDisplayTime(formatTime(elapsedTime));
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, elapsedTime]);
  
  const handleTimerToggle = async () => {
    if (isRunning) {
      stopTimer();
      
      if (currentUser) {
        const pointsEarned = Math.floor(elapsedTime / 1000 / 60); // 1 point per minute
        
        const success = await saveSession(currentUser.id);
        if (success) {
          updateUserScore(pointsEarned);
        }
      }
    } else {
      startTimer();
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <motion.div 
        className="relative w-64 h-64 my-8 flex items-center justify-center"
        animate={{ scale: isRunning ? [1, 1.02, 1] : 1 }}
        transition={{ 
          repeat: isRunning ? Infinity : 0, 
          duration: 2,
          ease: 'easeInOut' 
        }}
      >
        {/* Pulsing background circles */}
        {isRunning && (
          <>
            <motion.div 
              className="absolute inset-0 rounded-full bg-blue-500/10"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
                ease: 'easeInOut',
                delay: 0.5
              }}
            />
            <motion.div 
              className="absolute inset-0 rounded-full bg-blue-500/5"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4,
                ease: 'easeInOut'
              }}
            />
          </>
        )}
        
        {/* Main timer circle */}
        <div className="relative z-10 w-56 h-56 rounded-full bg-blue-900/70 flex flex-col items-center justify-center border-4 border-blue-700 shadow-lg">
          <div className="text-4xl font-bold text-white tracking-wider">
            {displayTime}
          </div>
          
          {!isRunning && elapsedTime > 0 && (
            <div className="mt-2 text-blue-300">
              Score: +{Math.floor(elapsedTime / 1000 / 60)}
            </div>
          )}
        </div>
      </motion.div>
      
      <motion.button
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
          isRunning 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-green-500 hover:bg-green-600'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleTimerToggle}
      >
        {isRunning ? (
          <Pause size={28} className="text-white" />
        ) : (
          <Play size={28} className="text-white ml-1" />
        )}
      </motion.button>
      
      <p className="mt-6 text-blue-300 text-center max-w-xs">
        {isRunning 
          ? 'Timer is running. The timer will pause automatically if you leave the app.'
          : 'Press play to start tracking your study time'}
      </p>
    </div>
  );
};

export default StudyTimer;