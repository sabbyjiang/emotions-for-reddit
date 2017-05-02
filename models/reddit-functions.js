const snoowrap = require('snoowrap'),
      dotenv = require('dotenv').config(),
      Promise = require('bluebird'),
      axios = require('axios');

const getSnoowrap = (req, res, next) => {
  // Need to change this in order to allow access to some pages without access but redirect depending on the request
  const refresh = req.cookies.refresh;
  if(!refresh){
    req.error = 'Not logged in yet!';
    next();
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

// Gets the subscriptions of the current user who logged in
// If there is no user, move on to the next step
const getSubscriptions = (req, res, next) => {
  // if there was a previous error, move on to the next thing
  if(req.error){
    next();
  } else {
    req.r.getSubscriptions({limit: 100})
      .then(listing => {
        // If it is an empty listing, then report error as no subscriptions found, otherwise, return the listing
        if(!listing.length){
          req.error = 'No subscriptions found';
          next();
        } else {
          req.listing = listing;
          next();
        }
      })
      .catch(err => console.log(err));
  }
}

// Gets the posts of the subreddit in question from the query
// If there already is an error, move on
const getSubredditPosts = (req, res, next) => {
  if(req.error){
    next();
  } else {
    req.r.getSubreddit(req.query.subreddit).getHot()
      .then(listing => {
        if(!listing.length){
          req.error = 'No posts found';
          next();
        } else {
          req.listing = listing;
          next();
        }
      })
      .catch(err => console.log(err));
  }
}

// function in order return a mass promised posts from the subreddits
const massSubreddit = (srArray, snoowrap) => {
  return srArray.map(sr => {
    return snoowrap.getSubreddit(sr).getHot({limit: 25})
      .then(r => r)
  });
}

// gets the top 25 posts from the subreddits the posted data and sends it to the next function
const getMassSubredditPosts = (req, res, next) => {
  if(req.error){
    next();
  } else {
    const srArray = req.body.subreddits;
    Promise.all(massSubreddit(srArray, req.r))
      .then(results => {
        const extracted = results.map(extractData);
        req.rawReddit = extracted;
        next();
      })
      .catch(err => {
        req.error = "Failed to retreive subreddits";
        console.log(err);
        next();
      });
  }
}

const getHotForRadar = (req, res, next) => {
  if(req.error){
    next();
  } else {
    req.r.getHot({amount: 25})
      .then(results => {
        if(!results.length){
          req.error = "Could not retrieve data from Reddit";
          next();
        } else {
          const extracted = extractData(results);
          req.rawDataWithHot = req.rawReddit.concat([extracted]);
          next();
        }
      })
  }
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

// Gets the current hot posts from reddit and sends them to the next function
const redditHot = (req, res, next) => {
  r.getHot({amount: numPosts})
    .then(response => {
      if(!response.length){
        req.error = "Unable to get redddit posts";
        next();
      } else {
        const extractedData = extractData(response);
        req.redditData = extractedData;
        next();
      }
    })
    .catch(err => {
      req.error = "Unable to access reddit";
      next();
    })
}

// Gets the top posts of the last 24 hours
const redditTop = (req, res, next) => {
  r.getTop({time: 'day', amount: numPosts})
    .then(response => {
      if(!response.length){
        req.error = "Unable to get redddit posts";
        next();
      } else {
        const extractedData = extractData(response);
        req.redditData = extractedData;
        next();
      }
    })
    .catch(err => {
      req.error = "Unable to access reddit";
      next();
    })
}

const getAuth = (req, res, next) => {
  const code = req.query.code;

  const auth = "Basic " + new Buffer(process.env.REDDIT_CLIENT_ID + ':' + process.env.REDDIT_SECRET).toString('base64');

  axios(
    "https://www.reddit.com/api/v1/access_token", 
    {
      method: 'POST', 
      data: 'grant_type=authorization_code&code=' + code + '&redirect_uri=' + process.env.REDIRECT,
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

module.exports = {redditHot, redditTop, getAuth, getSnoowrap, getSubscriptions, getSubredditPosts, cleanRedditData, getMassSubredditPosts, getHotForRadar};