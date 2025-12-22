import Blog from "../models/blog.js";
import { Query, Types } from "mongoose";

interface IdArgs {
  id: string
}
interface AddRecomdArgs {
  id:string;
  content: string;
}
interface AddBlogArgs {
  title: string;
  content: string;
}

export const resolvers = {
  Query: {
    //READ (all)
    blogs: async () => {
      return await Blog.find();
    },

    //READ (one)
    blog: async (_:unknown, {id} : IdArgs) => {
      return await Blog.findById(new Types.ObjectId(id))
    }
  },

  Mutation:{
    //CREATE
    addBlog: async (_:unknown, {title, content}: AddBlogArgs) => {
      return await Blog.create({
        title,
        content,
      })
    },
    addRecommend: async (_:unknown, {id, content}: AddRecomdArgs) => {
      let blog = await Blog.findById(new Types.ObjectId(id));
      
      if(!blog) {
        throw new Error('Blog not found');
      }

      blog.recommends.push({
        content
      })
      await blog.save();
       return blog.recommends[blog.recommends.length - 1];
    }
  }
}