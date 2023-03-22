const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user.id });
      }
      throw new AuthenticationError("You must login to see your books!");
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No profile attached to this email!");
      }

      const correctPassword = await User.findOne({ password });
      if (!correctPassword) {
        throw new AuthenticationError("Incorrect password! Try again!");
      }

      const jwToken = signToken(user);
      return { jwToken, user };
    },

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const jwToken = signToken(user);

      return { jwToken, user };
    },

    saveBook: async (parent, { userId, bookId, authors, description, title, string, image, link }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { savedBooks: {bookId, authors, description, title, string, image, link} } },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You must be logged in to save books!");
    },
    removeBook: async (parent, { userId, bookId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          { $pull: { savedBooks: bookId } },
          {
            new: true,
          }
        );
      }
      throw new AuthenticationError("You need to remove books!");
    },
  },
};

module.exports = resolvers; 