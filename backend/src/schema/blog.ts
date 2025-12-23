import { gql } from 'graphql-tag';

export const blogTypeDefs = gql`
  type Recommend {
    id:ID!
    content:String!
    author:User!
  }

  type Blog {
    id: ID!
    author: User!
    title: String!
    content: String!
    recommends:[Recommend!]!
  }

  type Query {
    blogs: [Blog!]!
    blog(id: ID!): Blog
  }

  extend type Mutation {
    addBlog(title: String!, content: String!):Blog!
    addRecommend(id: ID!, content:String!): Blog!
  }
`;
