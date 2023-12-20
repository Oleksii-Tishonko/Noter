const Cart = require('../models/cartModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const mongoose = require('mongoose');
const User = require('../models/userModel');

exports.createCart = catchAsync(async (req, res, next) => {
    const cart = await Cart.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            cart,
        },
    });
});

exports.getCart = catchAsync(async (req, res, next) => {
    const user = await User.findOne({uid: req.params.userUID});
    if(!user) return next(new AppError('No user found with that UID', 404));
    const cart = await Cart.findById(user.cart);
    if(!cart) return next(new AppError('No cart found with that ID', 404));

    res.status(200).json({
        status: 'success',
        data: {
            cart,
        },
    });
});

exports.addProductToCart = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const user = await User.findOne({uid: req.params.userUID});
    if(!user) return next(new AppError('No user found with that UID', 404));
    const cart = await Cart.findOne({user: user._id});
    if(!cart) return next(new AppError('No cart found with that ID', 404));

    console.log(req.body.product);

    if(!mongoose.Types.ObjectId.isValid(req.body.product)) return next(new AppError('Invalid product ID', 400));
    const product = new mongoose.Types.ObjectId(req.body.product);
    let quantity = req.body.quantity;
    if(!quantity) quantity = 1;

    //if cart contain product, increase quantity
    let productFound = false;
    for(let i = 0; i < cart.products.length; i++){
        if(cart.products[i].product.equals(product)){
            productFound = true;
            cart.products[i].quantity += quantity;
            break;
        }
    }

    if(!productFound){
        cart.products.push({product, quantity});
    }
    
    await cart.save();

    res.status(200).json({
        status: 'success',
        data: {
            cart,
        },
    });

});

exports.removeProductFromCart = catchAsync(async (req, res, next) => {
    const user = await User.findOne({uid: req.params.userUID});
    if(!user) return next(new AppError('No user found with that UID', 404));
    const cart = await Cart.findById(user.cart);
    if(!cart) return next(new AppError('No cart found with that ID', 404));

    const product = req.body.productId;

    await cart.removeProduct(product);

    res.status(200).json({
        status: 'success',
        data: {
            cart,
        },
    });

});