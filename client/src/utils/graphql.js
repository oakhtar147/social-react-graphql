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
