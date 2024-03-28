import React from 'react';
import { unstable_noStore as noStore } from 'next/cache';

import CommentsList from './components/CommentsList';
import { getCommentsByEntry } from '../../lib/contentful/management/comments';

type Props = {
  entryId: string;
};

const Comments = async ({ entryId }: Props) => {
  noStore();
  const [commentsListSSR] = await getCommentsByEntry(entryId);

  return (
    <div>
      <CommentsList commentsListSSR={commentsListSSR} />
    </div>
  );
};

export default Comments;
