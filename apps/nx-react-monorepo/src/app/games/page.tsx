import { fetchGamesList } from '../../lib/contentful/api/games';

const GamesPage = async () => {
  const [games, error] = await fetchGamesList();

  console.log('games, error :>> ', { games, error });

  return (
    <>
      <h1 className="text-3xl font-bold underline text-center">Games</h1>
    </>
  );
};

export default GamesPage;
