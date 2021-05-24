import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Confirm } from "semantic-ui-react";
import { withRouter } from "react-router";

import {
  DELETE_POST,
  DELETE_COMMENT,
  GET_POSTS,
  GET_POST,
} from "../utils/graphql";

function DeleteButton({ id, commentId, match, history }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST, {
    variables: { postId: id },
    update(client, _) {
      const { getPosts: posts } = client.readQuery({ query: GET_POSTS });
      const updatedPosts = posts.filter((post) => post.id !== id);

      client.writeQuery({
        query: GET_POSTS,
        data: { getPosts: updatedPosts },
      });
    },
    optimisticResponse: {
      __typename: "Mutation",
      deletePost: {
        __typename: "Post",
        id: Math.round(Math.random() * 1000000) + "",
      },
    },
  });

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    variables: { postId: id, commentId },
    update(cache, _) {
      const { getPost: post } = cache.readQuery({
        query: GET_POST,
        variables: { postId: id },
      });
      const updatedComments = post.comments.filter(
        (comment) => comment.id !== commentId
      );

      cache.writeQuery({
        query: GET_POST,
        data: { getPost: { ...post, comments: updatedComments } },
      });
    },
  });

  function redirectCallback() {
    return () => history.push("/");
  }

  function deletePostOrCommentWrapper() {
    if (commentId) {
      deleteComment();
      return;
    }
    deletePost();
    // if single post page -> redirect to home page
    if (match.params.postId) redirectCallback()();
  }

  return (
    <>
      <Button
        as="div"
        color="red"
        onClick={() => setConfirmOpen(true)}
        icon="trash"
        floated="right"
      />
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrCommentWrapper}
      />
    </>
  );
}

export default withRouter(DeleteButton);
