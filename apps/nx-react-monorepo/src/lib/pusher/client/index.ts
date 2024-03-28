import PusherClient from 'pusher-js';

import { paths } from '../../paths';

/**
 * Note: somehow the Pusher-Js doesn't like the `env` library
 * so the process.env vars are pulled directly.
 */
export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_KEY as string,
  {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
    authEndpoint: paths.api.pusher.auth(),
  }
);
