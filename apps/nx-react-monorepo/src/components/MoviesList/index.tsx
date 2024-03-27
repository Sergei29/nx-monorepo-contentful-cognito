import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { fetchMoviesList } from '../../lib/contentful/api/movies';
import { paths } from '../../lib/paths';

type Props = {
  className?: string;
};

const MoviesList = async ({ className }: Props) => {
  const [movies, moviesError] = await fetchMoviesList();

  if (moviesError || !movies) {
    return (
      <div className="my-8 min-h-8 flex flex-col justify-center items-center bg-red-500 rounded p-2 max-w-5xl mx-auto">
        <p>{moviesError || 'no data'}</p>
      </div>
    );
  }

  return (
    <section className={clsx('max-w-5xl mx-auto', className)}>
      <ul className="grid grid-cols-gallery gap-2 py-2">
        {movies.map(({ id, title, subTitle, image }, index) => (
          <li key={id}>
            <Link
              href={paths.movies(id)}
              className="grid grid-rows-[250px_80px] hover:opacity-75 transition-all delay-150 ease-in-out rounded-lg overflow-hidden"
            >
              <div className="bg-slate-200">
                <Image
                  src={image.href}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="mx-auto h-full w-auto"
                  priority={index < 7}
                />
              </div>
              <div className=" bg-indigo-400 p-2 min-h-16 text-sm">
                <h3 className=" text-red-800 font-semibold">{title}</h3>
                <p className="text-xs"> {subTitle}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MoviesList;
