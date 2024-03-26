'use server';

import 'server-only';
/**
 * the "server-only" lib above will prevent these util fetching functions to be accidentially called from client components
 * which may expose our cms api urls on the browser ( which may be a security risk )
 */

import type {
  CollectionIdsResponse,
  GamesCollectionResponse,
  GameByIdResponse,
  GameDetails,
  GameSummary,
} from '../../../types';

import { CONTENT_TYPE } from '../../../constants';
import { getGameById, getGamesIds, getGamesCollection } from '../queries';
import { formatGameDetailsEntry, formatGamesList } from '../adapters';
import { fetchGraphqlApi } from '../utils';

export const fetchGameDetails = async (
  gameId: string
): Promise<[GameDetails, null] | [null, string]> => {
  const [gameFound, gameFoundError] = await fetchGraphqlApi<GameByIdResponse>({
    query: getGameById(gameId),
    options: {
      next: {
        tags: [CONTENT_TYPE.GAMES],
      },
    },
  });

  if (!gameFound) {
    return [null, gameFoundError];
  }

  return [formatGameDetailsEntry(gameFound), null];
};

export const fetchGamePageParams = async (): Promise<
  [{ gameId: string }[], null] | [null, string]
> => {
  const [gameIds, gameIdsError] = await fetchGraphqlApi<
    CollectionIdsResponse<'gamesCollection'>
  >({
    query: getGamesIds(),
  });

  if (!gameIds?.data) {
    return [null, gameIdsError || 'No data'];
  }

  const paths = gameIds.data.gamesCollection.items.map(({ sys }) => ({
    gameId: sys.id,
  }));

  return [paths, null];
};

export const fetchGamesList = async (): Promise<
  [GameSummary[], null] | [null, string]
> => {
  const [gamesList, gamesListError] =
    await fetchGraphqlApi<GamesCollectionResponse>({
      query: getGamesCollection(),
      options: {
        next: {
          tags: [CONTENT_TYPE.GAMES],
        },
      },
    });

  if (!gamesList) {
    return [null, gamesListError];
  }

  return [formatGamesList(gamesList), null];
};
