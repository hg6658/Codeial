const express = require('express');
const router = express.Router();

const chatsController = require('../controllers/chats_controller');


router.post('/fetchall', chatsController.fetchall);
router.post('/fetchone/:id',chatsController.fetchOne);
router.get('/fetchnew/',chatsController.fetchNew);

module.exports = router;