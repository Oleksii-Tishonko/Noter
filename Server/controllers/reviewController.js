const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviewModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const mongoose = require('mongoose');
const Product = require('../models/productModel');

exports.getAllReviews = catchAsync (async(req, res, next) => {
  const productId = req.params.productId;

  if(!req.query.page) req.query.page = 1;
  if(!req.query.limit) req.query.limit = 2;
  console.log(req.query.limit);

  if(req.query.limit && req.query.limit > 10) return next(new AppError('Only 10 reviews can be requested for one page', 401));
  if(!productId) return next(new AppError('This route (get all reviews) requires a product id!', 404));

  const filter = {product: productId};

  const totalReviews = await Review.countDocuments(filter);

  const features = new APIFeatures(Review.find(filter), req.query)
    .paginate();
  
  const reviews = await features.query;
  res.status(200).json({
    status: 'success',
    productId: productId,
    results: totalReviews,
    page: req.query.page,
    data: {
      reviews
    }
  });
});

exports.createReview = catchAsync (async(req, res, next) => {
  console.log(req.body);
  if(!req.body.user) next(new AppError('Review must belong to a user!', 404));
  const user = await User.findOne({uid: req.body.user});
  if(!user) next(new AppError('User not found!', 404));
  const product = await Product.findById(req.body.product);
  if(!product) next(new AppError('Product not found!', 404));

  //check whether the user has already reviewed the product
  const review = await Review.findOne({user: user._id, product: product._id});
  if(review) return next(new AppError('You have already reviewed this product!', 401));
  
  console.log(user._id, product._id);

  const newReview = await Review.create({
    title: req.body.title,
    text: req.body.text,
    pros: req.body.pros,
    cons: req.body.cons,
    product: product._id,
    user: user._id,
    rating: req.body.rating
  });

  await product.addReview(newReview.rating);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview
    }
  });
});

exports.getReview = catchAsync (async(req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      review
    }
  });
});

exports.deleteReview = catchAsync (async(req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);

  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});