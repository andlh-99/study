import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  isVisible: boolean;
  id: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  isVisible,
  id 
}) => {
  const variants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={id}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ type: 'tween', duration: 0.3 }}
          className="absolute inset-0 overflow-y-auto"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;