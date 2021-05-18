const { gql } = require("apollo-server");

const typeDefs = gql`
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type User {
    id: ID!
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
    getPosts: [Post!]!
  }

  type Mutation {
    registerUser(input: RegisterInput!): User!
    loginUser(input: LoginInput!): User
  }
`;

module.exports = typeDefs;
