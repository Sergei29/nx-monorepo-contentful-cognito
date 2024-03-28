import { createClient } from 'contentful-management';

import { env } from '../../env';

export const managementClient = createClient(
  {
    accessToken: env.CONTENTFUL_MANAGEMENT_TOKEN,
  },
  {
    type: 'plain',
    defaults: {
      spaceId: env.CONTENTFUL_SPACE_ID,
      environmentId: env.CONTENTFUL_ENVIRONMENT_ID,
    },
  }
);
