const express = require('express');

const router = express.Router();
const passport = require('passport');
const postsApi = require("../../../controllers/api/v1/posts_api");


router.get('/', postsApi.index);
router.delete('/:id', passport.authenticate('jwt', {session: false}), postsApi.destroy);



module.exports = router;


// 1 3 5 7 9  64 25 39
// 9 10 13 15 17

// 1 3 5 7 9 11