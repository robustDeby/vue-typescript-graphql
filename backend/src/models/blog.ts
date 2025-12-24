import mongoose, { Schema, Document, Model, Types } from "mongoose";
import type { UserDocument } from "./user.js";

export interface Recomment {
  content: string;
 author: Types.ObjectId | UserDocument;
}
export interface BlogDocument extends Document {
  title: string;
  content: string;
  author: Types.ObjectId | UserDocument;
  recomments: Recomment[];
}

const blogSchema = new Schema<BlogDocument>({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
 recomments: [
    {
      content: { type: String, required: true },
      author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
});

const Blog: Model<BlogDocument> =
  mongoose.models.Blog || mongoose.model<BlogDocument>("Blog", blogSchema);

export default Blog;
