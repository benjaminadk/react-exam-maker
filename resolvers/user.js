module.exports = {
  Query: {
    userById: async (root, { userId }, { models }) => await models.User.findById(userId)
  },

  Mutation: {
    autoLogin: async (root, args, { models, user }) => {
      if (user) {
        return {
          success: true,
          message: `${user.username} Logged In`,
          user
        }
      } else {
        return {
          success: false,
          message: 'Invalid Authorization Token',
          user: null
        }
      }
    }
  }
}
