import React from 'react';

import { CommentsList } from '../../../types';

type Props = {
  commentsListSSR: CommentsList | null;
};

const CommentsList = ({ commentsListSSR }: Props): JSX.Element => {
  // fetch on client the latest
  return <div>CommentsList</div>;
};

export default CommentsList;
