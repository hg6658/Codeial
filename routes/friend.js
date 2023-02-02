const express = require('express');

const router = express.Router();
const friendController = require('../controllers/friend_controller');


router.post('/toggle', friendController.toggleFriend);


module.exports = router;