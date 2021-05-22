import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query getPosts {
    getPosts {
      id
      username
      body
      createdAt
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
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
  }
`;
