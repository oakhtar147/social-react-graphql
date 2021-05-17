const { gql } = require("apollo-server");

const typeDefs = gql`
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  type User {
    username: String!
    email: String!
    password: String!
    token: String!
    createdAt: String!
  }

  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }

  type Query {
    getPosts: [Post!]
  }

  type Mutation {
    register(input: RegisterInput!): User!
  }
`;

module.exports = typeDefs;
