const router = require('express').Router();
const {redditHot, redditTop} = require('../../models/reddit-functions');
const {getTone} = require('../../models/watson-functions');
const {cleanData} = require('../../models/gen-functions');
// All routes inside here are for ~/api/gen

router.get('/hot', 
  redditHot, getTone, cleanData, 
  (req, res) => {
    if(req.error){
      const error = req.error;
      res.json({error});
    } else {
      const results = req.results;
      res.json(results);
    }
});

router.get('/top', redditTop, getTone, cleanData, (req, res) => {
  if(req.error){
      const error = req.error;
      res.json({error});
    } else {
      const results = req.results;
      res.json(results);
    }
});

module.exports = router;