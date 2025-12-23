import Blog from "../models/blog.js";
import { Query, Types } from "mongoose";
import type { GraphQLContext } from "../types/context.js";

interface IdArgs {
  id: string;
}
interface AddRecomdArgs {
  id: string;
  content: string;
}
interface AddBlogArgs {
  title: string;
  content: string;
}

export const blogResolvers = {
  Query: {
    //READ (all)
    blogs: async () => {
      return await Blog.find().populate("author").populate("recommends.author");
    },

    //READ (one)
    blog: async (_: unknown, { id }: IdArgs) => {
      return await Blog.findById(new Types.ObjectId(id));
    },
  },

  Mutation: {
    //CREATE
    addBlog: async (
      _: unknown,
      { title, content }: AddBlogArgs,
      context: GraphQLContext
    ) => {
      if (!context.user) {
        throw new Error("User not authenticated");
      }
      return await Blog.create({
        title,
        content,
        author: context.user._id,
      });
    },
    addRecommend: async (
      _: unknown,
      { id, content }: AddRecomdArgs,
      context: GraphQLContext
    ) => {
      if (!context.user) {
        throw new Error("User not authenticated");
      }
      let blog = await Blog.findById(new Types.ObjectId(id));
      if (!blog) {
        throw new Error("Blog not found");
      }

      blog.recommends.push({
        content,
        author: context.user._id,
      });
      await blog.save();
      return blog.recommends[blog.recommends.length - 1];
    },
  },
};
