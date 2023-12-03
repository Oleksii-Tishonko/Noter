const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    header:{
        type: String,
        // required: true,
    },

    text:{
        type: String,
        required: false, //change this
                
    },
    pros:{
        type: String,
    },
    cons:{
        type: String,
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
    }
    
})