import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Recommend {
    id:ID!
    content:String!
  }

  type Blog {
    id: ID!
    title: String!
    content: String!
    recommends:[Recommend!]!
  }

  type Query {
    blogs: [Blog!]!
    blog(id: ID!): Blog
  }

  type Mutation {
    addBlog(title: String!, content: String!):Blog!
    addRecommend(id: ID!, content:String!): [Blog!]!
  }
`;
