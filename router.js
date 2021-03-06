const router = require('express').Router();
const path = require('path');
const controller = require('./controllers');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

router.use('/api', bodyParser.json(), bodyParser.urlencoded({extended: true}), cookieParser(), controller);

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

module.exports = router;