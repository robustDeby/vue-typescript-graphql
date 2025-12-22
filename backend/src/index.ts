import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config'
import { createYoga, createSchema } from 'graphql-yoga';

import { blogTypeDefs } from './schema/blog.js';
import { authTypeDefs } from './schema/auth.js';
import { blogResolvers } from './schema/blog.resolvers.js';
import { authResolvers } from './schema/auth.resolver.js';

const app = express();

// MongoDB connection
await mongoose.connect('mongodb+srv://wiktor:1212@working.9ariusi.mongodb.net/?appName=Working');

// GraphQL schema
const schema = createSchema({
  typeDefs:[authTypeDefs,blogTypeDefs],
  resolvers:[authResolvers,blogResolvers],
});

// Yoga server
const yoga = createYoga({
  schema,
  context: () => ({}),
});

app.use(cors());
app.use('/graphql', yoga);

app.listen(4000, () => {
  console.log('🚀 GraphQL Yoga running at http://localhost:4000/graphql');
});

