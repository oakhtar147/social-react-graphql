import React from "react";
import { Loader as LoadingIcon } from "semantic-ui-react";

function Loader() {
  return (
    <LoadingIcon
      size="massive"
      active
      inline="centered"
      style={{ margin: 100 }}
    >
      Fetching...
    </LoadingIcon>
  );
}

export default Loader;
