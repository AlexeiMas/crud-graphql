const {model, Schema} = require('mongoose')

const MovieSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  directorId: {
    type: Schema.Types.ObjectId,
    ref: 'Director',
    required: true
  },
  watched: {
    type: Boolean,
    default: false,
    required: true
  },
  rate: {
    type: Number,
    default: 0
  }
})

module.exports = model('Movie', MovieSchema)