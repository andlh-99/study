import React from 'react';
import { motion } from 'framer-motion';
import { LightbulbIcon, PenToolIcon as ToolIcon, BrainCircuitIcon } from 'lucide-react';

const features = [
  {
    icon: <LightbulbIcon size={32} className="text-yellow-400" />,
    title: 'Smart Study Tips',
    description: 'Get personalized study tips based on your habits and performance.'
  },
  {
    icon: <ToolIcon size={32} className="text-blue-400" />,
    title: 'Study Tools',
    description: 'Access advanced tools for better studying and improved retention.'
  },
  {
    icon: <BrainCircuitIcon size={32} className="text-purple-400" />,
    title: 'AI Study Assistant',
    description: 'Coming soon: AI-powered study assistant to help you study more effectively.'
  }
];

const ComingSoon: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-white mb-8">Coming Soon</h1>
      
      <div className="w-full max-w-md">
        <motion.div 
          className="bg-blue-900/30 rounded-xl p-6 backdrop-blur-sm border border-blue-800"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-blue-300 mb-6 text-center">
            We're working on exciting new features to enhance your study experience.
          </p>
          
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
              >
                <div className="mr-4 mt-1">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-8 p-4 bg-blue-950/50 rounded-lg border border-blue-800"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-center text-sm text-blue-300">
              Want to suggest a feature? Share your ideas with us in the Telegram group!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoon;