'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { Skeleton } from '@nx-react-monorepo/components';

const LoadingStatus = () => (
  <div className="flex gap-2 items-center">
    <Skeleton className="text-sm border text-center border-yellow-200 rounded-lg p-1 text-gray-400 h-[30px] w-[250px]">
      loading...
    </Skeleton>
    <Skeleton className=" h-[30px] w-[72px]" />
  </div>
);

const AuthButton = (): JSX.Element => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <LoadingStatus />;
  }

  return (
    <div className="flex gap-2 items-center">
      {session?.user?.email && (
        <h3 className="text-sm border border-yellow-200 rounded-lg p-1">
          👋 Hi, <span>{session.user.email}</span>
        </h3>
      )}
      {status === 'unauthenticated' ? (
        <button
          onClick={() => {
            signIn('cognito');
          }}
          className="px-2 py-1 rounded-lg border border-yellow-800 bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-slate-900"
        >
          sign in
        </button>
      ) : (
        <button
          onClick={() => {
            signOut();
          }}
          className="px-2 py-1 rounded-lg border border-orange-800 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-slate-900"
        >
          sign out
        </button>
      )}
    </div>
  );
};

export default AuthButton;
