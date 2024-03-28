import { notFound } from 'next/navigation';

import type { PageProps } from '../../../types';

import { YouTubeVideo } from '@nx-react-monorepo/components';
import {
  fetchMovieById,
  fetchMoviePageParams,
} from '../../../lib/contentful/api/movies';
import { fetchHeroBackgroundImage } from '../../../lib/contentful/api/heros';
import { HERO_BG_ASSET_ID } from '../../../constants';
import { paths } from '../../..//lib/paths';
import HeroSectionDetailsPage from '../../../components/HeroSection/HeroSectionDetailsPage';
import RichTextView from '../../../components/RichTextView';

export const dynamicParams = true;

export const generateStaticParams = async () => {
  const [params, paramsError] = await fetchMoviePageParams();

  if (paramsError) {
    console.warn('Movie pages params generation error: ', paramsError);
  }

  return params || [];
};

const MovieDetailsPage = async ({ params }: PageProps<{ movieId: string }>) => {
  const [movie] = await fetchMovieById(params.movieId);
  const [heroBackground] = await fetchHeroBackgroundImage(
    HERO_BG_ASSET_ID.MOVIES
  );

  if (!movie) {
    return notFound();
  }

  return (
    <>
      <HeroSectionDetailsPage
        title={movie.title}
        subTitle={movie.subTitle}
        image={movie.image}
        goBack={{
          pathname: paths.movies(),
          name: 'back to movies',
        }}
        backgroundImage={heroBackground?.url}
      >
        <p className="font-semibold text-indigo-800 ml-auto mr-4 mt-4">
          Genre: {movie.genre}
        </p>
        <p className="font-semibold text-red-800 ml-auto mr-4 mt-4">
          Cast: {movie.cast}
        </p>
      </HeroSectionDetailsPage>
      <RichTextView
        content={movie.description}
        className="max-w-5xl mx-auto my-8"
      />
      {movie.videoUrl && <YouTubeVideo src={movie.videoUrl} />}
    </>
  );
};

export default MovieDetailsPage;
