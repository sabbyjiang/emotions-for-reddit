const data = [{
  "category": "Emotion Tone",
  "data": {
    "variables": [{
      "key": "anger",
      "label": "Anger"
    }, {
      "key": "disgust",
      "label": "Disgust"
    }, {
      "key": "fear",
      "label": "Fear"
    }, {
      "key": "joy",
      "label": "Joy"
    }, {
      "key": "sadness",
      "label": "Sadness"
    }],
    "sets": [{
      "key": "test-key",
      "label": "subredditname",
      "values": {
        "anger": 0.448805,
        "disgust": 0.006606,
        "fear": 0.002677,
        "joy": 0.326151,
        "sadness": 0.061826
      }
    }]
  }
}, {
  "category": "Language Tone",
  "data": {
    "variables": [{
      "key": "analytical",
      "label": "Analytical"
    }, {
      "key": "confident",
      "label": "Confident"
    }, {
      "key": "tentative",
      "label": "Tentative"
    }],
    "sets": [{
      "key": "test-key",
      "label": "subredditname",
      "values": {
        "analytical": 0.272532,
        "confident": 0,
        "tentative": 0.15983
      }
    }]
  }
}, {
  "category": "Social Tone",
  "data": {
    "variables": [{
      "key": "openness_big5",
      "label": "Openness"
    }, {
      "key": "conscientiousness_big5",
      "label": "Conscientiousness"
    }, {
      "key": "extraversion_big5",
      "label": "Extraversion"
    }, {
      "key": "agreeableness_big5",
      "label": "Agreeableness"
    }, {
      "key": "emotional_range_big5",
      "label": "Emotional Range"
    }],
    "sets": [{
      "key": "test-key",
      "label": "subredditname",
      "values": {
        "openness_big5": 0.899586,
        "conscientiousness_big5": 0.541313,
        "extraversion_big5": 0.016761,
        "agreeableness_big5": 0.015486,
        "emotional_range_big5": 0.394504
      }
    }]
  }
}]

module.exports = data;
