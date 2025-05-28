import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, User } from 'lucide-react';
import { LeaderboardEntry } from '../../types/app';

interface LeaderboardDisplayProps {
  entries: LeaderboardEntry[];
  currentUserId?: number;
}

const LeaderboardDisplay: React.FC<LeaderboardDisplayProps> = ({ 
  entries,
  currentUserId
}) => {
  const topThree = entries.slice(0, 3);
  const remaining = entries.slice(3);
  
  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy size={24} className="text-yellow-400" />;
      case 2:
        return <Medal size={24} className="text-gray-400" />;
      case 3:
        return <Medal size={24} className="text-amber-700" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Top 3 users */}
      {topThree.length > 0 && (
        <div className="flex justify-center items-end mb-8 mt-4 h-44">
          {topThree.map((entry, index) => {
            const order = [1, 0, 2]; // Center arrangement: 2nd, 1st, 3rd
            const user = topThree[order[index]];
            if (!user) return null;
            
            const heights = ['h-32', 'h-40', 'h-28'];
            const positions = ['self-end', '', 'self-end'];
            
            return (
              <motion.div
                key={user.id}
                className={`flex flex-col items-center mx-2 ${positions[index]}`}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <div className={`${heights[index]} w-20 flex flex-col items-center`}>
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-blue-800 flex items-center justify-center border-2 border-blue-600">
                      {user.photoUrl ? (
                        <img src={user.photoUrl} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <User size={28} className="text-blue-400" />
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-blue-700 rounded-full w-8 h-8 flex items-center justify-center border border-blue-500">
                      {getMedalIcon(user.rank)}
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-medium text-white truncate max-w-full">
                    {user.name}
                  </p>
                  <p className="text-blue-300 text-xs">
                    {user.score} points
                  </p>
                </div>
                <div className={`w-full h-8 rounded-t-lg ${
                  order[index] === 0 ? 'bg-yellow-500' : 
                  order[index] === 1 ? 'bg-gray-400' : 'bg-amber-700'
                }`}>
                  <span className="flex justify-center items-center h-full text-white font-bold">
                    #{user.rank}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
      
      {/* Remaining leaderboard entries */}
      <div className="space-y-2">
        {remaining.map((entry, index) => (
          <motion.div
            key={entry.id}
            className={`flex items-center p-3 rounded-lg ${
              entry.id === currentUserId 
                ? 'bg-blue-700/50 border border-blue-500' 
                : 'bg-blue-900/30'
            }`}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.05 * index, duration: 0.3 }}
          >
            <div className="w-6 text-center font-medium text-blue-300">
              {entry.rank}
            </div>
            
            <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-800 mx-3 flex items-center justify-center">
              {entry.photoUrl ? (
                <img src={entry.photoUrl} alt={entry.name} className="w-full h-full object-cover" />
              ) : (
                <User size={20} className="text-blue-400" />
              )}
            </div>
            
            <div className="flex-grow">
              <p className="font-medium text-white">{entry.name}</p>
            </div>
            
            <div className="text-blue-300 font-medium">
              {entry.score}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardDisplay;