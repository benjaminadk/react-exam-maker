const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const { Schema } = mongoose

const examSchema = new Schema({
  public: Boolean,
  author: String,
  title: String,
  code: String,
  pass: Number,
  time: Number,
  image: String,
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

examSchema.plugin(AutoIncrement, { inc_field: 'id' })
mongoose.model('exam', examSchema)
