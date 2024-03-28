import { notFound } from 'next/navigation';

import type { PageProps } from '../../../types';

import HeroSectionDetailsPage from '../../../components/HeroSection/HeroSectionDetailsPage';
import RichTextView from '../../../components/RichTextView';
import Comments from '../../../components/Comments';
import {
  fetchBookDetails,
  fetchBookPageParams,
} from '../../../lib/contentful/api/books';
import { paths } from '../../../lib/paths';

export const dynamicParams = true;

export const generateStaticParams = async () => {
  const [params, paramsError] = await fetchBookPageParams();

  if (paramsError) {
    console.warn('Book pages params generation error: ', paramsError);
  }

  return params || [];
};

const BookDetailsPage = async ({ params }: PageProps<{ bookId: string }>) => {
  const [book] = await fetchBookDetails(params.bookId);

  if (!book) {
    return notFound();
  }

  return (
    <>
      <HeroSectionDetailsPage
        title={book.title}
        subTitle={book.subTitle || ''}
        image={book.image}
        goBack={{
          pathname: paths.books(),
          name: 'back to books',
        }}
      >
        <p className="font-semibold text-indigo-800 ml-auto mr-4 mt-4">
          Author: {book.author}
        </p>
      </HeroSectionDetailsPage>
      <RichTextView content={book.about} className="max-w-5xl mx-auto my-8" />
      <Comments entryId={book.id} />
    </>
  );
};

export default BookDetailsPage;
