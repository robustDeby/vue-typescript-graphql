import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { createYoga, createSchema } from 'graphql-yoga';

import { typeDefs } from './schema/blog.js';
import { resolvers } from './schema/resolvers.js';

const app = express();

// MongoDB connection
await mongoose.connect('mongodb+srv://wiktor:1212@working.9ariusi.mongodb.net/?appName=Working');

// GraphQL schema
const schema = createSchema({
  typeDefs,
  resolvers,
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

