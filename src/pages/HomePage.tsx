import React, { useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import UserProfile from '../components/Home/UserProfile';
import ScoreDisplay from '../components/Home/ScoreDisplay';
import RankingTabs from '../components/Home/RankingTabs';
import LeaderboardDisplay from '../components/Home/LeaderboardDisplay';
import PageTransition from '../components/Layout/PageTransition';

interface HomePageProps {
  isVisible: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ isVisible }) => {
  const { 
    currentUser, 
    weeklyLeaderboard, 
    allTimeLeaderboard,
    selectedRanking,
    setSelectedRanking,
    loadUser,
    loadLeaderboards
  } = useUserStore();
  
  useEffect(() => {
    if (isVisible) {
      loadUser();
      loadLeaderboards();
    }
  }, [isVisible, loadUser, loadLeaderboards]);
  
  const leaderboardData = selectedRanking === 'weekly' 
    ? weeklyLeaderboard 
    : allTimeLeaderboard;
  
  return (
    <PageTransition isVisible={isVisible} id="home-page">
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 pt-6 pb-20 px-4">
        {currentUser && (
          <>
            <UserProfile user={currentUser} />
            
            <ScoreDisplay score={currentUser.score} />
            
            <div className="mt-4 mb-6">
              <RankingTabs 
                selectedTab={selectedRanking}
                onChange={setSelectedRanking}
              />
            </div>
            
            <div className="flex-1">
              <LeaderboardDisplay 
                entries={leaderboardData}
                currentUserId={currentUser.id}
              />
            </div>
          </>
        )}
      </div>
    </PageTransition>
  );
};

export default HomePage;