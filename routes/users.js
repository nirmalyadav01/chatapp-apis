const express = require('express');
const { getAllUsers, editUser, uploadUserPhoto } = require('../controller/userController');
const upload = require("../config/multer")
const router = express.Router();

/* GET users listing. */
router.get('/', getAllUsers);
router.put('/edit', editUser);
router.put('/upload-photo', upload.single("photo"), uploadUserPhoto);
// router.get('/',  );

module.exports = router;
