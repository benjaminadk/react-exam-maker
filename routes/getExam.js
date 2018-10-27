const models = require('../models')

function removeTypename(obj) {
  Object.keys(obj).forEach(key1 => {
    key1 === '_id' && delete obj[key1]
    key1 === '__v' && delete obj[key1]
    Array.isArray(obj[key1]) &&
      obj[key1].forEach(el => {
        typeof el === 'object' && removeTypename(el)
      })
  })
  return obj
}

module.exports = async (req, res) => {
  let exam = await models.Exam.findById(req.query.examId)
  let str = JSON.stringify(exam)
  let payload = removeTypename(JSON.parse(str))
  res.send(payload)
}
