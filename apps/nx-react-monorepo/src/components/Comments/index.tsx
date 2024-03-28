import { unstable_noStore as noStore } from 'next/cache';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { fetchComments } from '../../lib/queryClient/fetch/comments';
import { getQueryClient } from '../../lib/queryClient';
import { CONTENT_TYPE } from '../../constants';
import DisplayCommentsList from './components/DisplayCommentsList';

type Props = {
  entryId: string;
};

const Comments = async ({ entryId }: Props) => {
  noStore();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [CONTENT_TYPE.COMMENTS, entryId],
    queryFn: fetchComments.bind(null, entryId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DisplayCommentsList entryId={entryId} />
    </HydrationBoundary>
  );
};

export default Comments;
