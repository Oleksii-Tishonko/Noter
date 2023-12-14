const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");


exports.userExist = catchAsync(async (req, res, next) => {
    const uid = req.query.uid;

    if (!uid) return next(new AppError('This route (userExist) requires a uid!', 404));

    const user = await User.findOne({ uid: uid });

    const userExist = user ? true : false;

    res.status(200).json({
        status: 'success',
        data: {
            userExist
        }
    });

});

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