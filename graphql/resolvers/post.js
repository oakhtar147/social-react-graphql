const { AuthenticationError, UserInputError } = require("apollo-server-errors");

const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Query: {
    async getPosts(_, __, ctx) {
      try {
        const posts = await ctx.models.Post.find({}).sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getPost(_, { postId }, ctx) {
      try {
        const post = await ctx.models.Post.findById(postId);
        return post;
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createPost(_, { body }, ctx) {
      const user = checkAuth(ctx.req);

      if (body.trim() === "") {
        throw new UserInputError("Post cannot be empty", {
          message: "Post cannot be empty",
        });
      }

      try {
        const post = await new ctx.models.Post({
          body,
          username: user.username,
          user: user.id,
          createdAt: new Date().toISOString(),
        }).save();

        return post;
      } catch (err) {
        throw new Error(err);
      }
    },

    async deletePosts(_, __, ctx) {
      await ctx.models.Post.deleteMany();
      return "Deleted";
    },

    async deletePost(_, { postId }, ctx) {
      const user = checkAuth(ctx.req);

      try {
        const post = await ctx.models.Post.findById(postId);

        if (user.username !== post.username) {
          throw new AuthenticationError("Cannot delete post", {
            message: "You are not authorized to delete this post.",
          });
        }

        await ctx.models.Post.deleteOne({ _id: post._id });
        return post;
      } catch (err) {
        throw new Error(err);
      }
    },

    async likePost(_, { postId }, ctx) {
      const user = checkAuth(ctx.req);

      const post = await ctx.models.Post.findById(postId);

      if (post) {
        const index = post.likes.findIndex(
          (like) => like.username === user.username
        );
        if (index > -1) {
          // remove user's like
          post.likes.splice(index, 1);
        } else {
          // add user's like
          post.likes.unshift({
            username: user.username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      }
      throw new UserInputError("Post not found");
    },
  },
};
