import { gql } from 'graphql-tag';

export const blogTypeDefs = gql`
  type Recomment {
    id:ID!
    content:String!
    author:User!
  }

  type Blog {
    id: ID!
    author: User!
    title: String!
    content: String!
    recomments:[Recomment!]!
  }

  type Query {
    blogs: [Blog!]!
    blog(id: ID!): Blog
  }

  extend type Mutation {
    addBlog(title: String!, content: String!):Blog!
    addRecomment(id: ID!, content:String!): Blog!
  }
`;
