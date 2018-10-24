const mongoose = require('mongoose')
require('./user')
require('./exam')
const User = mongoose.model('user')
const Exam = mongoose.model('exam')

module.exports = {
  User,
  Exam
}
