import type { Server } from 'socket.io';
import type { RequestHandlerWithSockets } from '../types';

/**
 * @description generates a middleware that provides `res.locals`
 * with socket IO instance enabling so the HTTP endpoints to dispatch
 * an event by invoking `res.locals.socket`
 * @param {Server} socketIO instance of socketIO
 * @returns {RequestHandlerWithSockets} middleware functions to be
 * used by `app.use(getSocketsToLocals(socketIO))` at the top level as
 * soon as socketIO is created.
 */
export const setSocketsToResLocals =
  (socketIO: Server): RequestHandlerWithSockets =>
  (req, res, next) => {
    res.locals.socket = socketIO;
    next();
  };
