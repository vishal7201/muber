const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const app = express();

mongoose.Promise = global.Promise;

if(process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/muber');
  mongoose.connection
    .once('open', () => console.log('connected'))
    .on('error', (error) => {
      console.warn('warning', error);
    });
}


app.use(bodyParser.json());

routes(app);

// middleware to handle errors
app.use((err, req, res, next) => {
  res.status(422).send({error: err.message});
});

module.exports = app;
