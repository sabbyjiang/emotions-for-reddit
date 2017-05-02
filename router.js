const router = require('express').Router();
const path = require('path');
const controller = require('./controllers');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const {cookieParse} = require('./models/gen-functions');

// router.use('/api', cookieParse, controller);
router.use('/api', bodyParser.json(), bodyParser.urlencoded({extended: true}), cookieParser(), controller);

router.get('*', (req, res) => {
  res.sendfile(path.join(__dirname + '/index.html'));
});

module.exports = router;