const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      dotenv = require('dotenv').config(),
      session = require('express-session'),
      PORT = process.env.PORT || 8080;

app.use(logger('dev'));

app.use(express.static('dist'));
app.use(require('./router'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})