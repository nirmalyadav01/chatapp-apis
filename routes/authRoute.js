const express = require('express');
const router = express.Router();
const userRouter = require("./users")
const messageRouter = require("./messageRouter")
const friendRouter = require("./friendRouter")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json("auth router")
});

router.use("/users",userRouter)
router.use("/message",messageRouter)
router.use("/friend",friendRouter)

module.exports = router;
