const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');

exports.getAllReviews = catchAsync (async(req, res, next) => {
  const productId = req.params.productId;
  if(!productId) {
    return next(new AppError('This route (get all reviews) requires a product id!', 404));
  }

  const filter = {product: productId};

  const reviews = await Review.find(filter);
  res.status(200).json({
    status: 'success',
    data: {
      reviews
    }
  });
});

exports.createReview = catchAsync (async(req, res, next) => {

  const newReview = await Review.create(req.body);
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