// The below are test datas so we don't overuse Watson
// const data = require('../db/hot/2017-04-22-18-17.js')
// const results = require('../db/sub-testing/2017-04-24-14-40.js');

// Cookie parser broke with react so I made a middleware for it
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

// cleans data in a way that D3 will understand
const cleanData = (req, res, next) => {
  // reason why this is so complicated is because the reddit data is a array of posts, the watson data is a array of posts with nested categories per post, and d3 wants an array of categories with nested posts.... 
  const redditData = req.redditData;
  const watsonData = req.watsonData;

  // MUST BE WRITTEN THIS WAY
  // I know it's verbose but it's because of the way javascript handles passing by reference or value
  const reduceData = (newArr, post) => {
    const title = post.title, 
          subreddit = post.subreddit, 
          permalink = post.permalink, 
          score = post.score, 
          over_18 = post.over_18;

    return newArr.concat({title, subreddit, permalink, score, over_18});
  }

  // Damn you javascript and your passing by object reference
  let emotionalTone = redditData.reduce(reduceData(newArr, post), []);
  let languageTone = redditData.reduce(reduceData(newArr, post), []);
  let socialTone = redditData.reduce(reduceData(newArr, post), []);

  let allTones = [emotionalTone, languageTone, socialTone];

  // for each tone category (see above) do each
  allTones.forEach((category, categoryIndex) => {
    // for each category do for post
    category.forEach((post, postIndex) => {

      // This is an array of tone cateogries
      let targetWatson = watsonData[postIndex].document_tone.tone_categories;

      // Get the category (i.e. emotion, language, or social)
      post["tone_category"] = targetWatson[categoryIndex].category_id;

      // Get the tones from the category as an array (this is used in D3 to get the keys more easily)
      post["tones"] = targetWatson[categoryIndex].tones;

      // Get the actual tones in a format D3 wants
      targetWatson[categoryIndex].tones.forEach(tone => {
        post[tone.tone_name] = tone.score;
      });
    })
  })

  req.results = allTones;

  next();

}

// Cleans the subreddit array for watson processing
// Takes the array of subreddit posts and flattens it into one long document, not changing the structure of the posts
const cleanSRArrayForWatson = (req, res, next) => {
  const srArrayData = req.rawDataWithHot;
  const redditForWatson = srArrayData.map(sr => {
    return sr.reduce((document, post) => {
      return document + post.title;
    }, "");
  });
  req.redditForWatson = redditForWatson;
  next();
}

// Cleans the data for the radar
const cleanForRadar = (req, res, next) => {
  // this is the raw subreddit list (e.g. 'gameofthrones,food')
  const srRaw = req.query.subreddits;

  // Splits the string into array by comma
  const srArray = srRaw.split(',');
  // front-page is always the last thing that is checked!
  srArray.push('frontpage');

  // results are the results from the watson side
  const results = req.results;
  
  const cleaned = [];
  
  // This iterates over the results and adds the values to the array called cleaned
  // radar-d3-react is adamant about the way this is formatted
  results[0].document_tone.tone_categories.forEach((category, categoryIndex) => {
    cleaned.push({category: category.category_name});
    let target = cleaned[categoryIndex];
    target.data = {variables: [], sets: []}
    category.tones.forEach(tone => {
      target.data.variables.push({key: tone.tone_id, label: tone.tone_name});
    });
  });

  results.forEach((sr, srIndex) => {
    sr.document_tone.tone_categories.forEach((category, categoryIndex) => {
      cleaned[categoryIndex].data.sets.push({
        key: srArray[srIndex],
        label: `r/${srArray[srIndex]}`,
        values: {}
      });
      category.tones.forEach((tone) => {
        cleaned[categoryIndex].data.sets[srIndex].values[tone.tone_id] = tone.score;
      })
    })
  })

  req.cleaned = cleaned;

  next();
}

module.exports = {cookieParse, cleanData, cleanForRadar, cleanSRArrayForWatson}