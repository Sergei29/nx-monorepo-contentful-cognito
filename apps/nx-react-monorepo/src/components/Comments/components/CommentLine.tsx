'use client';

import clsx from 'clsx';
import { Trash2 } from 'lucide-react';

import { CustomTooltip } from '@nx-react-monorepo/components';

import type { EntryComment } from '../../../types';

type Props = {
  comment: Pick<EntryComment, 'body' | 'createdAt' | 'updatedAt' | 'status'>;
  handleDelete: () => void;
  className?: string;
  isDisabled?: boolean;
};

const CommentLine = ({
  comment,
  handleDelete,
  className,
  isDisabled,
}: Props): JSX.Element => {
  const { body, createdAt, updatedAt, status } = comment;

  return (
    <li className={clsx(className, 'bg-pink-300')}>
      <span className="text-sm font-semibold">{body}</span>
      <span className="flex justify-between">
        <span className="text-xs flex flex-col gap-1">
          <span>created: {new Date(createdAt).toDateString()}</span>
          <span>updated: {new Date(updatedAt).toDateString()}</span>
          <span>status: {`"${status}"`}</span>
        </span>
        <button
          onClick={handleDelete}
          disabled={isDisabled}
          className=" bg-red-600 hover:bg-red-700 active:bg-red-800 border border-red-800 disabled:opacity-75 rounded-full w-[30px] h-[30px] text-slate-200 flex justify-center items-center"
        >
          <CustomTooltip
            content={<span className=" text-sm">delete comment</span>}
          >
            <Trash2 size={20} />
          </CustomTooltip>
        </button>
      </span>
    </li>
  );
};

export default CommentLine;
