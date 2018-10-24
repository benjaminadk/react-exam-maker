const mongoose = require('mongoose')
const keys = require('../config')

const options = { useNewUrlParser: true }

const cb = () => console.log('MONGO CONNECTED')

module.exports = async () => {
  try {
    mongoose.connect(
      keys.MONGO_URI,
      options,
      cb
    )
    mongoose.Promise = global.Promise
    mongoose.set('debug', true)
    mongoose.set('useCreateIndex', true)
  } catch (error) {
    console.log(error)
  }
}
