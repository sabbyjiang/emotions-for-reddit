const router = require('express').Router();
const {redditHot, redditTop} = require('../../models/reddit-functions');
const {getTone} = require('../../models/watson-functions');
// All routes inside here are for ~/api/gen

router.get('/hot', redditHot, getTone, (req, res) => {
  const results = req.results;
  res.json({results});
})

router.get('/top', redditHot, getTone, (req, res) => {
  const results = req.results;
  res.json({results});
});

module.exports = router;