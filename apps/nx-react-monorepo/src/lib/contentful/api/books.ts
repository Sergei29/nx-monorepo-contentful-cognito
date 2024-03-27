'use server';

import 'server-only';
/**
 * the "server-only" lib above will prevent these util fetching functions to be accidentially called from client components
 * which may expose our cms api urls on the browser ( which may be a security risk )
 */

import type {
  CollectionIdsResponse,
  BookByIdResponse,
  BooksCollectionResponse,
  BookDetails,
  BookSummary,
} from '../../../types';

import { CONTENT_TYPE } from '../../../constants';
import { getBookById, getBooksIds, getBooksCollection } from '../queries';
import { formatBooksList, formatBookDetailsEntry } from '../adapters';
import { fetchGraphqlApi } from '../utils';

export const fetchBookDetails = async (
  bookId: string
): Promise<[BookDetails, null] | [null, string]> => {
  const [bookFound, bookFoundError] = await fetchGraphqlApi<BookByIdResponse>({
    query: getBookById(bookId),
    options: {
      next: {
        tags: [CONTENT_TYPE.BOOKS],
      },
    },
  });

  if (!bookFound) {
    return [null, bookFoundError];
  }

  const [bookFormatted, errorFormat] = formatBookDetailsEntry(bookFound);

  if (errorFormat || !bookFormatted) {
    return [null, errorFormat];
  }

  return [bookFormatted, null];
};

export const fetchBookPageParams = async (): Promise<
  [{ bookId: string }[], null] | [null, string]
> => {
  const [bookIds, bookIdsError] = await fetchGraphqlApi<
    CollectionIdsResponse<'booksCollection'>
  >({
    query: getBooksIds(),
  });

  if (!bookIds?.data) {
    return [null, bookIdsError || 'No data'];
  }

  const paths = bookIds.data.booksCollection.items.map(({ sys }) => ({
    bookId: sys.id,
  }));

  return [paths, null];
};

export const fetchBooksList = async (): Promise<
  [BookSummary[], null] | [null, string]
> => {
  const [booksList, booksListError] =
    await fetchGraphqlApi<BooksCollectionResponse>({
      query: getBooksCollection(),
      options: {
        next: {
          tags: [CONTENT_TYPE.BOOKS],
        },
      },
    });

  if (!booksList) {
    return [null, booksListError];
  }

  const [booksFormatted, errorFormat] = formatBooksList(booksList);

  if (errorFormat || !booksFormatted) {
    return [null, errorFormat];
  }

  return [booksFormatted, null];
};
