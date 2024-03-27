'use client';

import { SessionProvider } from 'next-auth/react';

import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props): JSX.Element => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
