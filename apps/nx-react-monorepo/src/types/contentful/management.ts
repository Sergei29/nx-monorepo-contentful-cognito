import type { CommentProps } from 'contentful-management';

export type EntryComment = {
  id: string;
  createdAt: string;
  updatedAt: string;
  parentId: string;
  userId: string | undefined;
  body: string;
  status: CommentProps['status'];
  version: CommentProps['sys']['version'];
};

export type CommentsList = {
  total: number;
  items: EntryComment[];
};

export type CreateCommentInput = { entryId: string; body: string };
export type DeleteCommentInput = {
  entryId: string;
  commentId: string;
  version: number;
};
