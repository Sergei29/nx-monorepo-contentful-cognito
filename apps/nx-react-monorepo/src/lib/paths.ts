export const paths = {
  home: () => '/',
  games: (id?: string) => (id ? `/games/${id}` : '/games'),
  books: (id?: string) => (id ? `/books/${id}` : '/books'),
  movies: (id?: string) => (id ? `/movies/${id}` : '/movies'),
  register: () => '/register',
  signin: () => '/signin',
  private: { account: () => '/private/account' },
};
