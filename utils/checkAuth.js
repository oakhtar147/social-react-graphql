const { AuthenticationError } = require("apollo-server-errors");
const jwt = require("jsonwebtoken");

module.exports = (req) => {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader) {
    const token = authorizationHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, "some-very-secret-key-somewhere");
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid token");
      }
    }
    throw new Error("Authentication token must be of type 'Bearer <token>'");
  }
  throw new Error("Authentication header must be provided");
};
