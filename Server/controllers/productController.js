const {json} = require('express');
const Product = require('./../models/productModel');
const path = require('path');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllProducts = catchAsync(async (req, res, next) =>{
    console.log(req.query);
    req.query.sort = 'name';
    if(!req.query.page) req.query.page = 1;
    req.query.limit = 16;

    const countAllFiltered = new APIFeatures(Product.find(), req.query).filter();
    const filteredCount = await Product.find().merge(countAllFiltered.query).countDocuments();

    let query = Product.find();
    if (req.query.keywords) {
        const products = await query.find({ $text: { $search: req.query.keywords } });

        return res.status(200).json({
            status: 'success',
            results: filteredCount,
            page: req.query.page,
            data:{
                products,
            },
        });
    }
    if(req.query.keywords) {
        const products = await query;
        return res.status(200).json({
            status: 'success',
            results: products.length,
            page: req.query.page,
            data:{
                products,
            },
        });
    }

    const features = new APIFeatures(Product.find(), req.query)
        .filter()
        .sort()
        .paginate();
        
    const products = await features.query;

    

    res.status(200).json({
        status: 'success',
        results: filteredCount,
        page: req.query.page,
        data:{
            products,
        },
    });
});

exports.getProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product) return next(new AppError('No product found with that ID', 404));

    res.status(200).json({
        status: 'success',
        data:{
            product,
        },
    });
});

exports.updateProduct = catchAsync(async (req, res, next)=>{
    console.log("Updated tour");
    
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if(!product) return next(new AppError('No product found with that ID', 404));

    res.status(200).json({
        status: 'success',
        data: {
            product: product,
        },
    });
});
exports.deleteProduct = catchAsync (async (req, res, next)=>{
    
    const product = await Product.findByIdAndDelete(req.params.id);

    if(!product) return next(new AppError('No product found with that ID', 404));
    

    res.status(204).json({
        status: 'success',
        data: null,
    });
});
exports.createProduct = catchAsync (async (req, res, next) => {
    
    const newProduct = await Product.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            product: newProduct,
        },
    });
});

exports.getProductImage = catchAsync(async (req, res, next) => {
    
    res.set({'Content-type': 'image/jpg'});
    res.setHeader('Content-type', 'image/jpg');

    const imageId = req.params.id;
    let ImagePath = `${__dirname}/../public/image/products/${imageId}.jpg`;

    ImagePath = path.normalize(ImagePath);

    // console.log("path: " + ImagePath);

    res.sendFile(ImagePath);
});