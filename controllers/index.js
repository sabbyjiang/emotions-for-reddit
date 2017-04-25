const router = require('express').Router();
const general = require('./gen');
const auth = require('./auth');
// routes here are all ~/api

// for non-authorised access and authorised access
router.use('/gen', general);
router.use('/auth', auth);

module.exports = router;