'use server';

import 'server-only';
/**
 * the "server-only" lib above will prevent these util fetching functions to be accidentially called from client components
 * which may expose our cms api urls on the browser ( which may be a security risk )
 */

import type {
  HeroCollectionResponse,
  HeroImageAssetResponse,
  HeroImageAsset,
  HeroType,
  HeroSummary,
} from '../../../types';

import { CONTENT_TYPE } from '../../../constants';
import {
  getHeroItemsByPathname,
  getHeroItemsCollection,
  getHeroBackgroundImage,
} from '../queries';
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

  const [heroFormatted, errorFormat] = formatHeroEntry(heroCollectionFiltered);

  if (errorFormat || !heroFormatted) {
    return [null, errorFormat];
  }

  return [heroFormatted, null];
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

  const [heroListFormatted, errorFormat] = formatHeroSectionsList(heroList);

  if (errorFormat || !heroListFormatted) {
    return [null, errorFormat];
  }

  return [heroListFormatted, null];
};

export const fetchHeroBackgroundImage = async (
  assetId: string
): Promise<[HeroImageAsset, null] | [null, string]> => {
  const [response, fetchErroor] = await fetchGraphqlApi<HeroImageAssetResponse>(
    {
      query: getHeroBackgroundImage(assetId),
      options: {
        next: {
          tags: [CONTENT_TYPE.ASSET],
        },
      },
    }
  );

  if (fetchErroor || !response?.data?.asset) {
    return [null, fetchErroor || 'no asset found'];
  }

  return [response.data.asset, null];
};
