import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  Button,
  Card,
  Grid,
  Icon,
  Image,
  Label,
  Form,
} from "semantic-ui-react";
import moment from "moment";

import { GET_POST, CREATE_COMMENT } from "../utils/graphql";
import Loader from "../components/Loader";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";

export function SinglePost({ match }) {
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(AuthContext);
  const { postId } = match.params;

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { postId },
  });

  const [addComment] = useMutation(CREATE_COMMENT, {
    variables: { postId, body: newComment },
    update(cache, { data: createComment }) {
      setNewComment("");
      const { getPost: post } = cache.readQuery({
        query: GET_POST,
        variables: { postId },
      });

      console.log(createComment);
      const updatedComments = [createComment.createComment, ...post.comments];

      cache.writeQuery({
        query: GET_POST,
        data: {
          getPost: {
            ...post,
            comments: updatedComments,
            commentCount: post.commentCount + 1,
          },
        },
      });
    },
  });

  if (loading) return <Loader />;
  if (error) return <p>Error</p>;

  const {
    username,
    body,
    createdAt,
    likes,
    likeCount,
    comments,
    commentCount,
  } = data.getPost;

  console.log(comments.slice(1));

  function optimisticCreateComment() {
    addComment();
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image
            src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
            floated="right"
            size="small"
          />
        </Grid.Column>
        <Grid.Column fluid width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>
            <hr />
            <Card.Content extra>
              <LikeButton details={{ id: postId, user, likes, likeCount }} />
              <Button
                as="div"
                labelPosition="right"
                onClick={() => console.log("COMMENT etc.")}
              >
                <Button basic color="blue">
                  <Icon name="comments" />
                </Button>
                <Label basic color="blue" pointing="left">
                  {commentCount}
                </Label>
              </Button>
              {user && user.username === username && (
                <DeleteButton id={postId} />
              )}
            </Card.Content>
          </Card>
          {user && (
            <Card fluid>
              <p>Comment</p>
              <Form>
                <div className="ui action input fluid">
                  <input
                    type="text"
                    placeholder="Comment..."
                    name="comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={newComment.trim() === ""}
                  onClick={optimisticCreateComment}
                >
                  Submit
                </button>
              </Form>
            </Card>
          )}
          {comments.map((comment) => (
            <Card fluid key={comment.id}>
              <Card.Content>
                {user && user.username === comment.username && (
                  <DeleteButton id={postId} commentId={comment.id} />
                )}
                <Card.Header>{comment.username}</Card.Header>
                <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                <Card.Description>{comment.body}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
