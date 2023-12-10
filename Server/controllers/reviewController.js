const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

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