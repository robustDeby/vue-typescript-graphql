import mongoose, { Schema, Document, Model } from 'mongoose';

export interface BlogDocument extends Document {
  title: string;
  content: string;
  recommends: [
    {
      content: string
    }
  ]
}

const blogSchema = new Schema<BlogDocument>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  recommends:[
    {
      content:String
    }
  ]
});

const Blog: Model<BlogDocument> =
  mongoose.models.Task ||
  mongoose.model<BlogDocument>('Blog', blogSchema);

export default Blog;
