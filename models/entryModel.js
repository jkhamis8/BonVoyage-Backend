const mongoose = require("mongoose")

const entrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: {
    type: String,
  },
  images: {
    type: String,
  },
  date: {
    type: Date,
  },

  rate: {
    type: Number,
  },
  activities: {
    type: String,
  },
  content: {
    type: String,
  },
  expense: {
    type: Number,
  },
  map_link: {
    type: String,
  },
})

const Entry = mongoose.model("Entry", entrySchema)
module.exports = Entry
