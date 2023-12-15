const express = require('express');
userController = require('./../controllers/userCotroller');

const router = express.Router();

router.route('/')
    .get(userController.getUser)
    .post(userController.createUser);

module.exports = router;