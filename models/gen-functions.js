// Takes the cookies string from the request header and returns object with cookies in key-pair value

const data = require('../db/hot/2017-04-22-18-17.js')
const cookieParse = (req, res, next) => {
  // Only gets cookies if there are cookies
  if(req.headers.cookie){
    const cookiesParsed = {};
    const headerCookie = req.headers.cookie;

    // Splits the string into an array of cookies (still in string format)
    const rawArray = headerCookie.split('; ');

    // each cookie string is split by key-pair value
    const cleaned = rawArray.map(cookie => {
      return cookie.split('=');
    });

    // Puts the key-pair value into the object
    cleaned.forEach(cookie => {
      cookiesParsed[cookie[0]] = cookie[1];
    });

    // Returns the object
    req.cookies = cookiesParsed;
  } 
  
  next();
}

const cleanData = (req, res, next) => {
  const redditData = data[0];
  const watsonData = data[1];

  // const redditData = req.redditData;
  // const watsonData = req.watsonData;

  // MUST BE WRITTEN THIS WAY
  // I know it's verbose but it's because of the way javascript handles passing by reference or value
  let emotionalTone = redditData.reduce((newArr, post) => {
    const title = post.title, 
          subreddit = post.subreddit, 
          permalink = post.permalink, 
          score = post.score, 
          over_18 = post.over_18;

    return newArr.concat({title, subreddit, permalink, score, over_18});
  }, []);
  let languageTone = redditData.reduce((newArr, post) => {
    const title = post.title, 
          subreddit = post.subreddit, 
          permalink = post.permalink, 
          score = post.score, 
          over_18 = post.over_18;

    return newArr.concat({title, subreddit, permalink, score, over_18});
  }, []);
  let socialTone = redditData.reduce((newArr, post) => {
    const title = post.title, 
          subreddit = post.subreddit, 
          permalink = post.permalink, 
          score = post.score, 
          over_18 = post.over_18;

    return newArr.concat({title, subreddit, permalink, score, over_18});
  }, []);

  let allTones = [emotionalTone, languageTone, socialTone];

  allTones.forEach((category, categoryIndex) => {
    category.forEach((post, postIndex) => {
      // This is an array of tone cateogries
      let targetWatson = watsonData[postIndex].document_tone.tone_categories;

      post["tone_category"] = targetWatson[categoryIndex].category_id;

      post["tones"] = targetWatson[categoryIndex].tones;

      targetWatson[categoryIndex].tones.forEach(tone => {
        post[tone.tone_id] = tone.score;
      });
    })
  })

  req.results = allTones;

  next();

}

module.exports = {cookieParse, cleanData}

// const r = new snoowrap({
//   userAgent: process.env.USER_AGENT,
//   clientId: process.env.REDDIT_CLIENT_ID,
//   clientSecret: process.env.REDDIT_SECRET,
//   refreshToken: process.env.REFRESH_TOKEN
// });

// const tone_analyzer = watson.tone_analyzer({
//   username: process.env.IBM_UN,
//   password: process.env.IBM_PW,
//   version: 'v3',
//   version_date: '2016-05-19'
// });

// // merges data back together so that it's flatter
// const mergeData = (reddit, watson) => {
//   let merged = reddit;

//   merged.forEach((post, i) => {
//     post["tones"] = watson[i].document_tone;
//   });

//   return merged;
// }


// Breakpoints 0 < not likely < 0.5 < likely < 0.75 < very likely
// app.get('/api/gen/hot', (req, res) => {
//   r.getHot({amount: 40})
//     .then(response => {
//       const redditData = response.map((post) => {
//         return {title: post.title, subreddit: post.subreddit_name_prefixed, permalink: post.permalink, score: post.score, over_18: post.over_18}
//       });
      
//       // hard coded function
//       // MUST PROMISIFY THE TONE ANALYZER 
//       // why isn't this a promise to begin with. UGH.
//       const promiseTone = Promise.promisify(tone_analyzer.tone, {context: tone_analyzer});

//       const toneMap = (redditData) => {
//         return redditData.map(post => {
//           return promiseTone({text: post.title})
//             .then(r => r)
//         })
//       }

//       Promise.all(toneMap(redditData))
//         .then(results => {
//             // const emotionTone = results.map(postres => {
//             //   return postres.document_tone.tone_categories.find(t => t.category_id === "emotion_tone")});
//             // const languageTone = results.map(postres => {
//             //   return postres.document_tone.tone_categories.find(t => t.category_id === "language_tone")});
//             // const socialTone = results.map(postres => {
//             //   return postres.document_tone.tone_categories.find(t => t.category_id === "social_tone")});

//             let data = mergeData(redditData, results);
//             console.log(data);

//             res.json({results: data});
//         })
//         .catch(err => {
//           res.json({err:err});
//         })
//     })
// })

// app.get('/api/gen/top', (req, res) => {
//   r.getTop({time: 'day', count: 50})
//   .then(response => {
//       const redditData = response.map((post) => {
//         return {title: post.title, subreddit: post.subreddit_name_prefixed, permalink: post.permalink, score: post.score, over_18: post.over_18}
//       });
      
//       // hard coded function
//       // MUST PROMISIFY THE TONE ANALYZER 
//       // why isn't this a promise to begin with. UGH.
//       const promiseTone = Promise.promisify(tone_analyzer.tone, {context: tone_analyzer});

//       const toneMap = (redditData) => {
//         return redditData.map(post => {
//           return promiseTone({text: post.title})
//             .then(r => r)
//         })
//       }

//       Promise.all(toneMap(redditData))
//         .then(results => {
//             // const emotionTone = results.map(postres => {
//             //   return postres.document_tone.tone_categories.find(t => t.category_id === "emotion_tone")});
//             // const languageTone = results.map(postres => {
//             //   return postres.document_tone.tone_categories.find(t => t.category_id === "language_tone")});
//             // const socialTone = results.map(postres => {
//             //   return postres.document_tone.tone_categories.find(t => t.category_id === "social_tone")});

//             let data = mergeData(redditData, results);
//             console.log(data);

//             res.json({results: data});
//         })
//         .catch(err => {
//           res.json({err:err});
//         })
//     })
// });