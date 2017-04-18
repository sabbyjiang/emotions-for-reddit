const router = require('express').Router();
const general = require('./gen');
// routes here are all ~/api
// don't forget to separate into authorised or general

router.use('/gen', general);

module.exports = router;