import Image from 'next/image';

import { Skeleton } from '@nx-react-monorepo/components';
import { fetchHeroSectionDetails } from '../../lib/contentful/api/heros';

type Props = {
  slug: string;
};

const HeroSection = async ({ slug }: Props) => {
  const [heroSection, fetchError] = await fetchHeroSectionDetails(slug);

  return (
    <>
      <section className=" bg-white px-2 py-8">
        <div className="min-h-[30vh] max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div className=" h-full flex flex-col justify-center items-center">
            {fetchError && (
              <p className="text-center text-red-700 font-semibold">
                {fetchError}
              </p>
            )}
            {heroSection && (
              <h1 className="text-5xl font-bold my-4 animate-slidein300 opacity-0">
                {heroSection.title}
              </h1>
            )}
            {heroSection && (
              <p className=" text-lg animate-slidein500 opacity-0 ">
                {heroSection.text}
              </p>
            )}
          </div>
          <div className="hidden md:h-full md:flex md:flex-col justify-center items-center">
            {heroSection && (
              <Image
                src={heroSection.image.href}
                alt={heroSection.image.alt}
                width={heroSection.image.width}
                height={heroSection.image.height}
                priority
              />
            )}
          </div>
        </div>
      </section>
      <p className="text-xs text-end max-w-5xl mx-auto relative top-[-35px] opacity-75">
        Powered by: Next.js on Vercel & Contentful CMS
      </p>
    </>
  );
};

export const HeroSectionSkeleton = () => (
  <div className=" px-4 pt-8 border border-slate-100 min-h-[30vh] max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] rounded-xl my-8">
    <div className="h-full flex flex-col gap-2 items-center p-2">
      <Skeleton className="h-[90px] w-full" />
      <Skeleton className="h-[20px] w-full" />
      <Skeleton className="h-[20px] w-[80%] mr-auto" />
      <Skeleton className="h-[20px] w-[50%] mr-auto" />
    </div>
    <div className="hidden md:flex flex-col gap-2 items-center p-2">
      <Skeleton className="h-[150px] w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  </div>
);

export default HeroSection;
