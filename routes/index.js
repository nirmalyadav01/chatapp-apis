const express = require('express');
const { userSignUp, userSignIn } = require('../controller/userController');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json("api router")
});
router.post("/user/signup",userSignUp)
router.post("/user/signin",userSignIn)


module.exports = router;
