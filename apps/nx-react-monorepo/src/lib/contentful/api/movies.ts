'use server';

import 'server-only';
/**
 * the "server-only" lib above will prevent these util fetching functions to be accidentially called from client components
 * which may expose our cms api urls on the browser ( which may be a security risk )
 */

import type {
  MoviesCollectionResponse,
  MovieByIdResponse,
  CollectionIdsResponse,
  MovieSummary,
  MovieDetails,
} from '../../../types';

import { CONTENT_TYPE } from '../../../constants';
import { getMovieById, getMoviesIds, getMoviesCollection } from '../queries';
import { formatMovieDetailsEntry, formatMoviesList } from '../adapters';
import { fetchGraphqlApi } from '../utils';

export const fetchMoviesList = async (): Promise<
  [MovieSummary[], null] | [null, string]
> => {
  const [moviesCollection, moviesConnectionError] =
    await fetchGraphqlApi<MoviesCollectionResponse>({
      query: getMoviesCollection(),
      options: {
        next: {
          tags: [CONTENT_TYPE.MOVIES],
        },
      },
    });

  if (!moviesCollection) {
    return [null, moviesConnectionError];
  }

  return [formatMoviesList(moviesCollection), null];
};

export const fetchMovieById = async (
  movieId: string
): Promise<[MovieDetails, null] | [null, string]> => {
  const [movieFound, movieFoundError] =
    await fetchGraphqlApi<MovieByIdResponse>({
      query: getMovieById(movieId),
      options: {
        next: {
          tags: [CONTENT_TYPE.MOVIES],
        },
      },
    });

  if (!movieFound) {
    return [null, movieFoundError];
  }

  return [formatMovieDetailsEntry(movieFound), null];
};

export const fetchMoviePageParams = async (): Promise<
  [{ movieId: string }[], null] | [null, string]
> => {
  const [movieIds, movieIdsError] = await fetchGraphqlApi<
    CollectionIdsResponse<'moviesCollection'>
  >({
    query: getMoviesIds(),
  });

  if (!movieIds?.data) {
    return [null, 'no data'];
  }

  if (movieIdsError) {
    return [null, movieIdsError];
  }

  const paths = movieIds.data.moviesCollection.items.map(({ sys }) => ({
    movieId: sys.id,
  }));

  return [paths, null];
};
