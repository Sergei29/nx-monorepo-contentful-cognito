export type WhPayloadBody = {
  entityId: string;
  contentType: string;
  topic:
    | 'ContentManagement.Entry.auto_save'
    | 'ContentManagement.Entry.save'
    | 'ContentManagement.Entry.publish'
    | 'ContentManagement.Entry.delete';
};
