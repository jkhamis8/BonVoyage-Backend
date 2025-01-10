const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const usersRouter = require('./controllers/user');
const journeyRouter = require('./controllers/journey');
const entryRouter = require("./controllers/entry")
const cors = require('cors');

app.use(express.json());
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})

app.use(cors());

app.use('/user', usersRouter);
app.use('/journey', journeyRouter);
app.use("/entry", entryRouter)

app.listen(3000, () => {
  console.log("The express app is ready!")
})
