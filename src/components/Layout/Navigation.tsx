import React from 'react';
import { motion } from 'framer-motion';
import { Home, Clock, Sparkles } from 'lucide-react';

interface NavigationProps {
  currentPage: 'home' | 'timer' | 'future';
  onNavigate: (page: 'home' | 'timer' | 'future') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'timer', icon: <Clock size={24} />, label: 'Timer' },
    { id: 'home', icon: <Home size={24} />, label: 'Home' },
    { id: 'future', icon: <Sparkles size={24} />, label: 'Coming Soon' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-950 border-t border-blue-800 py-2 px-4 z-20">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
              currentPage === item.id 
                ? 'text-blue-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => onNavigate(item.id as any)}
          >
            <div className="relative">
              {item.icon}
              {currentPage === item.id && (
                <motion.div
                  className="absolute -bottom-2 left-1/2 w-1 h-1 bg-blue-400 rounded-full"
                  layoutId="navIndicator"
                  transition={{ type: 'spring', bounce: 0.5, duration: 0.6 }}
                />
              )}
            </div>
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;