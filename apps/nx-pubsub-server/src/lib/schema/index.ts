import { z } from 'zod';

export const commentsWhSchema = z
  .object({
    entryId: z.string().nullish(),
    topic: z.union([
      z.literal('ContentManagement.Comment.delete'),
      z.literal('ContentManagement.Comment.create'),
    ]),
  })
  .refine(
    ({ entryId, topic }) => {
      if (topic === 'ContentManagement.Comment.create' && !entryId) {
        return false;
      }
      return true;
    },
    { message: 'entryId must be present if comment created.' }
  );
