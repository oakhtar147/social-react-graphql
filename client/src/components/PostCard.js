import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";
import moment from "moment";

function PostCard({ post }) {
  const { id, body, username, createdAt, likeCount, commentCount, likes } =
    post;

  const likePost = () => {
    console.log("Post Liked");
  };

  const commentOnPost = () => {
    console.log("Commented on Post");
  };

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right">
          <Button color="teal" basic onClick={likePost}>
            <Icon name="heart" />
          </Button>
          <Label basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right">
          <Button color="blue" basic onClick={commentOnPost}>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
