const mongoose = require('mongoose');
const { mongoURL } = require('../config');

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

// Connect to MongoDB
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log(`Connected to ${mongoURL}`);
  })
  .catch(err => {
    console.log(`Error on Connecting to ${mongoURL}`);
    console.error(err);
  });