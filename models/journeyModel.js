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
    type: Double,
  },
  Emeregency_numbers: {
    type: String,
  },
  map_link: {
    type: String,
  },

})

const Journey = mongoose.model('Journey', journeySchema)
module.exports = Journey