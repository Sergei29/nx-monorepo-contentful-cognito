import type {
  RequestHandlerWithSockets,
  WhCommentPayloadBody,
  PubSubEvent,
} from '../../types';

import { commentsWhSchema } from '../../lib/schema';
import { getErrorMessage } from '../../lib/common';
import { PUBSUB_CHANNEL } from '../../constants';
import { env } from '../../lib/env';

const { EVENT } = PUBSUB_CHANNEL.COMMENTS;

export const contentfulCommentsController: RequestHandlerWithSockets = (
  req,
  res
) => {
  const secret = req.headers['contentful-wh-secret'];

  if (secret !== env.CONTENTFUL_WH_SECRET) {
    return res.status(401).json({ message: 'Invalid secret' });
  }

  try {
    const { topic, entryId }: WhCommentPayloadBody = commentsWhSchema.parse(
      req.body
    );

    const eventName =
      topic === 'ContentManagement.Comment.create'
        ? EVENT.CREATE
        : EVENT.DELETE;

    const eventPayload: PubSubEvent = {
      name: eventName,
      data: entryId ? { entryId } : null,
      timestamp: Date.now(),
    };

    res.locals.socket.emit(eventName, eventPayload);
  } catch (error) {
    console.warn('WH/error: ', error);
    return res.status(400).json({ message: getErrorMessage(error) });
  }

  res.status(200).json({ revalidated: true, now: Date.now() });
};
