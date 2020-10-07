import { Schema } from 'mongoose';

export const ForumSchema: Schema = new Schema({
  postTitle: {
    type: String
  },
  postDescription: {
    type: String
  },
  postPic: {
    type: String
  },
  postType: {
    type: String,
    enum: ["community", "news", "adverts"],
    default: "community"
  },
  postCategory: {
    type: [String]
  },
  postAuthor: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}, {timestamps: true})
