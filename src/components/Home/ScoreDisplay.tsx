import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  return (
    <div className="flex flex-col items-center justify-center my-8">
      <p className="text-blue-400 text-lg mb-2">Your Score</p>
      
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <motion.div 
          className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3,
            ease: 'easeInOut'
          }}
        />
        
        <div className="relative bg-blue-900/60 w-40 h-40 rounded-full flex items-center justify-center backdrop-blur-md border border-blue-700">
          <CountUp
            start={0}
            end={score}
            duration={2}
            separator=","
            className="text-4xl font-bold text-white"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ScoreDisplay;