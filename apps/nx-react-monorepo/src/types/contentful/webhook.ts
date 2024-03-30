import { PUBSUB_CHANNEL } from '../../constants';

const { CREATE, DELETE } = PUBSUB_CHANNEL.COMMENTS.EVENT;

export type WhPayloadBody = {
  entityId: string;
  contentType: string;
  topic:
    | 'ContentManagement.Entry.auto_save'
    | 'ContentManagement.Entry.save'
    | 'ContentManagement.Entry.publish'
    | 'ContentManagement.Entry.delete';
};

export type WhCommentPayloadBody = {
  entryId?: string | null;
  topic:
    | 'ContentManagement.Comment.delete'
    | 'ContentManagement.Comment.create';
};

export type PubSubEvent<D = unknown> = {
  name: typeof CREATE | typeof DELETE;
  data: D;
  timestamp: number; // Date.now()
};
