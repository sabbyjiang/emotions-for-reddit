const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      passport = require('passport'),
      crypto = require('crypto'),
      dotenv = require('dotenv').config(),
      RedditStrategy = require('passport-reddit').Strategy,
      session = require('express-session'),
      PORT = process.env.PORT || 8080;

// var compiler = webpack(config);

app.use(cors());
app.use(logger('dev'));

app.use(express.static('build'));
app.use(require('./router'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());

app.use(session({ 
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})