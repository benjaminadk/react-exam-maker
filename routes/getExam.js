const models = require('../models')

module.exports = async (req, res) => {
  let exam = await models.Exam.findById(req.query.examId)
  res.json(exam)
}
