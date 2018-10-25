function createEP(s, m, e) {
  return { success: s, message: m, exam: e }
}

module.exports = {
  Query: {
    allExams: async (root, args, { models }) => {
      return await models.Exam.find()
    },

    myExams: async (root, args, { models, user }) => {
      return await models.Exam.find({ author: user.id })
    },

    examById: async (root, { examId }, { models }) => {
      return await models.Exam.findById(examId)
    }
  },

  Mutation: {
    saveExam: async (root, { input }, { models }) => {
      const { examId, author, title, code, pass, time, cover, test } = input
      let exam = await models.Exam.findById(examId)
      if (!exam) {
        let newExam = new models.Exam({
          author,
          title,
          code,
          pass,
          time,
          cover,
          test
        })
        try {
          let savedExam = await newExam.save()
          return {
            success: true,
            message: 'Exam Created',
            exam: savedExam
          }
        } catch (error) {
          return {
            success: false,
            message: 'Error Creating Exam',
            exam: null
          }
        }
      } else {
        let filter = { _id: exam._id }
        let update = { $set: { title, code, pass, time, cover, test } }
        let options = { new: true }
        try {
          await models.Exam.findOneAndUpdate(filter, update, options)
          let updateExam = await models.Exam.findById(exam._id)
          return {
            success: true,
            message: 'Exam Saved',
            exam: updateExam
          }
        } catch (error) {
          return {
            success: false,
            message: 'Error Saving Exam',
            exam: null
          }
        }
      }
    },

    deleteExam: async (root, { examId }, { models }) => {
      try {
        await models.Exam.findOneAndDelete({ _id: examId })
        return createEP(true, 'Exam Deleted Successfully', null)
      } catch (error) {
        return createEP(false, 'Error Deleting Exam', null)
      }
    }
  }
}
