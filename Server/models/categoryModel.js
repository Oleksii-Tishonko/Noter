const mongoose = require('mongoose');

const filterSchema = new mongoose.Schema({
    name: String,
    variants: [String],
});

const categorySchema = new mongoose.Schema(
    {
        name:{
            type: String,
            unique: true,
            required: [true, 'A category must have a name'],
        },
        filters: {
            type: [{
                name: String,
                variants: [String],
            }],
        required: [true, 'A category must have filters'],
    },
    }
)

//products
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;