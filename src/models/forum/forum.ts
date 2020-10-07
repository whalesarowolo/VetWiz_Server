import { IForum } from './forum.d';
import { model } from 'mongoose';
import { ForumSchema } from './forum.model';

const forumModel = model<IForum>('forum', ForumSchema);
export default forumModel;
