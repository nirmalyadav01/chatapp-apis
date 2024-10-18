var express = require('express');
const { sendRequest,recivedRequest, acceptRequest, deleteRequest, TotalFriends } = require('../controller/friendController');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
  res.send('Friend route');
});

/* send request to user */
router.post('/send/:reciverid',sendRequest);

// recive request from user
router.get('/recived-request',recivedRequest);

// accept request from user
router.get('/accept-request/:requestid',acceptRequest);

// delete request from user
router.get('/delete-request/:requestid',deleteRequest);

// total friend from user
router.get('/friends/',TotalFriends);

module.exports = router;
