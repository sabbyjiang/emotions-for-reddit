const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      logger = require('morgan'),
      snoowrap = require('snoowrap'),
      dotenv = require('dotenv').config(),
      watson = require('watson-developer-cloud'),
      Promise = require('bluebird'),
      cookieParser = require('cookie-parser'),
      PORT = process.env.PORT || 8080;

app.use(cors());
app.use(logger('dev'));

app.use(express.static('build'));
app.use(require('./router'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})