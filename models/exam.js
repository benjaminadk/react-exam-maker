const mongoose = require('mongoose')
const { Schema } = mongoose

const testItemSchema = new Schema({
  variant: Number,
  question: [{ variant: Number, text: String }],
  choices: [{ label: String, text: String }],
  answer: [Boolean],
  explanation: [{ variant: Number, text: String }]
})

const examSchema = new Schema({
  author: String,
  title: String,
  code: String,
  pass: Number,
  time: Number,
  cover: [{ variant: Number, text: String }],
  test: [
    {
      variant: Number,
      question: [{ variant: Number, text: String }],
      choices: [{ label: String, text: String }],
      answer: [Boolean],
      explanation: [{ variant: Number, text: String }]
    }
  ]
})

mongoose.model('exam', examSchema)
