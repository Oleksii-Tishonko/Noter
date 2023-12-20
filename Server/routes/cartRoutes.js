const express = require('express');
const cartController = require('./../controllers/cartController');

const router = express.Router();

router
    .route('/')
    .post(cartController.createCart);

router
    .route('/:userUID')
    .get(cartController.getCart)
    .patch(cartController.addProductToCart)
    .delete(cartController.removeProductFromCart);

module.exports = router;
