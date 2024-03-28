'use server';

import 'server-only';
/**
 * the "server-only" lib above will prevent these util fetching functions to be accidentially called from client components
 * which may expose our cms api urls on the browser ( which may be a security risk )
 */

import type {
  CommentsList,
  EntryComment,
  CreateCommentInput,
  DeleteCommentInput,
} from '../../../../types';

import { getErrorMessage } from '../../../common';
import { env } from '../../../env';
import { managementClient } from '..';

import { formatCommentProps } from './utils';

export const getCommentsByEntry = async (
  entryId: string
): Promise<[CommentsList, null] | [null, string]> => {
  try {
    const res = await managementClient.comment.getMany({
      spaceId: env.CONTENTFUL_SPACE_ID,
      entryId,
      environmentId: env.CONTENTFUL_ENVIRONMENT_ID,
      bodyFormat: 'plain-text',
    });
    const { total, items } = res;

    const data: CommentsList = {
      total,
      items: [],
    };

    if (total === 0) {
      return [data, null];
    }

    data.items = items.map(formatCommentProps);

    return [data, null];
  } catch (error) {
    return [null, getErrorMessage(error)];
  }
};

export const addNewComment = async ({
  entryId,
  body,
}: CreateCommentInput): Promise<[EntryComment, null] | [null, string]> => {
  try {
    const res = await managementClient.comment.create(
      {
        spaceId: env.CONTENTFUL_SPACE_ID,
        entryId,
        environmentId: env.CONTENTFUL_ENVIRONMENT_ID,
        bodyFormat: 'plain-text',
      },
      {
        body,
        status: 'active',
      }
    );

    return [formatCommentProps(res), null];
  } catch (error) {
    return [null, getErrorMessage(error)];
  }
};

export const deleteComment = async ({
  entryId,
  commentId,
  version,
}: DeleteCommentInput): Promise<
  [DeleteCommentInput, null] | [null, string]
> => {
  try {
    await managementClient.comment.delete({
      spaceId: env.CONTENTFUL_SPACE_ID,
      commentId,
      entryId,
      environmentId: env.CONTENTFUL_ENVIRONMENT_ID,
      version,
    });

    return [{ entryId, commentId, version }, null];
  } catch (error) {
    return [null, getErrorMessage(error)];
  }
};
