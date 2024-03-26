import { fetchMoviesList } from '../../lib/contentful/api/movies';

const MoviesPage = async () => {
  const [movies, error] = await fetchMoviesList();

  console.log('movies, error :>> ', { movies, error });

  return (
    <>
      <h1 className="text-3xl font-bold underline text-center">Movies</h1>
    </>
  );
};

export default MoviesPage;
