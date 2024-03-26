import { z } from 'zod';

import type { Document as RichTextDocument } from '@contentful/rich-text-types';

import {
  imageSchema,
  heroSchema,
  heroSummarySchema,
  bookDatailsSchema,
  bookSummarySchema,
  movieDatailsSchema,
  movieSummarySchema,
  gameDetailsSchema,
  gameSummarySchema,
} from '.././../lib/schema/contentful';

export type Asset = {
  sys: {
    id: string;
  };
  url: string;
  description: string;
};

export type AssetLink = {
  block: Asset[];
  hyperlink?: Asset[];
};

export type RichTextContent = {
  json: RichTextDocument;
  links: {
    assets: AssetLink;
  };
};

export type GraphqlError = {
  locations: { line: number; column: number }[];
  message: string;
};

type Entry = {
  sys: { id: string };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EntryList<I = Record<string, any>> = {
  items: I[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GraphqlApiResponse<OperationName extends string, D = any> = {
  data?:
    | {
        [P in OperationName]: D;
      }
    | null;
  errors?: GraphqlError[] | null;
};

export type CollectionIdsResponse<OperationName extends string> =
  GraphqlApiResponse<OperationName, EntryList<Entry>>;

export type AssetImage = Entry & {
  title: string;
  url: string;
  width: number;
  height: number;
};

export type HeroDetailsItem = Entry & {
  title: string;
  pathname: string;
  text: string;
  image: AssetImage;
};

export type HeroListItem = Entry & {
  title: string;
  pathname: string;
  image: AssetImage;
};

export type BookListItem = Entry & {
  title: string;
  author: string;
  image: AssetImage;
};

export type BookDetailsItem = Entry & {
  title: string;
  subTitle: string;
  author: string;
  about: {
    json: RichTextDocument;
  };
  image: AssetImage;
};

export type MovieListItem = Entry & {
  title: string;
  subTitle: string;
  image: AssetImage;
};
export type MovieDetailsItem = Entry & {
  title: string;
  subTitle: string;
  genre: string;
  cast: string;
  videoUrl?: string;
  description: {
    json: RichTextDocument;
  };
  image: AssetImage;
};
export type GameListItem = Entry & {
  title: string;
  subTitle: string;
  image: AssetImage;
};

export type GameDetailsItem = Entry & {
  title: string;
  subTitle: string;
  genre: string;
  videoUrl?: string;
  description: {
    json: RichTextDocument;
  };
  image: AssetImage;
};

export type HeroCollectionResponse = GraphqlApiResponse<
  'heroCollection',
  EntryList<HeroListItem>
>;

export type BooksCollectionResponse = GraphqlApiResponse<
  'booksCollection',
  EntryList<BookListItem>
>;
export type BookByIdResponse = GraphqlApiResponse<'books', BookDetailsItem>;

export type MoviesCollectionResponse = GraphqlApiResponse<
  'moviesCollection',
  EntryList<MovieListItem>
>;
export type MovieByIdResponse = GraphqlApiResponse<'movies', MovieDetailsItem>;

export type GamesCollectionResponse = GraphqlApiResponse<
  'gamesCollection',
  EntryList<GameListItem>
>;
export type GameByIdResponse = GraphqlApiResponse<'games', GameDetailsItem>;

export type ImageType = z.infer<typeof imageSchema>;
export type MovieDetails = z.infer<typeof movieDatailsSchema>;
export type MovieSummary = z.infer<typeof movieSummarySchema>;
export type HeroType = z.infer<typeof heroSchema>;
export type HeroSummary = z.infer<typeof heroSummarySchema>;
export type BookDetails = z.infer<typeof bookDatailsSchema>;
export type BookSummary = z.infer<typeof bookSummarySchema>;
export type GameDetails = z.infer<typeof gameDetailsSchema>;
export type GameSummary = z.infer<typeof gameSummarySchema>;
