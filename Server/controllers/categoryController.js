const catchAsync = require('../utils/catchAsync');
const Category = require('./../models/categoryModel');
const AppError = require('./../utils/appError');

exports.getCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findById(req.params.id);

    if(!category) return next(new AppError('No category found with that ID', 404));

    res.status(200).json({
        status: 'success',
        data:{
            category,
        },
    })
});

exports.createCategory = catchAsync(async (req, res, next)=>{
    const newCategory = await Category.create(req.body);

    res.status(201).json({
        status: 'success',
        data:{
            category: newCategory,
        },
    })
});

// exports.updateCategory = catchAsync(async (req, res, next) =>{

// });