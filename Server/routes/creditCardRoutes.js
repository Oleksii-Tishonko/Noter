const express = require('express');
const creditCardController = require('./../controllers/creditCardController');

const router = express.Router({ mergeParams: true });

router.route('/')
    .get(creditCardController.getAllCreditCardsForUser)
    .post(creditCardController.CreateCreditCard);

router.route('/:cardId')
    .patch(creditCardController.updateCreditCard)
    .delete(creditCardController.deleteCreditCard);

module.exports = router;
