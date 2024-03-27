import CognitoProvider from 'next-auth/providers/cognito';

import type { NextAuthOptions } from 'next-auth';

import { env } from '../env';

export const authOptions: NextAuthOptions = {
  providers: [
    CognitoProvider({
      clientId: env.COGNITO_CLIENT_ID,
      clientSecret: env.COGNITO_CLIENT_SECRET,
      issuer: env.COGNITO_ISSUER,
    }),
  ],
};
