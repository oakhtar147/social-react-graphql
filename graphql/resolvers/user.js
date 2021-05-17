const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// USER RESOLVERS

module.exports = {
  Mutation: {
    async register(_, { input }, ctx) {
      const { username, email, password, confirmPassword } = input;
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await new ctx.models.User({
        username,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      }).save();

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        "some-very-secret-key-somewhere",
        { expiresIn: "1h" }
      );

      return { ...user._doc, id: user._id, token };
    },
  },
};
