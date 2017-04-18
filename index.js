const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      logger = require('morgan'),
      snoowrap = require('snoowrap'),
      dotenv = require('dotenv').config(),
      watson = require('watson-developer-cloud'),
      Promise = require('bluebird');
      PORT = process.env.PORT || 8080;

app.use(cors());
app.use(logger('dev'));

const r = new snoowrap({
  userAgent: process.env.USER_AGENT,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN
});

const tone_analyzer = watson.tone_analyzer({
  username: process.env.IBM_UN,
  password: process.env.IBM_PW,
  version: 'v3',
  version_date: '2016-05-19'
});


// Breakpoints 0 < not likely < 0.5 < likely < 0.75 < very likely
app.get('/gen/hot', (req, res) => {
  r.getHot()
    .then(response => {
      const redditData = response.map((post) => {
        // Keep this in case you have to regex again
        // return {title: post.title.replace(/[^\w\s]|_/g, "")
        //  .replace(/\s+/g, " "), subreddit: post.subreddit_name_prefixed}
        return {title: post.title, subreddit: post.subreddit_name_prefixed}
      });
      
      // hard coded function
      // MUST PROMISIFY THE TONE ANALYZER 
      // why isn't this a promise to begin with. UGH.
      const promiseTone = Promise.promisify(tone_analyzer.tone, {context: tone_analyzer});

      const toneMap = (redditData) => {
        return redditData.map(post => {
          return promiseTone({text: post.title})
            .then(r => r)
        })
      }

      Promise.all(toneMap(redditData))
        .then(results => {
            const emotionTone = results.map(postres => {
              return postres.document_tone.tone_categories.find(t => t.category_id === "emotion_tone")});
            const languageTone = results.map(postres => {
              return postres.document_tone.tone_categories.find(t => t.category_id === "language_tone")});
            const socialTone = results.map(postres => {
              return postres.document_tone.tone_categories.find(t => t.category_id === "social_tone")});

            res.json({emotionTone, languageTone, socialTone, redditData});
        })
        .catch(err => {
          res.json({err:err});
        })
    })
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})