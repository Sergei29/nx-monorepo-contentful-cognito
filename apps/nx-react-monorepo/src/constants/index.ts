export const CONTENT_TYPE = {
  HERO: 'hero',
  GAMES: 'games',
  BOOKS: 'books',
  MOVIES: 'movies',
  COMMENTS: 'comments',
  ASSET: 'asset',
} as const;

export const HEADERS = {
  CONTENTFUL_WH_SECRET: 'contentful-wh-secret',
} as const;

export const USER_SELECT_FIELDS = {
  id: true,
  createdAt: true,
  updatedAt: true,
  role: true,
  signInType: true,
  username: true,
  email: true,
  passwordHash: true,
} as const;

export const ERROR = {
  PAYLOAD_MISSING: 'Body payload missing',
  USER_EXISTS: 'User exists',
  USER_NOT_FOUND: 'No user found',
  USER_EMAIL_ALREADY_VERIFIED: 'User email already verified',
  USER_EMAIL_NOT_VERIFIED: 'User email must be verified',
  USER_NOT_AUTHENTICATED: 'Not authenticated',
  USER_NOT_AUTHORIZED: 'Not authorized',
  CREDENTIALS_DONT_MATCH: 'Credentials do not match',
  SEE_OTHER_303: 'See other',
  QUERY_PARAM_MISSING: 'Query param is missing',
  FAILED_TO_FETCH: 'Failed to fetch',
  NEXTAUTH_CREDENTIALS_SIGNIN_ERROR: 'CredentialsSignin',
  NEXTAUTH_CREDENTIALS_PROCEED_TO_GOOGLE:
    'Credentials do not match. Proceed to Google login',
  INVALID_TOKEN: 'Invalid token',
  CHECKOUT_SESSION_FAILED: 'Checkout session failed',
} as const;

export const MESSAGE = {
  USER_REGISTER_OK: 'User registered',
} as const;

export const WS_EVENT = {
  COMMENT: 'comment',
} as const;

export const HERO_BG_ASSET_ID = {
  BOOKS: '5rmNiYkDY7guI5RgOmzuG2',
  MOVIES: '7CXE8BJIyhYtdcU8Ef9CXx',
  GAMES: '3CPUpLDZCUlrolSrIm6peo',
  HOME: '7Gi4OaqECIZPRtSocYYNFp',
} as const;
