import { gql } from "graphql-tag";

export const authTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    avatar: String
    birthday: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
  input RegisterInput {
    name: String!
    email: String!
    birthday: String!
    password: String!
    avatar: String
  }
  input LoginInput {
    email: String!
    password: String!
  }

  extend type Mutation {
    register(input: RegisterInput!): AuthPayload!

    login(input: LoginInput!): AuthPayload!
  }
`;
