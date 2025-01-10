const mongoose = require('mongoose')

const journeySchema = new mongoose.Schema({
  name: { type: String, required: true },
  destination: {
    type: String,
  },
  start_data: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  people: {
    type: Number,
  },
  notes: {
    type: String,
  },
  activities: {
    type: String,
  },
  budget: {
    type: Number,
  },
  Emeregency_numbers: {
    type: String,
  },
  map_link: {
    type: String,
  },
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

})

const Journey = mongoose.model('Journey', journeySchema)
module.exports = Journey