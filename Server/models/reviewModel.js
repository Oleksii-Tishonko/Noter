const mongoose = require('mongoose');


const reviewSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Review must have a title'],
    },

    text:{
        type: String,
                
    },
    pros:{
        type: String,
    },
    cons:{
        type: String,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    rating:{
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Review must have a rating'],
    },
    product:{
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Review must belong to a product'],
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user'],
    },
    
    
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}

)

reviewSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'user',
        select: 'firstName photo',
    });
    next();
});

reviewSchema.virtual('dateCreated').get(function() {
  if(!this.createdAt) {
    console.log('no createdAt');
    return null;
  }

  const date = new Date(this.createdAt);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const result = date.toLocaleDateString('en-US', options);

  console.log(result);
  return result;
});




const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;