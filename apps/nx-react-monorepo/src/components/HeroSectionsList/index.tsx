import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { fetchHeroItemsList } from '../../lib/contentful/api/heros';

type Props = {
  className?: string;
};

const HeroSectionsList = async ({ className }: Props) => {
  const [sections, errorFetchSections] = await fetchHeroItemsList();

  if (errorFetchSections || !sections) {
    return (
      <div className="my-8 min-h-8 flex flex-col justify-center items-center bg-red-500 rounded p-2 max-w-5xl mx-auto">
        <p>{errorFetchSections || 'no data'}</p>
      </div>
    );
  }
  return (
    <ul
      className={clsx(
        'grid grid-cols-pages gap-2 mt-12 max-w-5xl mx-auto',
        className
      )}
    >
      {sections.map(({ id, title, pathname, image }) => (
        <li key={id}>
          <Link
            href={`/${pathname}`}
            className="grid grid-rows-[250px_80px] hover:opacity-75 transition-all delay-150 ease-in-out"
          >
            <div className="bg-slate-200 rounded-t-lg">
              <Image
                src={image.href}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="h-full"
                priority
              />
            </div>
            <h3 className="text-xl font-notoSans font-semibold rounded-b-lg bg-indigo-400 text-red-700 text-center p-2 min-h-8">
              {title}
            </h3>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default HeroSectionsList;
