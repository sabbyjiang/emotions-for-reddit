const router = require('express').Router();
const general = require('./gen');
const auth = require('./auth');
// routes here are all ~/api
// don't forget to separate into authorised or general

router.use('/gen', general);
router.use('/auth', auth)

module.exports = router;