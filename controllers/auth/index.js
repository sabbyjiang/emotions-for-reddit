const router = require('express').Router();
const {getAuth, refreshToken, getSnoowrap, getSubscriptions, getSubredditPosts, cleanRedditData, getMassSubredditPosts, getHotForRadar} = require('../../models/reddit-functions');
const {getTone, getToneIndSub, getToneMassSub} = require('../../models/watson-functions');
const {cleanData, cleanForRadar, cleanSRArrayForWatson} = require('../../models/gen-functions');

// Reminder: all cookies are parsed already 

router.post('/radar', getSnoowrap, getMassSubredditPosts, getHotForRadar, cleanSRArrayForWatson, getToneMassSub, cleanForRadar, (req, res) => {
  if(req.error){
    const error = req.error;
    res.json({error});
  } else {
    const results = req.cleaned;
    res.json(results);
  }
})

// router.get('/refresh', refreshToken, (req, res) => {
//   const reddit = req.reddit;
//   res.cookie('access', reddit.access_token);
//   res.json('success');
// });


router.get('/get-subscriptions', getSnoowrap, getSubscriptions, (req, res) => {
  if(req.error){
    console.log('rec of error 2');
    const error = req.error;
    res.json({error});
  } else {
    const listing = req.listing;
    res.json(listing);
  }
});

router.get('/get-subreddit-posts', getSnoowrap, getSubredditPosts, (req, res) => {
  if(req.error){
    const error = req.error;
    res.json({error});
  } else {
    const listing = req.listing;
    res.json(listing);
  }
});

router.get('/analysis', getSnoowrap, getSubredditPosts, cleanRedditData, getTone, cleanData, (req, res) => {
  if(req.error){
    const error = req.error;
    res.json({error});
  } else {
    const results = req.results;
    res.json(results);
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('access');
  res.clearCookie('refresh');
  res.clearCookie('connect.sid');
  res.redirect('/');
});

router.get('/', getAuth, (req, res) => {
  const reddit = req.reddit;
  res.cookie('access', reddit.access_token);
  res.cookie('refresh', reddit.refresh_token);
  res.redirect('/home');
});

module.exports = router;