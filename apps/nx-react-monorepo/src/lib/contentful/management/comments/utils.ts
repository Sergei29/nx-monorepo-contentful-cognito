import type { CommentProps } from 'contentful-management';
import type { EntryComment } from '../../../../types';

export const formatCommentProps = ({
  body,
  status,
  sys,
}: CommentProps): EntryComment => {
  const { createdAt, updatedAt, parentEntity, createdBy, version } = sys;

  return {
    id: sys.id,
    createdAt,
    updatedAt,
    parentId: parentEntity.sys.id,
    userId: createdBy?.sys.id,
    body,
    status,
    version,
  };
};
