import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { Button, Icon, Label } from "semantic-ui-react";

import { LIKE_POST } from "../utils/graphql";

function LikeButton({ details: { user, id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: id },
  });

  const likePostEffects = () => {
    likePost();
    setLiked((prevState) => !prevState);
  };

  const likeButton = user ? (
    liked ? (
      <Button color="teal" onClick={likePostEffects}>
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic onClick={likePostEffects}>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button color="teal" basic as={Link} to="/login">
      <Icon name="heart" />
    </Button>
  );

  return (
    <>
      <Button as="div" labelPosition="right">
        {likeButton}
        <Label basic color="teal" pointing="left">
          {likeCount}
        </Label>
      </Button>
    </>
  );
}

export default LikeButton;
