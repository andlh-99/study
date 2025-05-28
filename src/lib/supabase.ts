import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveStudySession(userId: number, duration: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('study_sessions')
      .insert([{ user_id: userId, duration, created_at: new Date().toISOString() }]);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error saving study session:', error);
    return false;
  }
}

export async function getUserStats(userId: number) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('score, weekly_rank, all_time_rank')
      .eq('telegram_id', userId)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return null;
  }
}

export async function getLeaderboard(type: 'weekly' | 'allTime', limit = 10) {
  try {
    const column = type === 'weekly' ? 'weekly_score' : 'score';
    const { data, error } = await supabase
      .from('users')
      .select('telegram_id, name, photo_url, score, weekly_score')
      .order(column, { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    
    return data.map((user, index) => ({
      id: user.telegram_id,
      name: user.name,
      photoUrl: user.photo_url,
      score: type === 'weekly' ? user.weekly_score : user.score,
      rank: index + 1
    }));
  } catch (error) {
    console.error(`Error fetching ${type} leaderboard:`, error);
    return [];
  }
}

export async function updateUserScore(userId: number, additionalScore: number) {
  try {
    const { error } = await supabase
      .from('users')
      .update({ 
        score: supabase.raw(`score + ${additionalScore}`),
        weekly_score: supabase.raw(`weekly_score + ${additionalScore}`)
      })
      .eq('telegram_id', userId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating user score:', error);
    return false;
  }
}

export async function createOrUpdateUser(user: { 
  telegram_id: number;
  name: string;
  photo_url?: string;
}) {
  try {
    const { error } = await supabase
      .from('users')
      .upsert({
        telegram_id: user.telegram_id,
        name: user.name,
        photo_url: user.photo_url,
        score: 0,
        weekly_score: 0
      }, {
        onConflict: 'telegram_id'
      });
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error creating/updating user:', error);
    return false;
  }
}