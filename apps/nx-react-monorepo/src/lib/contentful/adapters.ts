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
): HeroType =>
  schema.heroSchema.parse({
    ...apiResponse.data?.heroCollection.items[0],
    id: apiResponse.data?.heroCollection.items[0].sys.id,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    image: formatImageAsset(apiResponse.data!.heroCollection.items[0].image),
  });

export const formatHeroSectionsList = (
  apiResponse: HeroCollectionResponse
): HeroSummary[] =>
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  apiResponse.data!.heroCollection.items.map(
    ({ sys, image, ...restHeroFields }) =>
      schema.heroSummarySchema.parse({
        ...restHeroFields,
        id: sys.id,
        image: formatImageAsset(image),
      })
  );

export const formatBookDetailsEntry = (
  apiResponse: BookByIdResponse
): BookDetails =>
  schema.bookDatailsSchema.parse({
    ...apiResponse.data?.books,
    id: apiResponse.data?.books.sys.id,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    image: formatImageAsset(apiResponse.data!.books.image),
  });

export const formatBooksList = (
  apiResponse: BooksCollectionResponse
): BookSummary[] =>
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  apiResponse.data!.booksCollection.items.map(
    ({ sys, image, ...restBookFields }) =>
      schema.bookSummarySchema.parse({
        ...restBookFields,
        id: sys.id,
        image: formatImageAsset(image),
      })
  );

export const formatMovieDetailsEntry = (
  apiResponse: MovieByIdResponse
): MovieDetails =>
  schema.movieDatailsSchema.parse({
    ...apiResponse.data?.movies,
    id: apiResponse.data?.movies.sys.id,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    image: formatImageAsset(apiResponse.data!.movies.image),
  });

export const formatMoviesList = (
  apiResponse: MoviesCollectionResponse
): MovieSummary[] =>
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  apiResponse.data!.moviesCollection.items.map(
    ({ sys, image, ...restOfMovie }) =>
      schema.movieSummarySchema.parse({
        ...restOfMovie,
        id: sys.id,
        image: formatImageAsset(image),
      })
  );

export const formatGameDetailsEntry = (
  apiResponse: GameByIdResponse
): GameDetails =>
  schema.gameDetailsSchema.parse({
    ...apiResponse.data?.games,
    id: apiResponse.data?.games.sys.id,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    image: formatImageAsset(apiResponse.data!.games.image),
  });

export const formatGamesList = (
  apiResponse: GamesCollectionResponse
): GameSummary[] =>
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  apiResponse.data!.gamesCollection.items.map(
    ({ sys, image, ...restGameFields }) =>
      schema.gameSummarySchema.parse({
        ...restGameFields,
        id: sys.id,
        image: formatImageAsset(image),
      })
  );
