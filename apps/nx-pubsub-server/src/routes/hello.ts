import { Router } from 'express';

import { helloHandler } from '../controllers';

const helloRoute = Router();

helloRoute.get('/', helloHandler);

export { helloRoute };
