import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import { createYoga, createSchema } from "graphql-yoga";

import { blogTypeDefs } from "./schema/blog.js";
import { authTypeDefs } from "./schema/auth.js";
import { blogResolvers } from "./schema/blog.resolvers.js";
import { authResolvers } from "./schema/auth.resolver.js";
import { gql } from "graphql-tag";

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
const yoga = createYoga({
  schema,
  context: () => ({}),
});

app.use(cors());
app.use("/graphql", yoga);

app.listen(5000, () => {
  console.log("🚀 GraphQL Yoga running at http://localhost:5000/graphql");
});
