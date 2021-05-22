import React, { useContext } from "react";
import { Button, Form, TextArea } from "semantic-ui-react";
import { useMutation, gql } from "@apollo/client";
import moment from "moment";

import { useForm } from "../utils/useForm";
import { GET_POSTS, CREATE_POST } from "../utils/graphql";
import { AuthContext } from "../context/auth";

function PostForm() {
  const initialValues = {
    body: "",
  };

  const {
    user: { username },
  } = useContext(AuthContext);
  const { onChange, onSubmit, values } = useForm(wrapCreatePost, initialValues);

  const [createPost, newPost] = useMutation(CREATE_POST, {
    update(cache, { data: createPost }) {
      const data = cache.readQuery({
        query: GET_POSTS,
      });

      const updatedPosts = [createPost.createPost, ...data.getPosts];

      cache.writeQuery({
        query: GET_POSTS,
        data: { getPosts: updatedPosts },
      });
      values.body = "";
    },
    variables: values,
    optimisticResponse: {
      __typename: "Mutation",
      createPost: {
        __typename: "Post",
        id: Math.round(Math.random() * -1000000) + "",
        username: username,
        body: values.body,
        createdAt: moment(new Date()).fromNow(),
        comments: [],
        commentCount: 0,
        likes: [],
        likeCount: 0,
      },
    },
  });

  function wrapCreatePost() {
    createPost();
  }

  if (newPost.error) return <p>Error</p>;

  return (
    <Form onSubmit={onSubmit} className={newPost.loading ? "loadng" : ""}>
      <h2 style={{ marginTop: 0 }}>Create A Post</h2>
      <TextArea
        name="body"
        placeholder="Hi World!"
        onChange={onChange}
        value={values.body}
        style={{ minHeight: 80 }}
      />
      <Button type="submit" color="teal" style={{ margin: 10, float: "right" }}>
        Post
      </Button>
    </Form>
  );
}

export default PostForm;
