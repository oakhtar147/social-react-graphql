import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";
import moment from "moment";

import LikeButton from "./LikeButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "./DeleteButton";

function PostCard({ post }) {
  const { user } = useContext(AuthContext);
  const { id, body, username, createdAt, likeCount, commentCount, likes } =
    post;

  const commentOnPost = () => {
    console.log("Commented on Post");
  };

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton details={{ user, id, likeCount, likes }} />
        <Button as="div" labelPosition="right">
          <Button color="blue" basic onClick={commentOnPost}>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && <DeleteButton id={id} />}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
