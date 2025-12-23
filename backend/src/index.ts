import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { createYoga, createSchema } from "graphql-yoga";
import type { GraphQLContext } from './types/context.js'

import { blogTypeDefs } from "./schema/blog.js";
import { authTypeDefs } from "./schema/auth.js";
import { blogResolvers } from "./schema/blog.resolvers.js";
import { authResolvers } from "./schema/auth.resolver.js";
import { gql } from "graphql-tag";
import User from "./models/user.js";

const JWT_SECRET = process.env.JWT_SECRET as string;
const app = express();

// MongoDB connection
await mongoose.connect(
  "mongodb+srv://wiktor:1212@working.9ariusi.mongodb.net/?appName=Working"
);
const baseTypeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;
// GraphQL schema
const schema = createSchema({
  typeDefs: [
    baseTypeDefs,
    authTypeDefs,
    blogTypeDefs,
  ],
  resolvers: [authResolvers, blogResolvers],
});

// Yoga server
const yoga = createYoga<GraphQLContext>({
  schema,
  context: async ({ request }) => {
    const authHeader = request.headers.get('authorization')

    if (!authHeader) {
      return { user: null }
    }

    try {
      const token = authHeader.replace('Bearer ', '')
      const payload = jwt.verify(token, JWT_SECRET) as { userId: string }
      const user = await User.findById(payload.userId)

      return { user }
    } catch {
      return { user: null }
    }
  },
})

app.use(cors());
app.use("/graphql", yoga as any);

app.listen(5000, () => {
  console.log("🚀 GraphQL Yoga running at http://localhost:5000/graphql");
});
