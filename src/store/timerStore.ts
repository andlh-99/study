import { create } from 'zustand';
import { TimerState } from '../types/app';
import { saveStudySession } from '../lib/supabase';

interface TimerStore extends TimerState {
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  handleVisibilityChange: () => void;
  saveSession: (userId: number) => Promise<boolean>;
  isInBackground: boolean;
}

export const useTimerStore = create<TimerStore>((set, get) => ({
  isRunning: false,
  elapsedTime: 0,
  startTime: null,
  isInBackground: false,
  
  startTimer: () => {
    set({
      isRunning: true,
      startTime: Date.now() - (get().elapsedTime || 0)
    });
  },
  
  stopTimer: () => {
    const { isRunning, startTime } = get();
    
    if (isRunning && startTime) {
      set({
        isRunning: false,
        elapsedTime: Date.now() - startTime
      });
    }
  },
  
  resetTimer: () => {
    set({
      isRunning: false,
      elapsedTime: 0,
      startTime: null
    });
  },
  
  handleVisibilityChange: () => {
    const { isRunning } = get();
    
    if (document.hidden) {
      set({ isInBackground: true });
      
      if (isRunning) {
        get().stopTimer();
      }
    } else {
      set({ isInBackground: false });
    }
  },
  
  saveSession: async (userId) => {
    const { elapsedTime } = get();
    const durationInSeconds = Math.floor(elapsedTime / 1000);
    
    if (durationInSeconds < 30) {
      // Don't save sessions shorter than 30 seconds
      return false;
    }
    
    return await saveStudySession(userId, durationInSeconds);
  }
}));