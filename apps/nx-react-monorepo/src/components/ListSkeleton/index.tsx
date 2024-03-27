import { Skeleton } from '@nx-react-monorepo/components';

const ListSkeleton = () => (
  <div className="max-w-5xl mx-auto grid grid-cols-gallery gap-2 py-2">
    {[1, 2, 3, 4, 5, 6, 7, 8].map((val) => (
      <div
        key={val}
        className=" border border-slate-100 grid grid-rows-[250px_80px] rounded-lg"
      >
        <div className="p-2">
          <Skeleton className="mx-auto min-h-[230px] w-full" />
        </div>
        <div className="p-2 text-sm flex flex-col gap-2">
          <Skeleton className="w-full h-[35px]" />
          <Skeleton className="w-full h-[20px]" />
        </div>
      </div>
    ))}
  </div>
);

export default ListSkeleton;
