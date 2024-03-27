import type {
  AssetImage,
  ImageType,
  HeroType,
  HeroSummary,
  HeroCollectionResponse,
  BooksCollectionResponse,
  BookByIdResponse,
  BookDetails,
  BookSummary,
  MovieByIdResponse,
  MoviesCollectionResponse,
  MovieDetails,
  MovieSummary,
  GameByIdResponse,
  GamesCollectionResponse,
  GameDetails,
  GameSummary,
} from '../../types';

import * as schema from '../schema/contentful';

import { getErrorMessage } from '../common';

export const formatImageAsset = ({
  sys,
  title,
  url,
  width,
  height,
}: AssetImage): ImageType =>
  schema.imageSchema.parse({
    id: sys.id,
    alt: title,
    href: url,
    width,
    height,
  });

export const formatHeroEntry = (
  apiResponse: HeroCollectionResponse
): [HeroType, null] | [null, string] => {
  try {
    const hero = schema.heroSchema.parse({
      ...apiResponse.data?.heroCollection?.items[0],
      id: apiResponse.data?.heroCollection?.items[0]?.sys?.id,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      image: formatImageAsset(apiResponse.data!.heroCollection.items[0].image),
    });
    return [hero, null];
  } catch (error) {
    return [null, getErrorMessage(error)];
  }
};

export const formatHeroSectionsList = (
  apiResponse: HeroCollectionResponse
): [HeroSummary[], null] | [null, string] => {
  try {
    const hero = // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      apiResponse.data!.heroCollection.items.map(
        ({ sys, image, ...restHeroFields }) =>
          schema.heroSummarySchema.parse({
            ...restHeroFields,
            id: sys.id,
            image: formatImageAsset(image),
          })
      );

    return [hero, null];
  } catch (error) {
    return [null, getErrorMessage(error)];
  }
};

export const formatBookDetailsEntry = (
  apiResponse: BookByIdResponse
): [BookDetails, null] | [null, string] => {
  try {
    const book = schema.bookDatailsSchema.parse({
      ...apiResponse.data?.books,
      id: apiResponse.data?.books?.sys?.id,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      image: formatImageAsset(apiResponse.data!.books?.image),
    });

    return [book, null];
  } catch (error) {
    return [null, getErrorMessage(error)];
  }
};

export const formatBooksList = (
  apiResponse: BooksCollectionResponse
): [BookSummary[], null] | [null, string] => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const books = apiResponse.data!.booksCollection.items.map(
      ({ sys, image, ...restBookFields }) =>
        schema.bookSummarySchema.parse({
          ...restBookFields,
          id: sys.id,
          image: formatImageAsset(image),
        })
    );

    return [books, null];
  } catch (error) {
    return [null, getErrorMessage(error)];
  }
};

export const formatMovieDetailsEntry = (
  apiResponse: MovieByIdResponse
): [MovieDetails, null] | [null, string] => {
  try {
    const movie = schema.movieDatailsSchema.parse({
      ...apiResponse.data?.movies,
      id: apiResponse.data?.movies?.sys?.id,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      image: formatImageAsset(apiResponse.data!.movies?.image),
    });

    return [movie, null];
  } catch (error) {
    return [null, getErrorMessage(error)];
  }
};

export const formatMoviesList = (
  apiResponse: MoviesCollectionResponse
): [MovieSummary[], null] | [null, string] => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const movies = apiResponse.data!.moviesCollection.items.map(
      ({ sys, image, ...restOfMovie }) =>
        schema.movieSummarySchema.parse({
          ...restOfMovie,
          id: sys.id,
          image: formatImageAsset(image),
        })
    );

    return [movies, null];
  } catch (error) {
    return [null, getErrorMessage(error)];
  }
};

export const formatGameDetailsEntry = (
  apiResponse: GameByIdResponse
): [GameDetails, null] | [null, string] => {
  try {
    const game = schema.gameDetailsSchema.parse({
      ...apiResponse.data?.games,
      id: apiResponse.data?.games.sys.id,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      image: formatImageAsset(apiResponse.data!.games.image),
    });

    return [game, null];
  } catch (error) {
    return [null, getErrorMessage(error)];
  }
};

export const formatGamesList = (
  apiResponse: GamesCollectionResponse
): [GameSummary[], null] | [null, string] => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const games = apiResponse.data!.gamesCollection.items.map(
      ({ sys, image, ...restGameFields }) =>
        schema.gameSummarySchema.parse({
          ...restGameFields,
          id: sys.id,
          image: formatImageAsset(image),
        })
    );

    return [games, null];
  } catch (error) {
    return [null, getErrorMessage(error)];
  }
};
