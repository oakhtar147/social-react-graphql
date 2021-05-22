const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    "some-very-secret-key-somewhere",
    { expiresIn: "1h" }
  );
}

module.exports = {
  // Query: {
  //   getUsers(_, __, ctx) {
  //     return ctx.models.User.find();
  //   },
  // },

  Mutation: {
    async registerUser(_, { input }, ctx) {
      const { valid, errors } = validateRegisterInput(input);

      if (!valid) {
        throw new UserInputError(errors, {
          errors,
        });
      }

      const { username, email, password } = input;
      const hashedPassword = await bcrypt.hash(password, 12);

      const userNameExists = await ctx.models.User.findOne({ username });

      if (userNameExists) {
        throw new UserInputError("Username already exists", {
          errors: {
            username: "Username is taken",
          },
        });
      }

      const user = await new ctx.models.User({
        username,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      }).save();

      const token = generateToken(user);

      return { ...user._doc, id: user._id, token };
    },

    async loginUser(_, { input }, ctx) {
      const { valid, errors } = validateLoginInput(input);

      if (!valid) {
        throw new UserInputError(errors, {
          errors,
        });
      }

      const { username, password } = input;
      const userExists = await ctx.models.User.findOne({ username });

      if (!userExists) {
        errors.general = "User not found";
        throw new UserInputError(errors, {
          errors,
        });
      }

      const user = await ctx.models.User.findOne({
        username,
      });

      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const token = generateToken(user);
        return { ...user._doc, id: user._id, token };
      }

      errors.noMatch = "Username or password is incorrect";
      throw new UserInputError(errors.noMatch, { errors });
    },
  },
};
