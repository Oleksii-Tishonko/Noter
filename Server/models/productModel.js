const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            trim: true,
            required: [true, 'Product must have a name!'],
            // unique: true,
            maxlength: 150,
            minlength: 7,
        },
        ratingsAverage:{
            type: Number,
            min: [1, 'Rating must be above 1.0'],
            max: [5, 'Rating must be below 5.0'],
        },
        ratingsQuantity:{
            type: Number,
            required: false,
            //change to true
        },
        price:{
            type: Number,
            required: [true, 'Product must have a price!'],
        },
        priceDiscount:{
            type: Number,
        },
        summary:{
            type: String,
            trim: true,
        },
        description:{
            type: String,
            trim: true,
            required: [true, 'A product must have a decription.'],
        },
        imageCover:{
            //image id
            type: String,
            required: [true, 'A product must have an image.'],
        },
        images:{
            //image id
            type: [String],
        },
        createdAt:{
            type:Date,
            default: Date.now(),
            select: false,
        },
        specifications:{
            type: Map,
            of: String,
            required: [true, 'A product must have specifications.'],

        },
        seller:{
            type: String,
        },
        sellerId:{
            type: String,
        },
        category:{
            type: mongoose.Schema.ObjectId,
            ref: 'Category',
            required: [true, 'Product must belong to a category'],
        }

    }
)
//reviews
const Product = mongoose.model('Product', productSchema);

module.exports = Product;

