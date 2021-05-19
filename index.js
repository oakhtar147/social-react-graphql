const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

const User = require("./models/user");
const Post = require("./models/post");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    req,
    models: {
      User,
      Post,
    },
  }),
});

mongoose
  .connect(
    "mongodb+srv://osama:osama123@cluster0.sm2lt.mongodb.net/social?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => server.listen())
  .then(({ url }) => console.log(`Server at ${url}\nDatabase connected`));
