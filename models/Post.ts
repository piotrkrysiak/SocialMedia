import { Schema, model, Document } from "mongoose";

export interface IPost extends Document {
  userId: string;
  description: string;
  image: string;
  likes: string[]; // array of userIds
  _doc: any; // MongoResult
}

const PostSchema = new Schema<IPost>(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      max: 500,
    },
    image: {
      type: String,
    },
    likes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default model<IPost>("Post", PostSchema);
