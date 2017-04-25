const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      dotenv = require('dotenv').config(),
      session = require('express-session'),
      PORT = process.env.PORT || 8080;

// var compiler = webpack(config);

app.use(logger('dev'));

app.use(express.static('build'));
app.use(require('./router'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})