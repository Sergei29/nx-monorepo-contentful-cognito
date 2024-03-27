import { Suspense } from 'react';

import HeroSection, { HeroSectionSkeleton } from '../../components/HeroSection';
import ListSkeleton from '../../components/ListSkeleton';
import BooksList from '../../components/BooksList';

const BooksPage = () => {
  return (
    <>
      <Suspense fallback={<HeroSectionSkeleton />}>
        <HeroSection slug="books" />
      </Suspense>
      <Suspense fallback={<ListSkeleton />}>
        <BooksList className="animate-slidein500 opacity-0" />
      </Suspense>
    </>
  );
};

export default BooksPage;
