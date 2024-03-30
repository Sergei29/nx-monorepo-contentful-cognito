import { Router } from 'express';

import { contentfulCommentsController } from '../../controllers';

const contentfulCommentsWhRoute = Router();

contentfulCommentsWhRoute.post('/', contentfulCommentsController);

export { contentfulCommentsWhRoute };
