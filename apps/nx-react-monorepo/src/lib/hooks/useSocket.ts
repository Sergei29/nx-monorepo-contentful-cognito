import { useEffect, useRef } from 'react';

import { socketClient } from '../socketClient';

export const useSocket = () => {
  const socketRef = useRef<typeof socketClient>(socketClient);

  useEffect(() => {
    const currentSocket = socketRef.current;
    currentSocket.connect();

    return () => {
      currentSocket.disconnect();
    };
  }, []);

  return socketRef.current;
};
