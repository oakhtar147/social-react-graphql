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
    token: String
    createdAt: String!
  }

  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
    comments: [Comment]!
    likes: [Like]!
    commentCount: Int!
    likeCount: Int!
  }

  type Comment {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }

  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }

  type Query {
    getPosts: [Post!]!
    getPost(postId: String!): Post!
    getUsers: [User!]!
  }

  type Mutation {
    registerUser(input: RegisterInput!): User!
    loginUser(input: LoginInput!): User
    createPost(body: String!): Post!
    deletePost(postId: String!): Post!
    deletePosts: String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: String!, commentId: String!): Post!
    likePost(postId: String!): Post!
  }
`;

module.exports = typeDefs;
