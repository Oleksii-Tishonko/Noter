const express = require('express');
userController = require('./../controllers/userCotroller');
creditCardsRouter = require('./creditCardRoutes');

const router = express.Router();

router.use('/:userId/creditCards', creditCardsRouter);

router.route('/')
    .get(userController.getUser)
    .post(userController.createUser);

module.exports = router;