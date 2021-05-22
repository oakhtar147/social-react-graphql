import React, { useState, useContext } from "react";
import { gql } from "@apollo/client";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { useForm } from "../utils/useForm";
import { AuthContext } from "../context/auth";
import { LOGIN_USER } from "../utils/graphql";

export function Login({ history }) {
  const initialValues = {
    username: "",
    password: "",
  };
  const { onChange, onSubmit, values } = useForm(wrapLoginUser, initialValues);
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      context.login(result.data.loginUser);
      history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: { loginInfo: values },
  });

  function wrapLoginUser() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          value={values.username}
          error={!!errors.username}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={values.password}
          error={!!errors.password}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
