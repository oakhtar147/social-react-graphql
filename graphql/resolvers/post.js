module.exports = {
  Query: {
    async getPosts(_, __, ctx) {
      try {
        const posts = await ctx.models.Post.find({});
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
