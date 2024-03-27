'use client';

import type { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import { getQueryClient } from '../../lib/queryClient';

type Props = {
  children: ReactNode;
};

const QueryProvider = ({ children }: Props): JSX.Element => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
