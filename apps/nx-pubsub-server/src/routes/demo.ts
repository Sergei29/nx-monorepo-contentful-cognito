import { Router } from 'express';

import { demoHandler } from '../controllers';

const demoRoute = Router();

demoRoute.get('/', demoHandler);

export { demoRoute };
