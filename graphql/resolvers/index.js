const postResolvers = require("./post");
const userResolvers = require("./user");

module.exports = {
  Query: {
    ...userResolvers.Query,
    ...postResolvers.Query,
  },

  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
  },
};
