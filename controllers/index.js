const router = require('express').Router();
const general = require('./gen');
const auth = require('./auth');
// routes here are all ~/api

router.use('/gen', general);
router.use('/auth', auth)

module.exports = router;