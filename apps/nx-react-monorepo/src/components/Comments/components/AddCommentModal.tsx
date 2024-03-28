'use client';

import type { ReactNode } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@nx-react-monorepo/components';

type Props = {
  children: ReactNode;
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
};

const AddCommentModal = ({
  children,
  isOpen,
  onOpenChange,
}: Props): JSX.Element => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add new comment</DialogTitle>
        <DialogDescription>
          Write your comment here. Click submit when you re done.
        </DialogDescription>
      </DialogHeader>
      {children}
    </DialogContent>
  </Dialog>
);

export default AddCommentModal;
