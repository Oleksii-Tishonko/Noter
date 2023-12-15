const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");

exports.createUser = catchAsync(async (req, res, next) => {
    console.log(req.body);
    await User.create(req.body);

    const newUser = await User.findOne({ uid: req.body.uid });

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