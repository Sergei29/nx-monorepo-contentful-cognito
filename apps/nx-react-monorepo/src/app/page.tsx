import { Suspense } from 'react';

import HeroSectionsList from '../components/HeroSectionsList';
import HeroSection, { HeroSectionSkeleton } from '../components/HeroSection';

const HomePage = () => {
  return (
    <>
      <Suspense fallback={<HeroSectionSkeleton />}>
        <HeroSection slug="home" />
      </Suspense>
      <Suspense fallback="Loading...">
        <HeroSectionsList className="animate-slidein500 opacity-0" />
      </Suspense>
    </>
  );
};

export default HomePage;
