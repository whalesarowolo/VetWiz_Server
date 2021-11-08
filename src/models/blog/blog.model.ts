import { Schema } from 'mongoose';

export const BlogSchema: Schema = new Schema({
  blogTitle: {
    type: String
  },
  blogDescription: {
    type: String
  },
  
  blogAuthor: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}, {timestamps: true})
