import React from 'react';
import { User } from 'lucide-react';
import { User as UserType } from '../../types/app';

interface UserProfileProps {
  user: UserType | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  if (!user) return null;

  return (
    <div className="flex items-center bg-blue-900/30 p-4 rounded-lg backdrop-blur-sm">
      <div className="w-14 h-14 rounded-full overflow-hidden bg-blue-800 flex items-center justify-center mr-4">
        {user.photoUrl ? (
          <img 
            src={user.photoUrl} 
            alt={user.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <User size={28} className="text-blue-400" />
        )}
      </div>
      
      <div>
        <h2 className="text-xl font-semibold text-white">{user.name}</h2>
        <p className="text-blue-300 text-sm">
          {user.allTimeRank ? `Rank #${user.allTimeRank}` : 'Not ranked yet'}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;