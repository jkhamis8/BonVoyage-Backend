const mongoose = require("mongoose");

const entrySchema =  new mongoose.Schema({
  title: { type: String, required: true },
  date: {
    type: Date,
  },
  images: {
    type: String,
  },
  rate: {
    type: Number,
  },
  location: {
    type: String,
  },
  to_do: {
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
