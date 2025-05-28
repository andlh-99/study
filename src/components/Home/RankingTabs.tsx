import React from 'react';
import { motion } from 'framer-motion';
import { RankingType } from '../../types/app';

interface RankingTabsProps {
  selectedTab: RankingType;
  onChange: (tab: RankingType) => void;
}

const RankingTabs: React.FC<RankingTabsProps> = ({ 
  selectedTab, 
  onChange 
}) => {
  const tabs = [
    { id: 'allTime' as RankingType, label: 'All Time' },
    { id: 'weekly' as RankingType, label: 'Weekly' }
  ];

  return (
    <div className="flex bg-blue-900/30 p-1 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`relative flex-1 py-2 text-center rounded-md ${
            selectedTab === tab.id ? 'text-white' : 'text-blue-300'
          }`}
          onClick={() => onChange(tab.id)}
        >
          {selectedTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-blue-700 rounded-md"
              transition={{ duration: 0.2 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default RankingTabs;