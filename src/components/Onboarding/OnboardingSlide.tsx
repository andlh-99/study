import React from 'react';
import { motion } from 'framer-motion';

interface OnboardingSlideProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
}

const OnboardingSlide: React.FC<OnboardingSlideProps> = ({ 
  title, 
  description, 
  icon, 
  isActive 
}) => {
  return (
    <motion.div 
      className={`absolute inset-0 flex flex-col items-center justify-center p-6 ${isActive ? 'z-10' : 'z-0'}`}
      initial={{ opacity: 0, x: 100 }}
      animate={{ 
        opacity: isActive ? 1 : 0, 
        x: isActive ? 0 : 100,
        pointerEvents: isActive ? 'auto' : 'none'
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center max-w-md text-center">
        <div className="text-blue-400 mb-6 transform scale-150">
          {icon}
        </div>
        
        <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
        
        <p className="text-gray-300 mb-8">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default OnboardingSlide;