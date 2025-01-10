const mongoose = require('mongoose')

const journeySchema = new mongoose.Schema({
  title: { type: String, required: true },
  destination: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  people: {
    type: Number,required: true
  },
  budget: {
    type: Number,
  },
  notes: {
    type: String,
  },
  activities: {
    type: String,
  },
  emergencyNumbers: {
    type: String,
  },
  coverImage: {
    type: String,
  },
  mapLink: {
    type: String,
  }

})

const Journey = mongoose.model('Journey', journeySchema)
module.exports = Journey