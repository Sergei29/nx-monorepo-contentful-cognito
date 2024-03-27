import { notFound } from 'next/navigation';

import type { PageProps } from '../../../types';

import { YouTubeVideo } from '@nx-react-monorepo/components';
import {
  fetchGameDetails,
  fetchGamePageParams,
} from '../../../lib/contentful/api/games';
import HeroSectionDetailsPage from '../../../components/HeroSection/HeroSectionDetailsPage';
import RichTextView from '../../../components/RichTextView';
import { paths } from '../../..//lib/paths';

export const dynamicParams = true;

export const generateStaticParams = async () => {
  const [params, paramsError] = await fetchGamePageParams();

  if (paramsError) {
    console.warn('Game pages params generation error: ', paramsError);
  }

  return params || [];
};

const GameDetailsPage = async ({ params }: PageProps<{ gameId: string }>) => {
  const [game] = await fetchGameDetails(params.gameId);

  if (!game) {
    return notFound();
  }

  return (
    <>
      <HeroSectionDetailsPage
        title={game.title}
        subTitle={game.subTitle || ''}
        image={game.image}
        goBack={{
          pathname: paths.games(),
          name: 'back to games',
        }}
        backgroundImage={game.image.href}
      >
        <p className="font-semibold text-indigo-800 ml-auto mr-4 mt-4">
          Genre: {game.genre}
        </p>
      </HeroSectionDetailsPage>
      <RichTextView
        content={game.description}
        className="max-w-5xl mx-auto my-8"
      />
      {game.videoUrl && <YouTubeVideo src={game.videoUrl} />}
    </>
  );
};

export default GameDetailsPage;
