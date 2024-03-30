/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';

import type { RequestHandler } from 'express';
import type { Server } from 'socket.io';

import { commentsWhSchema } from '../lib/schema';
import { PUBSUB_CHANNEL } from '../constants';

const { CREATE, DELETE } = PUBSUB_CHANNEL.COMMENTS.EVENT;

type LocalsWithSockets = Record<string, any> & {
  socket: Server;
};

export type RequestHandlerWithSockets = RequestHandler<
  any,
  any,
  any,
  any,
  LocalsWithSockets
>;

export type WhCommentPayloadBody = z.infer<typeof commentsWhSchema>;

export type PubSubEvent<D = unknown> = {
  name: typeof CREATE | typeof DELETE;
  data: D;
  timestamp: number; // Date.now()
};
