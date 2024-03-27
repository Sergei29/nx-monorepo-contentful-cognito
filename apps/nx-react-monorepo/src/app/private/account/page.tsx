import { getServerSession } from 'next-auth/next';

import { authOptions } from '../../../lib/auth';

const AccountPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <h1 className="text-3xl font-bold underline text-center mt-4">
        👋 Hi {session?.user?.email || 'Guest'}
      </h1>
    </>
  );
};

export default AccountPage;
