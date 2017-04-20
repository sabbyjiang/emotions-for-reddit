const snoowrap = require('snoowrap'),
      dotenv = require('dotenv').config(),
      // fetch = require('node-fetch'),
      axios = require('axios');

const reddit = (redditObj) => {
  if(redditObj.clientId){

  }
  const r = new snoowrap({
    userAgent: process.env.USER_AGENT,
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN
  });
  return r;
}

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

const getAuth = (req, res, next) => {
  const code = req.query.code;

  const auth = "Basic " + new Buffer(process.env.REDDIT_CLIENT_ID + ':' + process.env.REDDIT_SECRET).toString('base64');

  axios(
    "https://www.reddit.com/api/v1/access_token", 
    {
      method: 'POST', 
      // data: {grant_type: 'authorization_code', code: code, 'redirect-uri': process.env.REDIRECT},
      data: 'grant_type=authorization_code&code=' + code + '&redirect_uri=' + process.env.REDIRECT,
      // data: 'grant_type=authorization_code&code=' + code,
      headers: {
        "Authorization": auth
      }
    })
    .then(results => {
      req.reddit = results.data;
      next();
    })
    .catch(err => {console.log("err", err)});
}

const refreshToken = (req, res, next) => {
  const token = req.cookies.refresh;

  const auth = "Basic " + new Buffer(process.env.REDDIT_CLIENT_ID + ':' + process.env.REDDIT_SECRET).toString('base64');

  axios(
    "https://www.reddit.com/api/v1/access_token", 
    {
      method: 'POST', 
      data: 'grant_type=refresh_token&refresh_token=' + token,
      headers: {
        "Authorization": auth
      }
    })
    .then(results => {
      req.reddit = results.data;
      next();
    })
    .catch(err => {console.log("err", err)});
}

module.exports = {redditHot, redditTop, getAuth, refreshToken};