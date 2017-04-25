const router = require('express').Router();
const {getSnoowrap, redditHot, redditTop} = require('../../models/reddit-functions');
const {getTone} = require('../../models/watson-functions');
const {cleanData} = require('../../models/gen-functions');
// All routes inside here are for ~/api/gen

router.get('/hot', getSnoowrap, redditHot, getTone, cleanData, (req, res) => {
    const results = req.results;
    res.json(results);
});

router.get('/top', getSnoowrap, redditTop, getTone, cleanData, (req, res) => {
  const results = req.results;
  res.json(results);
});

module.exports = router;