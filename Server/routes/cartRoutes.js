const express = require('express');
const cartController = require('./../controllers/cartController');

const router = express.Router();

router
    .route('/')
    .post(cartController.createCart);

router
    .route('/:userUID')
    .get(cartController.getCart)
    .delete(cartController.removeProductFromCart)
    .patch(cartController.changeProductQuantity);

module.exports = router;
