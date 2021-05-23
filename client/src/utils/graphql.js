import { gql } from "@apollo/client";

// POST

const POST_DETAILS = gql`
  fragment postDetails on Post {
    id
    username
    body
    createdAt
    comments {
      id
      username
      body
      createdAt
    }
    commentCount
    likes {
      id
      username
      createdAt
    }
    likeCount
  }
`;

export const GET_POSTS = gql`
  query getPosts {
    getPosts {
      ...postDetails
    }
  }
  ${POST_DETAILS}
`;

export const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      ...postDetails
    }
  }
  ${POST_DETAILS}
`;

export const LIKE_POST = gql`
  mutation likePost($postId: String!) {
    likePost(postId: $postId) {
      id
      likeCount
      likes {
        id
        username
      }
    }
  }
`;

export const GET_POST = gql`
  query getPost($postId: String!) {
    getPost(postId: $postId) {
      ...postDetails
    }
  }
  ${POST_DETAILS}
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: String!) {
    deletePost(postId: $postId) {
      id
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        username
        body
        createdAt
      }
      commentCount
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($postId: String!, $commentId: String!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      commentCount
    }
  }
`;

// USER

const USER_ESSENTIALS = gql`
  fragment userEssentials on User {
    token
    id
    username
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($loginInfo: LoginInput!) {
    loginUser(input: $loginInfo) {
      ...userEssentials
    }
  }
  ${USER_ESSENTIALS}
`;

export const REGISTER_USER = gql`
  mutation registerUser($userInfo: RegisterInput!) {
    registerUser(input: $userInfo) {
      ...userEssentials
      createdAt
    }
  }
  ${USER_ESSENTIALS}
`;
