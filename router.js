const router = require('express').Router();
const path = require('path');
const controller = require('./controllers');
const {cookieParse} = require('./models/gen-functions');

router.use('/api', cookieParse, controller);

router.get('*', (req, res) => {
  res.sendfile(path.join(__dirname + '/index.html'));
});

module.exports = router;