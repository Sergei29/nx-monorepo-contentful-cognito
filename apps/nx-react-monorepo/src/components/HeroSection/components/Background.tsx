import { fetchHeroBackgroundImage } from '../../../lib/contentful/api/heros';

type Props = { assetId: string };

const Background = async ({ assetId }: Props) => {
  const [heroBackground] = await fetchHeroBackgroundImage(assetId);

  return heroBackground ? (
    <div
      className="bg-no-repeat bg-cover opacity-15 z-0 absolute h-full w-full left-0 righ-0 top-0 bottom-0"
      style={{ backgroundImage: `url(${heroBackground.url})` }}
      data-testid="HeroSectionDetailsPage_BackgroundImage"
    ></div>
  ) : null;
};

export default Background;
