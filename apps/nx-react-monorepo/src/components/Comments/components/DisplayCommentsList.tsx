'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';

import { CustomTooltip } from '@nx-react-monorepo/components';
import {
  fetchComments,
  deleteComment,
  createNewComment,
} from '../../../lib/queryClient/fetch/comments';
import { CONTENT_TYPE } from '../../../constants';

import AddCommentModal from './AddCommentModal';
import CommentLine from './CommentLine';
import CommentForm from './CommentForm';

type Props = {
  entryId: string;
};

const DisplayCommentsList = ({ entryId }: Props): JSX.Element => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { data, error } = useQuery({
    queryKey: [CONTENT_TYPE.COMMENTS, entryId],
    queryFn: fetchComments.bind(null, entryId),
  });

  const mutationDelete = useMutation({
    mutationFn: deleteComment,
  });

  const mutationCreate = useMutation({
    mutationFn: createNewComment,
  });

  const handleNewComment = async ({ body }: { body: string }) => {
    await mutationCreate.mutateAsync({
      entryId,
      body,
    });
    setIsOpenModal(false);
  };

  if (!data || error) {
    return (
      <div className="flex justify-center">
        <h4 className="text-red-700">
          {error?.message || 'Failed to fetch comments'}
        </h4>
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto my-8">
      <div className="flex justify-between items-center px-2">
        <h4 className="font-semibold text-indigo-800 text-sm">
          {data.total} comment{data.total > 1 ? 's' : ''}:
        </h4>

        <button
          className="bg-pink-600 hover:bg-pink-700 active:bg-pink-800 text-yellow-200 w-[50px] h-[50px] rounded-full"
          onClick={() => setIsOpenModal(true)}
        >
          <CustomTooltip content={<p>add new comment</p>}>
            <span>✍️</span>
          </CustomTooltip>
        </button>
      </div>

      <AddCommentModal
        isOpen={isOpenModal}
        onOpenChange={(isOpen) => {
          setIsOpenModal(isOpen);
        }}
      >
        <CommentForm
          isLoading={mutationCreate.isPending}
          handleNewComment={handleNewComment}
        />
      </AddCommentModal>

      <ul className="flex gap-4 my-4">
        {data.items.map(
          ({ id, body, createdAt, updatedAt, status, version }) => {
            const handleDelete = () => {
              mutationDelete.mutateAsync({ entryId, version, commentId: id });
            };

            return (
              <CommentLine
                key={id}
                isDisabled={mutationDelete.isPending}
                handleDelete={handleDelete}
                comment={{ body, createdAt, updatedAt, status }}
                className="flex flex-col gap-2 p-2 rounded"
              />
            );
          }
        )}
      </ul>
    </div>
  );
};

export default DisplayCommentsList;
