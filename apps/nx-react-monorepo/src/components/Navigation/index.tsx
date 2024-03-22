import Link from 'next/link';

import { paths } from '../../lib/paths';

const Navigation = (): JSX.Element => {
  return (
    <nav className="flex justify-end gap-2 px-4 h-10 items-center text-sm max-w-5xl mx-auto text-yellow-100">
      <div className=" mr-auto flex gap-2">
        <Link
          href={paths.home()}
          className="p-2 rounded-full hover:bg-gray-700 transition-all delay-100 ease-out"
        >
          <span>🏠</span>
        </Link>

        <Link
          href={paths.books()}
          className="p-2 rounded-full hover:bg-gray-700 transition-all delay-100 ease-out"
        >
          <span>📚</span>
        </Link>

        <Link
          href={paths.movies()}
          className="p-2 rounded-full hover:bg-gray-700 transition-all delay-100 ease-out"
        >
          <span>🎬</span>
        </Link>

        <Link
          href={paths.games()}
          className="p-2 rounded-full hover:bg-gray-700 transition-all delay-100 ease-out"
        >
          <span> 🎮</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
