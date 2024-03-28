import 'server-only';
/**
 * the "server-only" lib above will prevent these util fetching functions to be accidentially called from client components
 * which may expose our cms api urls on the browser ( which may be a security risk )
 */

import PusherServer from 'pusher';

import { env } from '../../env';

let pusherInstance: PusherServer | null = null;

export const getPusherInstance = () => {
  if (!pusherInstance) {
    pusherInstance = new PusherServer({
      appId: env.PUSHER_APP_ID,
      key: env.NEXT_PUBLIC_PUSHER_KEY,
      secret: env.PUSHER_SECRET,
      cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
      useTLS: true,
    });
  }

  return pusherInstance;
};
