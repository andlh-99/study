import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Shield, Users } from 'lucide-react';
import OnboardingSlide from './OnboardingSlide';
import { useUserStore } from '../../store/userStore';

const slidesData = [
  {
    title: 'Track Your Progress',
    description: 'We track your study time and rank you based on your performance to keep you motivated and focused on your goals.',
    icon: <Trophy size={48} />
  },
  {
    title: 'New Features Coming Soon',
    description: 'We\'re constantly working on new features to improve your studying experience. Stay tuned for exciting updates!',
    icon: <Clock size={48} />
  },
  {
    title: 'Fair and Transparent',
    description: 'Our app is designed to be fair and transparent. Cheating prevention mechanisms ensure everyone plays by the rules.',
    icon: <Shield size={48} />
  },
  {
    title: 'Part of 4YOU BAC',
    description: 'This app is part of the 4YOU BAC group, created by Askeladd to help students achieve their best.',
    icon: <Users size={48} />
  }
];

const Onboarding: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setIsFirstVisit } = useUserStore();
  
  const nextSlide = () => {
    if (currentSlide < slidesData.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };
  
  const previousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };
  
  const closeOnboarding = () => {
    setIsFirstVisit(false);
  };
  
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-900 to-blue-950 z-50 flex flex-col">
      <div className="relative flex-grow overflow-hidden">
        {slidesData.map((slide, index) => (
          <OnboardingSlide
            key={index}
            title={slide.title}
            description={slide.description}
            icon={slide.icon}
            isActive={currentSlide === index}
          />
        ))}
      </div>
      
      <div className="flex justify-between items-center p-6 border-t border-blue-800">
        <div className="flex space-x-2">
          {slidesData.map((_, index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full bg-blue-400"
              animate={{
                scale: currentSlide === index ? 1.5 : 1,
                opacity: currentSlide === index ? 1 : 0.5
              }}
            />
          ))}
        </div>
        
        <div className="flex space-x-4">
          {currentSlide > 0 && (
            <button
              className="px-4 py-2 text-blue-300 hover:text-white transition-colors"
              onClick={previousSlide}
            >
              Previous
            </button>
          )}
          
          {currentSlide < slidesData.length - 1 ? (
            <motion.button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextSlide}
            >
              Next
            </motion.button>
          ) : (
            <motion.button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={closeOnboarding}
            >
              Get Started
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;