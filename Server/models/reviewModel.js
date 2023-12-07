const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    header:{
        type: String,
    },

    text:{
        type: String,
        required: true, 
                
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
    product:{
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Review must belong to a product'],
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        // required: [true, 'Review must belong to a user'], --changed to false for development 
    }
    
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;