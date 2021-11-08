import { IBlog } from './blog.d';
import { model } from 'mongoose';
import { BlogSchema } from './blog.model';

const blogModel = model<IBlog>('blog', BlogSchema);
export default blogModel;