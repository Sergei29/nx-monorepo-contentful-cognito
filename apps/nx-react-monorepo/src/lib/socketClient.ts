import { io } from 'socket.io-client';

// somehow socket IO doesn't like the `env` lib fn.
// pulling process env directly
export const socketClient = io(process.env.NEXT_PUBLIC_WS_SERVER as string, {
  autoConnect: false,
});
