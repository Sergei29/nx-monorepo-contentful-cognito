import { Server } from 'socket.io';
import express from 'express';
import * as path from 'path';
import http from 'http';

import config from './config/config.json';
import { middlewares, setSocketsToResLocals } from './middlewares';
import { helloRoute, demoRoute, contentfulCommentsWhRoute } from './routes';
import { PATH, PUBSUB_CHANNEL } from './constants';
import { env } from './lib/env';

const port = process.env.PORT || 3333;
const app = express();

app.use(middlewares);

const httpServer = http.createServer(app);

const socketIO = new Server(httpServer, {
  cors: {
    origin: config.authorisedOrigins,
  },
});

socketIO.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on(PUBSUB_CHANNEL.MESSAGE.EVENT.CREATE, (message) => {
    socketIO.emit(PUBSUB_CHANNEL.MESSAGE.EVENT.CREATE, message);
  });
});

app.use(setSocketsToResLocals(socketIO));

app.use(PATH.ASSETS, express.static(path.join(__dirname, 'assets')));
app.use(PATH.HELLO, helloRoute);
app.use(PATH.DEMO, demoRoute);
app.use(PATH.WH.CONTENTFUL_COMMENTS, contentfulCommentsWhRoute);

const server = httpServer.listen(port, () => {
  if (env.NODE_ENV === 'development') {
    console.log(`Listening at http://localhost:${port}/api`);
  }
});
server.on('error', console.error);
