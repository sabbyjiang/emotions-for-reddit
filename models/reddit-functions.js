const snoowrap = require('snoowrap'),
      dotenv = require('dotenv').config(),
      Promise = require('bluebird'),
      axios = require('axios');

const getSnoowrap = (req, res, next) => {
  const refresh = req.cookies.refresh;
  if(!refresh){
    res.redirect('/');
  } else {
    const r = new snoowrap({
      userAgent: process.env.USER_AGENT,
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_SECRET,
      refreshToken: refresh
    });

    req.r = r;

    next();
  }
}

const getSubscriptions = (req, res, next) => {
    console.log('-----------------------')
console.log('attempting reddit query');
  console.log('req.r:', req.r);
  req.r.getSubscriptions({limit: 100})
    .then(listing => {
      console.log("here is the listing:", listing);
      console.log('listing.length:', listing.length);
      req.listing = listing;
      next();
    })
    .catch(err => console.log(err));
}


const getSubredditPosts = (req, res, next) => {
  
  req.r.getSubreddit(req.query.subreddit).getHot()
    .then(listing => {
      
      req.listing = listing;
      next();
    })
    .catch(err => console.log(err));
}

const massSubreddit = (srArray, snoowrap) => {
  return srArray.map(sr => {
    return snoowrap.getSubreddit(sr).getHot({limit: 25})
      .then(r => r)
  });
}

const getMassSubredditPosts = (req, res, next) => {
  const srRaw = req.query.subreddits;
  const srArray = srRaw.split(',');
  Promise.all(massSubreddit(srArray, req.r))
    .then(results => {
      const extracted = results.map(sr => {
        return extractData(sr);
      })
      req.rawReddit = extracted;
      next();
    })
    .catch(err => {
      console.log(err);
    });
}

const getHotForRadar = (req, res, next) => {
  req.r.getHot({amount: 25})
    .then(results => {
      const extracted = extractData(results);
      req.rawDataWithHot = req.rawReddit.concat([extracted]);
      next();
    })
}

const cleanRedditData = (req, res, next) => {
  const cleanedData = extractData(req.listing);
  req.redditData = cleanedData;
  next();
}

const r = new snoowrap({
    userAgent: process.env.USER_AGENT,
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN
  });

const numPosts = 25;

const extractData = (response) => {
  return response.map((post) => {
    return {title: post.title, subreddit: post.subreddit_name_prefixed, permalink: post.permalink, score: post.score, over_18: post.over_18}
  });
}

const redditHot = (req, res, next) => {
  r.getHot({amount: numPosts})
    .then(response => {
      const extractedData = extractData(response);
      req.redditData = extractedData;
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
      req.redditData = extractedData;
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

module.exports = {redditHot, redditTop, getAuth, refreshToken, getSnoowrap, getSubscriptions, getSubredditPosts, cleanRedditData, getMassSubredditPosts, getHotForRadar};