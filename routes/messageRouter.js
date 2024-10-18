const express = require('express');
const { sendMessage, recivedMessage, deleteMessage } = require('../controller/messagecontroller');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
  res.send('message route');
});

/* send message to user */
router.post('/send/:reciverid', sendMessage);

// recive message from user
router.get('/recived-message/:reciverid', recivedMessage);

// delete message from user
router.get('/delete-message/:messageid', deleteMessage);

module.exports = router;
