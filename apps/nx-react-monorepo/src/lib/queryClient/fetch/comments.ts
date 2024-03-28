import type { DeleteCommentInput, CreateCommentInput } from '../../../types';

import * as actions from '../../contentful/management/comments';

export const fetchComments = async (entryId: string) => {
  const [commentsListSSR, error] = await actions.getCommentsByEntry(entryId);

  if (error || !commentsListSSR) {
    throw new Error(error || 'Failed to fetch the comments SSR');
  }

  return commentsListSSR;
};

export const deleteComment = async (input: DeleteCommentInput) => {
  const [success, error] = await actions.deleteComment(input);

  if (error || !success) {
    throw new Error(error || 'Failed to delete the comment');
  }

  return success;
};

export const createNewComment = async (input: CreateCommentInput) => {
  const [success, error] = await actions.addNewComment(input);

  if (error || !success) {
    throw new Error(error || 'Failed to create the comment');
  }

  return success;
};
