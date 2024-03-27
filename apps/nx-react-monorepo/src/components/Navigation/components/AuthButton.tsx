'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

const AuthButton = (): JSX.Element => {
  const { data: session, status } = useSession();

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
