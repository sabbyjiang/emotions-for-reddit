const router = require('express').Router();
const path = require('path');
const controller = require('./controllers');
const {cookieParse} = require('./models/gen-functions');

// for all server side things
router.use('/api', cookieParse, controller);

// for react side
router.get('*', (req, res) => {
  res.sendfile(path.join(__dirname + '/index.html'));
});

module.exports = router;