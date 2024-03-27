import { Suspense } from 'react';

import HeroSection, { HeroSectionSkeleton } from '../../components/HeroSection';
import ListSkeleton from '../../components/ListSkeleton';
import GamesList from '../../components/GamesList';

const GamesPage = async () => {
  return (
    <>
      <Suspense fallback={<HeroSectionSkeleton />}>
        <HeroSection slug="games" />
      </Suspense>
      <Suspense fallback={<ListSkeleton />}>
        <GamesList className="animate-slidein500 opacity-0" />
      </Suspense>
    </>
  );
};

export default GamesPage;
