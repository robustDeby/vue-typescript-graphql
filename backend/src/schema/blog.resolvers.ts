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
      const blogs = await Blog.find()
        .populate("author")
        .populate("recomments.author");

      console.log("AUTHOR TYPE:", blogs[0]?.author, typeof blogs[0]?.author);

      return blogs;

    },
    //READ (one)
    blog: async (_: unknown, { id }: IdArgs) => {
      console.log("🔥 BLOG RESOLVER HIT456456456");

      return Blog.findById(new Types.ObjectId(id))
        .populate("author")
        .populate("recomments.author");
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
      const blog = await Blog.create({
        title,
        content,
        author: context.user._id,
        recomments: [],
      });
      return blog.populate("author");
    },
    addRecomment: async (
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

      blog.recomments.push({
        content,
        author: context.user._id,
      });
      await blog.save();
      return Blog.findById(blog._id)
        .populate("author")
        .populate("recomments.author");
    },
  },
};
