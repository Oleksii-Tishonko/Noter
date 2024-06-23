const catchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');
const CreditCard = require('../models/creditCardModel');
const User = require('../models/userModel');

exports.getAllCreditCardsForUser = catchAsync(async (req, res, next) => {
    console.log("get credit card");
    const user = await User.findById(req.params.userId);
    if (!user) return next(new AppError('No user found with that ID (Credit Card must belong to User)', 404));
    const creditCards = user.creditCards;

    res.status(200).json({
        status: 'success',
        results: creditCards.length,
        data: {
            creditCards,
        },
    });
});

exports.CreateCreditCard = catchAsync(async (req, res, next) => {
    console.log("create credit card");
    const user = await User.findById(req.params.userId);
    if (!user) return next(new AppError('No user found with that ID (Credit Card must belong to User)', 404));
    const newCreditCard = await CreditCard.create(req.body);
    //add credit card to a user
    user.creditCards.push(newCreditCard._id);
    await user.save();

    res.status(201).json({
        status: 'success',
        data: {
            creditCard: newCreditCard,
        },
    });
});

exports.updateCreditCard = catchAsync(async (req, res, next) => {
    console.log("update credit card");

    const creditCard = await CreditCard.findByIdAndUpdate(req.params.cardId, req.body);
    if (!creditCard) return next(new AppError('No credit card found with that ID', 404));

    res.status(200).json({
        status: 'success',
        data: {
            creditCard,
        },
    });
});

exports.deleteCreditCard = catchAsync(async (req, res, next) => {
    console.log("delete credit card");
    const creditCard = await CreditCard.findByIdAndDelete(req.params.cardId);
    if (!creditCard) return next(new AppError('No credit card found with that ID', 404));

    res.status(204).json({
        status: 'success',
    });
});