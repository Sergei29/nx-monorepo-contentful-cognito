'use server';

import 'server-only';
/**
 * the "server-only" lib above will prevent these util fetching functions to be accidentially called from client components
 * which may expose our cms api urls on the browser ( which may be a security risk )
 */

import type {
  HeroCollectionResponse,
  HeroType,
  HeroSummary,
} from '../../../types';

import { CONTENT_TYPE } from '../../../constants';
import { getHeroItemsByPathname, getHeroItemsCollection } from '../queries';
import { formatHeroEntry, formatHeroSectionsList } from '../adapters';
import { fetchGraphqlApi } from '../utils';

export const fetchHeroSectionDetails = async (
  pathname: string
): Promise<[HeroType, null] | [null, string]> => {
  const [heroCollectionFiltered, heroCollectionError] =
    await fetchGraphqlApi<HeroCollectionResponse>({
      query: getHeroItemsByPathname(pathname),
      options: {
        next: {
          tags: [CONTENT_TYPE.HERO],
        },
      },
    });

  if (!heroCollectionFiltered) {
    return [null, heroCollectionError];
  }
  if (!heroCollectionFiltered.data?.heroCollection.items.length) {
    return [null, 'no data'];
  }

  return [formatHeroEntry(heroCollectionFiltered), null];
};

export const fetchHeroItemsList = async (): Promise<
  [HeroSummary[], null] | [null, string]
> => {
  const [heroList, heroListError] =
    await fetchGraphqlApi<HeroCollectionResponse>({
      query: getHeroItemsCollection(),
      options: {
        next: {
          tags: [CONTENT_TYPE.HERO],
        },
      },
    });

  if (!heroList) {
    return [null, heroListError];
  }

  return [formatHeroSectionsList(heroList), null];
};
