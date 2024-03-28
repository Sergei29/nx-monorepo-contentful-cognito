export * from './contentful';
export * from './contentful/webhook';
export * from './contentful/management';

export type PageProps<
  P = Record<string, string>,
  Q = Record<string, string>
> = {
  params: P;
  searchParams: Q;
};
