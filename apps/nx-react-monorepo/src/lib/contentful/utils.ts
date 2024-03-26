import type { GraphqlError } from '../../types';

import { getErrorMessage } from '../common';
import { env } from '../env';

const getApiBaseUrl = () => {
  return `${env.CONTENTFUL_DELIVERY_API_BASE_URL}/spaces/${env.CONTENTFUL_SPACE_ID}/environments/${env.CONTENTFUL_ENVIRONMENT_ID}`;
};

export const getRequestOptions = ({
  isPreview = false,
}: { isPreview?: boolean } = {}): RequestInit => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${
        isPreview
          ? env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
          : env.CONTENTFUL_ACCESS_TOKEN
      }`,
    },
  };
};

export const fetchGraphqlApi = async <D = unknown>({
  query,
  options,
  isPreview,
}: {
  query: string;
  options?: RequestInit;
  isPreview?: boolean;
}): Promise<[D, null] | [null, string]> => {
  try {
    const apiUrl = getApiBaseUrl();
    const permanentOptions = getRequestOptions({ isPreview });

    const res = await fetch(apiUrl, {
      ...options,
      ...permanentOptions,
      headers: {
        ...options?.headers,
        ...permanentOptions.headers,
      },
      body: JSON.stringify({ query }),
    });

    const payload = await res.json();

    if (payload.errors) {
      const gpraphqlError = payload.errors
        .map((current: GraphqlError) => current.message)
        .join('. ');
      throw new Error(gpraphqlError);
    }

    return [payload as D, null];
  } catch (error) {
    return [null, getErrorMessage(error)];
  }
};
