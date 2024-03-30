import path from 'path';

import type { RequestHandlerWithSockets } from '../types';

export const demoHandler: RequestHandlerWithSockets = (req, res) => {
  res
    .status(200)
    .sendFile(
      path.join(process.cwd(), 'apps/nx-pubsub-server/src/views/index.html')
    );
};
