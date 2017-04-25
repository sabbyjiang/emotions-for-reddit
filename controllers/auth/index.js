const router = require('express').Router();
const {getAuth, refreshToken, getSnoowrap, getSubscriptions, getSubredditPosts, cleanRedditData, getMassSubredditPosts, getHotForRadar} = require('../../models/reddit-functions');
const {getTone, getToneIndSub, getToneMassSub} = require('../../models/watson-functions');
const {cleanData, cleanForRadar, cleanSRArrayForWatson} = require('../../models/gen-functions');

// Reminder: all cookies are parsed already 

// data for radar chart
router.get('/radar', getSnoowrap, getMassSubredditPosts, getHotForRadar, cleanSRArrayForWatson, getToneMassSub, cleanForRadar, (req, res) => {
  const results = req.cleaned;
  res.json(results);
});

// no longer used but keep this around for refreshing the token
router.get('/refresh', refreshToken, (req, res) => {
  const reddit = req.reddit;
  res.cookie('access', reddit.access_token);
  res.json('success');
});

// gets subreddit's user is subscribed to
router.get('/get-subscriptions', getSnoowrap, getSubscriptions, (req, res) => {
  const listing = req.listing;
  res.json(listing);
});

// gets posts for the subreddit
router.get('/get-subreddit-posts', getSnoowrap, getSubredditPosts, (req, res) => {
  const posts = req.listing;
  res.json(posts);
});

// Analysis for the data a subreddit
router.get('/analysis', getSnoowrap, getSubredditPosts, cleanRedditData, getTone, cleanData, (req, res) => {
  const results = req.results;
  res.json(results);
});

// hacky way of logging out... just clears the cookies
router.get('/logout', (req, res) => {
  res.cookie('access', "");
  res.cookie('refresh', "");
  res.cookie('connect.sid', "");
  res.redirect('/');
})

// the redirect route for getting authorisation! 
// Change this if the redirect URL is changed in reddit
router.get('/', getAuth, (req, res) => {
  const reddit = req.reddit;
  res.cookie('access', reddit.access_token);
  res.cookie('refresh', reddit.refresh_token);
  res.redirect('/home');
});

module.exports = router;