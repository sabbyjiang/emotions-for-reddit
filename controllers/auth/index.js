const router = require('express').Router();
const {getAuth, refreshToken} = require('../../models/reddit-functions');

// Reminder: all cookies are parsed already 

router.get('/refresh', refreshToken, (req, res) => {
  const reddit = req.reddit;
  res.cookie('access', reddit.access_token);
  res.json('success');
});

router.get('/', getAuth, (req, res) => {
  const reddit = req.reddit;
  res.cookie('access', reddit.access_token);
  res.cookie('refresh', reddit.refresh_token);
  res.redirect('/');
});


module.exports = router;