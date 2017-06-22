// In order to make copies of the reddit data
const deepcopy = require("deepcopy");

const cleanData = (req, res, next) => {
  console.log("bitches");

  const redditData = req.redditData;
  const watsonData = req.watsonData;

  let allTones = [];

  const numberOfTones = watsonData[0].document_tone.tone_categories.length;

  for( i = 0 ; i < numberOfTones ; i++){
    allTones.push(deepcopy(redditData));
  }

  allTones.forEach((category, categoryIndex) => {
    category.forEach((post, postIndex) => {
      // This is an array of tone cateogries
      let targetWatson = watsonData[postIndex].document_tone.tone_categories;

      // Watson data is organized by categories nested inside posts but D3 needs posts nested inside categories
      post["tone_category"] = targetWatson[categoryIndex].category_id;

      post["tones"] = targetWatson[categoryIndex].tones;

      targetWatson[categoryIndex].tones.forEach(tone => {
        post[tone.tone_name] = tone.score;
      });
    });
  });

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