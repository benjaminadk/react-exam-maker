function createEP(s, m, e) {
  return { success: s, message: m, exam: e }
}

let totalCount = 0

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
    },

    publicExams: async (root, args, { models }) => {
      return await models.Exam.find({ public: true })
    },

    publicExamsPag: (root, { first, after, search }, { models }) => {
      let edgesArray = []
      let cursorNumeric = parseInt(Buffer.from(after, 'base64').toString('ascii'))
      let re = search ? new RegExp(`${search}`, 'gi') : /\w/g

      if (!cursorNumeric) cursorNumeric = 0
      var edgesAndPageInfoPromise = new Promise((resolve, reject) => {
        let edges = models.Exam.where('id')
          .gt(cursorNumeric)
          .find({ public: true, title: re }, (error, result) => {
            if (error) console.log(`***Error - ${error}`)
          })
          .limit(first)
          .sort({ title: 1 })
          .cursor()

        edges.on('data', response => {
          let { id, public, author, title, code, pass, time, cover, test } = response
          edgesArray.push({
            cursor: Buffer.from(id.toString()).toString('base64'),
            node: {
              id,
              public,
              author,
              title,
              code,
              pass,
              time,
              cover,
              test
            }
          })
        })

        edges.on('error', error => reject(error))

        edges.on('end', () => {
          let endCursor = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : NaN
          let hasNextPage = new Promise((resolve, reject) => {
            if (endCursor) {
              let endCursorNumeric = parseInt(Buffer.from(endCursor, 'base64').toString('ascii'))
              models.Exam.where('id')
                .gt(endCursorNumeric)
                .estimatedDocumentCount((error, count) => {
                  count > 0 ? resolve(true) : resolve(false)
                })
            } else {
              resolve(false)
            }
          })

          resolve({
            edges: edgesArray,
            pageInfo: {
              endCursor,
              hasNextPage
            }
          })
        })
      })

      let totalPromiseCount = new Promise((resolve, reject) => {
        if (totalCount === 0) {
          totalCount = models.Exam.estimatedDocumentCount((error, count) => {
            if (error) reject(error)
            resolve(count)
          })
        } else {
          resolve(totalCount)
        }
      })

      let returnValue = Promise.all([edgesAndPageInfoPromise, totalPromiseCount]).then(values => {
        return {
          edges: values[0].edges,
          totalCount: values[1],
          pageInfo: {
            endCursor: values[0].pageInfo.endCursor,
            hasNextPage: values[0].pageInfo.hasNextPage
          }
        }
      })

      return returnValue
    }
  },

  Mutation: {
    saveExam: async (root, { input }, { models }) => {
      const { examId, author, title, code, pass, time, cover, test } = input
      let exam = await models.Exam.findOne({ id: examId })
      if (!exam) {
        let newExam = new models.Exam({
          public: false,
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
        let filter = { id: exam.id }
        let update = { $set: { title, code, pass, time, cover, test } }
        let options = { new: true }
        try {
          await models.Exam.findOneAndUpdate(filter, update, options)
          let updateExam = await models.Exam.findOne({ id: exam.id })
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
        await models.Exam.findOneAndDelete({ id: examId })
        return createEP(true, 'Exam Deleted Successfully', null)
      } catch (error) {
        return createEP(false, 'Error Deleting Exam', null)
      }
    },

    makePublic: async (root, { examId, bool }, { models }) => {
      let filter = { id: examId }
      let update = { $set: { public: !bool } }
      try {
        await models.Exam.findOneAndUpdate(filter, update)
        return createEP(true, `Exam Made ${bool ? 'Private' : 'Public'}`, null)
      } catch (error) {
        return createEP(false, 'Error Making Public', null)
      }
    }
  }
}
