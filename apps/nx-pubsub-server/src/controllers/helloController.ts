import { RequestHandlerWithSockets } from '../types';
import { PUBSUB_CHANNEL } from '../constants';

export const helloHandler: RequestHandlerWithSockets = (req, res) => {
  res.locals.socket.emit(
    PUBSUB_CHANNEL.MESSAGE.EVENT.CREATE,
    'Hello from GET api endpoint'
  );

  res.status(200).json({ message: 'Welcome to nx-pubsub-server!' });
};
