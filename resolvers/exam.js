module.exports = {
  Query: {
    allExams: async (root, args, { models }) => {
      return await models.Exam.find()
    },
    myExams: async (root, args, { models, user }) => {
      return await models.Exam.find({ author: user.username })
    }
  },

  Mutation: {
    createExam: async (root, { input }, { models }) => {
      const { author, title, code, pass, time, cover, test } = input
      const exam = new models.Exam({
        author,
        title,
        code,
        pass,
        time,
        cover,
        test
      })
      try {
        const savedExam = await exam.save()
        return {
          success: true,
          message: 'Exam Created',
          exam: savedExam
        }
      } catch (error) {
        console.log(error)
        return {
          success: false,
          message: 'Error Creating Exam',
          exam: null
        }
      }
    }
  }
}
