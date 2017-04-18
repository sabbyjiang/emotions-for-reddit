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