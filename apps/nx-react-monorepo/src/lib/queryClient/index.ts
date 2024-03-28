import { QueryClient } from '@tanstack/react-query';

const isServer = () => typeof window === 'undefined';

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        /**
         * @description With SSR, we usually want to set some default staleTime
         * above 0 to avoid refetching immediately on the client
         */
        staleTime: 60 * 1000,
      },
    },
  });

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
  if (isServer()) {
    /**
     * @description Server: always make a new query client
     */
    return makeQueryClient();
  } else {
    /**
     * @description Browser: make a new query client if we don't already have one
     * This is very important so we don't re-make a new client if React
     * suspends during the initial render. This may not be needed if we
     * have a suspense boundary BELOW the creation of the query client
     */
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};
