const snoowrap = require('snoowrap'),
      dotenv = require('dotenv').config();

const r = new snoowrap({
  userAgent: process.env.USER_AGENT,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN
});

const numPosts = 50;

const extractData = (response) => {
  return response.map((post) => {
    return {title: post.title, subreddit: post.subreddit_name_prefixed, permalink: post.permalink, score: post.score, over_18: post.over_18}
  });
}

const redditHot = (req, res, next) => {
  r.getHot({amount: numPosts})
    .then(response => {
      const extractedData = extractData(response);
      req.extractedData = extractedData;
      next();
    })
    .catch(err => {
      res.json({err: "error in getHot"});
    })
}

const redditTop = (req, res, next) => {
  r.getTop({time: 'day', amount: numPosts})
    .then(response => {
      const extractedData = extractData(response);
      req.extractedData = extractedData;
      next();
    })
    .catch(err => {
      res.json({err});
    })
}

module.exports = {redditHot, redditTop};