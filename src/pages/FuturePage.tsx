import React from 'react';
import ComingSoon from '../components/Future/ComingSoon';
import PageTransition from '../components/Layout/PageTransition';

interface FuturePageProps {
  isVisible: boolean;
}

const FuturePage: React.FC<FuturePageProps> = ({ isVisible }) => {
  return (
    <PageTransition isVisible={isVisible} id="future-page">
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 pt-6 pb-20 px-4">
        <div className="flex flex-col items-center justify-center flex-1">
          <ComingSoon />
        </div>
      </div>
    </PageTransition>
  );
};

export default FuturePage;