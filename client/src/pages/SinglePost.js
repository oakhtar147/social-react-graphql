import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Button, Card, Grid, Icon, Image, Label } from "semantic-ui-react";
import moment from "moment";

import { GET_POST } from "../utils/graphql";
import Loader from "../components/Loader";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";

export function SinglePost({ match }) {
  const user = useContext(AuthContext);

  const { postId } = match.params;
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { postId },
  });

  if (loading) return <Loader />;
  if (error) return <p>Error</p>;

  console.log(data);

  const {
    username,
    body,
    createdAt,
    likes,
    likeCount,
    comments,
    commentCount,
  } = data.getPost;

  const post = (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image
            src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
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
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
