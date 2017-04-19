const router = require('express').Router();
const {getAuth} = require('../../models/reddit-functions');
const passport = require('passport');

router.get('/', getAuth, (req, res) => {
  res.json(req.reddit);
});

// router.get('/', (req, res) => {
//   console.log("in the controller", req);
//   passport.authenticate('reddit', {
//     successRedirect: '/',
//     failureRedirect: '/'
//   });
// })

module.exports = router;