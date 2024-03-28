'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import type { ReactNode } from 'react';
import type { PubSubEvent } from '../../types';

import { PUBSUB_CHANNEL, CONTENT_TYPE } from '../../constants';
import { pusherClient } from '../../lib/pusher/client';

type Props = {
  children: ReactNode;
};

const EventsSubscriber = ({ children }: Props): JSX.Element => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const commentsChannel = pusherClient.subscribe(
      PUBSUB_CHANNEL.COMMENTS.NAME
    );

    commentsChannel.bind(
      PUBSUB_CHANNEL.COMMENTS.EVENT.CREATE,
      (event: PubSubEvent<{ entryId: string }>) => {
        queryClient.invalidateQueries({
          queryKey: [CONTENT_TYPE.COMMENTS, event.data.entryId],
        });
      }
    );

    commentsChannel.bind(
      PUBSUB_CHANNEL.COMMENTS.EVENT.DELETE,
      (event: PubSubEvent<null>) => {
        queryClient.invalidateQueries({
          queryKey: [CONTENT_TYPE.COMMENTS],
        });
      }
    );

    return () => {
      commentsChannel.unbind();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

export default EventsSubscriber;
