const dotenv = require('dotenv').config(),
      watson = require('watson-developer-cloud'),
      Promise = require('bluebird');

const tone_analyzer = watson.tone_analyzer({
  username: process.env.IBM_UN,
  password: process.env.IBM_PW,
  version: 'v3',
  version_date: '2016-05-19'
});

const promiseTone = Promise.promisify(tone_analyzer.tone, {context: tone_analyzer});

const toneMap = (redditData) => {
  return redditData.map(post => {
    return promiseTone({text: post.title})
      .then(r => r)
  })
}

const srMap = (redditData) => {
  return redditData.map(sr => {
    return promiseTone({text: sr})
      .then(r => r);
  })
}

const mergeData = (reddit, watson) => {
  let merged = reddit;

  merged.forEach((post, i) => {
    post["tones"] = watson[i].document_tone;
  });
  
  return merged;
}

const getTone = (req, res, next) => {
  if(req.error){
    next();
  } else {
    const redditData = req.redditData;
    Promise.all(toneMap(redditData))
      .then(results => {
        req.watsonData = results;
        next();
      })
      .catch(err => {
        req.error = "Error in tone analysis";
        next();
      })
  }
}

const getToneIndSub = (req, res, next) => {
  if(req.error){
    next();
  } else {
    const redditData = req.listing;
    const wholePageDoc = redditData.reduce((document, post) => {
      return document + post.title;
    }, "");

    promiseTone({text: wholePageDoc})
      .then(results => {
        req.results = results;
        next();
      })
      .catch(err => {
        req.error = "Error in tone analysis";
        next();
      });
  }
}

const getToneMassSub = (req, res, next) => {
  if(req.error){
    next();
  } else {
    const redditData = req.redditForWatson;
    Promise.all(srMap(redditData))
      .then(results => {
        req.results = results;
        next();
      })
      .catch(err => {
        req.error = "Error in tone analysis";
        next();
      });
  }
}

module.exports = {getTone, getToneIndSub, getToneMassSub}