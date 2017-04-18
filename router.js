const router = require('express').Router();
const path = require('path');
const controller = require('./controllers');

router.use('/api', controller);

router.get('*', (req, res) => {
  res.sendfile(path.join(__dirname + '/index.html'));
});

module.exports = router;