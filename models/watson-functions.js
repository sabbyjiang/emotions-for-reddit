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

const mergeData = (reddit, watson) => {
  let merged = reddit;

  merged.forEach((post, i) => {
    post["tones"] = watson[i].document_tone;
  });
  
  return merged;
}

const getTone = (req, res, next) => {
  const redditData = req.extractedData;
  Promise.all(toneMap(redditData))
    .then(results => {
      req.results = mergeData(redditData, results);
      next();
    })
    .catch(err => {
      res.json({err: "error in getTone"});
    })
}

module.exports = {getTone}