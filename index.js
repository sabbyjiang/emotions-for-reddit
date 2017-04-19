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

// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((obj, done) => {
//   done(null, obj);
// });

// passport.use(new RedditStrategy({
//     clientID: process.env.REDDIT_CLIENT_ID,
//     clientSecret: process.env.REDDIT_SECRET,
//     callbackURL: "http://localhost:8080/api/auth",
//   },
//   (accessToken, refreshToken, profile, done) => {
//     console.log(accessToken);
//     return done(null, profile);
//   }
// ));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})