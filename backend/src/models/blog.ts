import mongoose, { Schema, Document, Model } from "mongoose";

export interface BlogDocument extends Document {
  author: {};
  title: string;
  content: string;
  recommends: [
    {
      content: string;
      author:{}
    }
  ];
}

const blogSchema = new Schema<BlogDocument>({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  recommends: [
    {
      content: String,
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

const Blog: Model<BlogDocument> =
  mongoose.models.Task || mongoose.model<BlogDocument>("Blog", blogSchema);

export default Blog;
