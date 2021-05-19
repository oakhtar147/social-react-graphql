const { UserInputError, AuthenticationError } = require("apollo-server-errors");

const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, ctx) {
      const user = checkAuth(ctx.req);
      if (body.trim() === "")
        throw new UserInputError("Empty comment", {
          error: "Cannot submit empty comment ",
        });

      try {
        const post = await ctx.models.Post.findByIdAndUpdate(
          postId,
          {
            $push: {
              comments: [
                {
                  body,
                  createdAt: new Date().toISOString(),
                  username: user.username,
                },
              ],
            },
          },
          { new: true }
        );
        return post;
      } catch (err) {
        throw new Error(err);
      }
    },

    async deleteComment(_, { postId, commentId }, ctx) {
      const user = checkAuth(ctx.req);

      const post = await ctx.models.Post.findById(postId);
      if (post) {
        const index = post.comments.findIndex(
          (comment) => comment.id === commentId
        );

        if (index > -1 && post.comments[index].username === user.username) {
          post.comments.splice(index, 1);
          await post.save();
          return post;
        }
        throw new AuthenticationError("You are not authorized");
      }
      throw new UserInputError("Post not found");
    },
  },
};
