const dotenv = require('dotenv').config(),
      watson = require('watson-developer-cloud'),
      Promise = require('bluebird');

// Sets up the tone_analyzer to be used
const tone_analyzer = watson.tone_analyzer({
  username: process.env.IBM_UN,
  password: process.env.IBM_PW,
  version: 'v3',
  version_date: '2016-05-19'
});

// Creates a promise out of this... because apparently it's not a promise to begin with
const promiseTone = Promise.promisify(tone_analyzer.tone, {context: tone_analyzer});

// maps over the reddit data and returns each tone analysis
const toneMap = (redditData) => {
  return redditData.map(post => {
    return promiseTone({text: post.title})
      .then(r => r)
  })
}

// makes over teh reddit data and returns the tone per subreddit
const srMap = (redditData) => {
  return redditData.map(sr => {
    return promiseTone({text: sr})
      .then(r => r);
  })
}

// Merges the data back together
const mergeData = (reddit, watson) => {
  let merged = reddit;

  merged.forEach((post, i) => {
    post["tones"] = watson[i].document_tone;
  });
  
  return merged;
}

// Gets all teh tones from the reddit data after sending to Watson
const getTone = (req, res, next) => {
  const redditData = req.redditData;
  Promise.all(toneMap(redditData))
    .then(results => {
      req.watsonData = results;
      next();
    })
    .catch(err => {
      res.json({err: "error in getTone"});
    })
}

// gets the tones for an individual sub (architecture is different)
const getToneIndSub = (req, res, next) => {
  const redditData = req.listing;
  const wholePageDoc = redditData.reduce((document, post) => {
    return document + post.title;
  }, "");

  promiseTone({text: wholePageDoc})
    .then(results => {
      req.results = results;
      next();
    });
}

// Gets tones for a mass of subreddits (for radar chart)
const getToneMassSub = (req, res, next) => {
  const redditData = req.redditForWatson;
  Promise.all(srMap(redditData))
    .then(results => {
      req.results = results;
      next();
    })
}

module.exports = {getTone, getToneIndSub, getToneMassSub}