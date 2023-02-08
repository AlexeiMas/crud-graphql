const {model, Schema} = require('mongoose')

const DirectorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
})

module.exports = model('Director', DirectorSchema)