const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const JWTRouter = require('./controllers/jwt');
const usersRouter = require('./controllers/user');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());

const cors = require('cors');
const verifyToken = require('./middleware/verify-token');
app.use(cors());

app.use('/jwt', JWTRouter);
app.use('/user', usersRouter);
app.listen(3000, () => {
  console.log('The express app is ready!');
});
