import { create } from 'zustand';
import { User, LeaderboardEntry, RankingType } from '../types/app';
import { getTelegramUser } from '../lib/telegram';
import { getUserStats, getLeaderboard } from '../lib/supabase';

interface UserState {
  currentUser: User | null;
  weeklyLeaderboard: LeaderboardEntry[];
  allTimeLeaderboard: LeaderboardEntry[];
  isFirstVisit: boolean;
  setIsFirstVisit: (value: boolean) => void;
  loadUser: () => Promise<void>;
  loadLeaderboards: () => Promise<void>;
  updateUserScore: (additionalScore: number) => void;
  selectedRanking: RankingType;
  setSelectedRanking: (type: RankingType) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  currentUser: null,
  weeklyLeaderboard: [],
  allTimeLeaderboard: [],
  isFirstVisit: localStorage.getItem('hasVisitedBefore') !== 'true',
  selectedRanking: 'allTime',
  
  setIsFirstVisit: (value) => {
    localStorage.setItem('hasVisitedBefore', (!value).toString());
    set({ isFirstVisit: value });
  },
  
  loadUser: async () => {
    const telegramUser = getTelegramUser();
    
    if (!telegramUser) {
      // Use mock data for development or when not in Telegram
      set({
        currentUser: {
          id: 12345,
          name: 'Demo User',
          photoUrl: 'https://via.placeholder.com/100',
          score: 1500,
          weeklyRank: 5,
          allTimeRank: 12
        }
      });
      return;
    }
    
    try {
      const stats = await getUserStats(telegramUser.id);
      
      set({
        currentUser: {
          id: telegramUser.id,
          name: telegramUser.name,
          photoUrl: telegramUser.photoUrl,
          score: stats?.score || 0,
          weeklyRank: stats?.weekly_rank,
          allTimeRank: stats?.all_time_rank
        }
      });
    } catch (error) {
      console.error('Failed to load user:', error);
    }
  },
  
  loadLeaderboards: async () => {
    try {
      const [weeklyData, allTimeData] = await Promise.all([
        getLeaderboard('weekly'),
        getLeaderboard('allTime')
      ]);
      
      set({
        weeklyLeaderboard: weeklyData,
        allTimeLeaderboard: allTimeData
      });
    } catch (error) {
      console.error('Failed to load leaderboards:', error);
    }
  },
  
  updateUserScore: (additionalScore) => {
    const { currentUser } = get();
    if (!currentUser) return;
    
    set({
      currentUser: {
        ...currentUser,
        score: currentUser.score + additionalScore
      }
    });
  },
  
  setSelectedRanking: (type) => set({ selectedRanking: type })
}));