export const PATH = {
  ASSETS: '/assets',
  HELLO: '/api/hello',
  DEMO: '/api/demo',
  WH: {
    CONTENTFUL: '/api/webhooks/contentful',
    CONTENTFUL_COMMENTS: '/api/webhooks/contentful-comments',
  },
} as const;

export const PUBSUB_CHANNEL = {
  MESSAGE: {
    NAME: 'message',
    EVENT: {
      CREATE: 'evt::message::create',
    },
  },
  COMMENTS: {
    NAME: 'comments',
    EVENT: {
      CREATE: 'evt::comments::create',
      DELETE: 'evt::comments::delete',
    },
  },
} as const;
