import { Suspense } from 'react';

import HeroSection, { HeroSectionSkeleton } from '../../components/HeroSection';
import ListSkeleton from '../../components/ListSkeleton';
import MoviesList from '../../components/MoviesList';

const MoviesPage = () => {
  return (
    <>
      <Suspense fallback={<HeroSectionSkeleton />}>
        <HeroSection slug="movies" />
      </Suspense>
      <Suspense fallback={<ListSkeleton />}>
        <MoviesList className="animate-slidein500 opacity-0" />
      </Suspense>
    </>
  );
};

export default MoviesPage;
