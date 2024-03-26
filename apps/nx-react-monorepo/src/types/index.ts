export * from './contentful';

export type PageProps<
  P = Record<string, string>,
  Q = Record<string, string>
> = {
  params: P;
  searchParams: Q;
};

export type AppNotification = {
  id: string;
  type: 'success' | 'warning' | 'danger';
  message: string;
  isTimedOut: boolean;
};

export type AppInfo = {
  notifications: AppNotification[];
};

export type Status<D = unknown> = {
  data: D | null;
  isLoading: boolean;
  error: null | string;
};

export type FormState<D = unknown> = {
  status: 'IDLE' | 'SUCCESS' | 'ERROR';
  data: D | null;
  error: string | null;
  timestamp: number; // Date.now()
};

export type WsEventType<N = string, D = unknown> = {
  name: N;
  tags: string[];
  data: D;
};
