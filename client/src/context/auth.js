import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
};

if (localStorage.getItem("jwt")) {
  const decoded = jwtDecode(localStorage.getItem("jwt"));

  if (decoded.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwt");
  } else {
    initialState.user = decoded;
  }
}

// this is our initial state, this is what every component down the tree should have
// to identify a user's authentication status.
// it also has login() and logout() to be able to dispatch and manipulate the user.
const AuthContext = createContext({
  user: null,
  login: (payload) => {},
  logout: () => {},
});

// we used a reducer because we needed to handle TWO cases by which state can change
// reducers allow to split this logic easily by using actions etc.
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (payload) => {
    localStorage.setItem("jwt", payload.token);
    dispatch({ type: "LOGIN", payload });
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };

// HOW THIS ALL WORKS:

/**
 *
 * We have created a React Context which is like a global state you want a large number of components to share
 * This context is maintained by the Provider (each context has a Provider), this Provider has a value prop which
 * is the current state/value of the the context the components are sharing.
 *
 * In our case, the state has login() and logout() as well. When we use this context using useContext,
 * we can trigger the login() and logout()
 *
 * login() is connected to the useReducer which manipulates the context by authenticating the user
 * Once authenticated, the value in the Provider changes to this new user
 * And all the components connected via the Provider now share the same authenticated user
 *
 */
