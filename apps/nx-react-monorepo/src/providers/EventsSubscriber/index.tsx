/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import type { ReactNode } from 'react';
import type { PubSubEvent } from '../../types';

import { PUBSUB_CHANNEL, CONTENT_TYPE } from '../../constants';
import { useSocket } from '../../lib/hooks/useSocket';

type Props = {
  children: ReactNode;
};

const EventsSubscriber = ({ children }: Props): JSX.Element => {
  const queryClient = useQueryClient();
  const socketClient = useSocket();

  useEffect(() => {
    const onCommentCreate = (event: PubSubEvent<{ entryId: string }>) => {
      queryClient.invalidateQueries({
        queryKey: [CONTENT_TYPE.COMMENTS, event.data.entryId],
      });
    };

    const onCommentDelete = (event: PubSubEvent<null>) => {
      queryClient.invalidateQueries({
        queryKey: [CONTENT_TYPE.COMMENTS],
      });
    };

    socketClient.on(PUBSUB_CHANNEL.COMMENTS.EVENT.CREATE, onCommentCreate);
    socketClient.on(PUBSUB_CHANNEL.COMMENTS.EVENT.DELETE, onCommentDelete);

    return () => {
      socketClient.off(PUBSUB_CHANNEL.COMMENTS.EVENT.CREATE, onCommentCreate);
      socketClient.off(PUBSUB_CHANNEL.COMMENTS.EVENT.DELETE, onCommentDelete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

export default EventsSubscriber;
