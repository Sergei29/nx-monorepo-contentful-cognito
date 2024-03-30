export const paths = {
  home: () => '/' as const,
  games: (id?: string) => (id ? `/games/${id}` : '/games'),
  books: (id?: string) => (id ? `/books/${id}` : '/books'),
  movies: (id?: string) => (id ? `/movies/${id}` : '/movies'),
  register: () => '/register' as const,
  signin: () => '/signin' as const,
  private: { account: () => '/private/account' as const },
};
