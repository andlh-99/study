export interface User {
  id: number;
  name: string;
  photoUrl?: string;
  score: number;
  weeklyRank?: number;
  allTimeRank?: number;
}

export interface LeaderboardEntry {
  id: number;
  name: string;
  photoUrl?: string;
  score: number;
  rank: number;
}

export interface TimerState {
  isRunning: boolean;
  elapsedTime: number;
  startTime: number | null;
}

export type RankingType = 'weekly' | 'allTime';