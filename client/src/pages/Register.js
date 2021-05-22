import React, { useState, useContext } from "react";
import { gql } from "@apollo/client";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { useForm } from "../utils/useForm";
import { AuthContext } from "../context/auth";

export function Register({ history }) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { onChange, onSubmit, values } = useForm(registerUser, initialValues);

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      context.login(result.data.registerUser);
      history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: { userInfo: values },
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading && "loading"}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          value={values.username}
          error={!!errors.username}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          value={values.email}
          error={!!errors.email}
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
        <Form.Input
          label="Re-enter Password"
          placeholder="Password Again"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={!!errors.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
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

const REGISTER_USER = gql`
  mutation REGISTER($userInfo: RegisterInput!) {
    registerUser(input: $userInfo) {
      token
      id
      username
      createdAt
    }
  }
`;
