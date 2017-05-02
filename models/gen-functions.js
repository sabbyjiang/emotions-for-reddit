const cleanData = (req, res, next) => {
  // const redditData = data[0];
  // const watsonData = data[1];

  const redditData = req.redditData;
  const watsonData = req.watsonData;

  const createCopy = (newArr, post) => {
    const title = post.title, 
          subreddit = post.subreddit, 
          permalink = post.permalink, 
          score = post.score, 
          over_18 = post.over_18;

    return newArr.concat({title, subreddit, permalink, score, over_18});
  }

  let emotionalTone = redditData.reduce(createCopy, []);
  let languageTone = redditData.reduce(createCopy, []);
  let socialTone = redditData.reduce(createCopy, []);

  let allTones = [emotionalTone, languageTone, socialTone];

  allTones.forEach((category, categoryIndex) => {
    category.forEach((post, postIndex) => {
      // This is an array of tone cateogries
      let targetWatson = watsonData[postIndex].document_tone.tone_categories;

      post["tone_category"] = targetWatson[categoryIndex].category_id;

      post["tones"] = targetWatson[categoryIndex].tones;

      targetWatson[categoryIndex].tones.forEach(tone => {
        post[tone.tone_name] = tone.score;
      });
    })
  })

  req.results = allTones;

  next();

}

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

const cleanForRadar = (req, res, next) => {
  // Change to post request and req.body
  const srArray = req.body.subreddits;
  srArray.push('frontpage');

  const results = req.results;
  
  const cleaned = [];

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

module.exports = {cleanData, cleanForRadar, cleanSRArrayForWatson}