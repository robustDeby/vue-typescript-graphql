import { gql } from 'graphql-tag';

export const authTypeDefs = gql`
    type User {
        id:ID!
        name:String!
        avatar:String!
        birthday:String!
        email:String!
    }

    type AuthPayload {
        token:String!
        user:User!
    }

    extend type Mutation {
        register(
            name:String!
            avatar:String
            birthday:String!
            email:String!
            password:String!
            confirmPassword:String!
        ):AuthPayload!

        login(
            email:String!
            password:String!
        ):AuthPayload!
    }
`