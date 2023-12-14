const express = require('express');
userController = require('./../controllers/userCotroller');

const router = express.Router();

router.route('/userExist')
    .get(userController.userExist);

router.route('/')
    .post(userController.createUser);

module.exports = router;