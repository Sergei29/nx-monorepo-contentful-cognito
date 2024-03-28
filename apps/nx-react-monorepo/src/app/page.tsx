import { Suspense } from 'react';

import HeroSectionsList from '../components/HeroSectionsList';
import HeroSection, { HeroSectionSkeleton } from '../components/HeroSection';
import { HERO_BG_ASSET_ID } from '../constants';

const HomePage = () => {
  return (
    <>
      <Suspense fallback={<HeroSectionSkeleton />}>
        <HeroSection slug="home" backgroundImageId={HERO_BG_ASSET_ID.HOME} />
      </Suspense>
      <Suspense fallback="Loading...">
        <HeroSectionsList className="animate-slidein500 opacity-0" />
      </Suspense>
    </>
  );
};

export default HomePage;
