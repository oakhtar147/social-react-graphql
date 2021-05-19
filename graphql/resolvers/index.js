const userResolvers = require("./user");
const postResolvers = require("./post");
const commentResolvers = require("./comment");

module.exports = {
  Query: {
    ...userResolvers.Query,
    ...postResolvers.Query,
  },

  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
  },

  Post: {
    commentCount(post) {
      return post.comments.length;
    },
    likeCount(post) {
      return post.likes.length;
    },
  },
};
