const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");

exports.createUser = catchAsync(async (req, res, next) => {
    console.log(req.body);
    await User.create(req.body);

    const newUser = await User.findOne({ uid: req.body.uid });

    //add cart to a user
    const cart = await Cart.create({ user: newUser._id, products: []  });
    newUser.cart = cart._id;
    await newUser.save();

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser
        }
    });
});

exports.getUser = catchAsync(async (req, res, next) => {
    const uid = req.query.uid;

    if (!uid) return next(new AppError('Please provide a uid', 400));
    
    let user = await User.findOne({ uid: uid });
    if (!user) user = "notExist";
    
    res.status(200).json({
        status: 'success',
        data: {
            user: user
        }
    });
});