const router = require('express').Router();
const {redditHot, redditTop} = require('../../models/reddit-functions');
const {getTone} = require('../../models/watson-functions');
const {cleanData} = require('../../models/gen-functions');
const data = require('../../build/data/2017-04-23-14-13');
// All routes inside here are for ~/api/gen

router.get('/hot', 
  // redditHot, getTone, cleanData, 
  (req, res) => {
    // const results = req.results;
    const results = data;
    res.json(results);
})

router.get('/top', redditTop, getTone, cleanData, (req, res) => {
  const results = req.results;
  res.json(results);
});

module.exports = router;