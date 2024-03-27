import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import type { ReactNode } from 'react';
import type { ImageType } from '../../types';

const BackgroundImage = ({ imageUrl }: { imageUrl: string }) => (
  <div
    className="bg-no-repeat bg-cover opacity-15 z-0 absolute h-full w-full left-0 righ-0 top-0 bottom-0"
    style={{ backgroundImage: `url(${imageUrl})` }}
    data-testid="HeroSectionDetailsPage_BackgroundImage"
  ></div>
);

type Props = {
  title: string;
  subTitle: string;
  image: ImageType;
  goBack: {
    pathname: string;
    name: string;
  };
  children: ReactNode;
  className?: string;
  backgroundImage?: string;
};

const HeroSectionDetailsPage = ({
  title,
  subTitle,
  image,
  goBack,
  children,
  className = '',
  backgroundImage,
}: Props): JSX.Element => (
  <section
    className={clsx('bg-white px-2 py-8 relative z-10 opacity-100', className)}
    data-testid="HeroSectionDetailsPage"
  >
    {backgroundImage && <BackgroundImage imageUrl={backgroundImage} />}
    <Link
      href={goBack.pathname}
      className="absolute top-4 left-4 text-sm underline hover:opacity-75"
    >
      {goBack.name}
    </Link>
    <div className="min-h-[30vh] max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr]">
      <div className=" h-full flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold my-4">{title}</h1>
        <p>{subTitle}</p>
        {children}
      </div>
      <div className="hidden md:h-full md:flex md:flex-col justify-center items-center">
        <Image
          src={image.href}
          alt={image.alt}
          width={image.width}
          height={image.height}
          priority
        />
      </div>
    </div>
  </section>
);

export default HeroSectionDetailsPage;
