import { NextResponse, NextRequest } from 'next/server';

import type { WhCommentPayloadBody, PubSubEvent } from '../../../../types';

import { getPusherInstance } from '../../../../lib/pusher/server';
import { HEADERS, PUBSUB_CHANNEL } from '../../../../constants';
import { env } from '../../../../lib/env';

const pusherServer = getPusherInstance();

export const POST = async (request: NextRequest) => {
  const requestHeaders = new Headers(request.headers);
  const secret = requestHeaders.get(HEADERS.CONTENTFUL_WH_SECRET);

  if (secret !== env.CONTENTFUL_WH_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  const body = (await request.json()) as WhCommentPayloadBody;

  try {
    const eventName =
      body.topic === 'ContentManagement.Comment.create'
        ? PUBSUB_CHANNEL.COMMENTS.EVENT.CREATE
        : PUBSUB_CHANNEL.COMMENTS.EVENT.DELETE;

    const event: PubSubEvent<{ entryId: string } | null> = {
      name: eventName,
      timestamp: Date.now(),
      data: body.entryId ? { entryId: body.entryId } : null,
    };

    pusherServer.trigger(PUBSUB_CHANNEL.COMMENTS.NAME, eventName, event);
  } catch (error) {
    console.warn(error);
  }

  return NextResponse.json(
    { revalidated: true, now: Date.now() },
    { status: 200 }
  );
};
