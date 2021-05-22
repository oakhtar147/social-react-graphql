import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";

import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { AuthContext } from "../context/auth";

import { GET_POSTS } from "../utils/graphql";
import Loader from "../components/Loader";

export function Home() {
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useQuery(GET_POSTS);

  if (loading || !data) return <Loader />;
  if (error) return <p>Error</p>;

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading Posts...</h1>
        ) : (
          data.getPosts &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}
