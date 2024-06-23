const mongoose = require('mongoose');
validator = require('validator');

const userSchema = new mongoose.Schema({

    firstName:{
        type: String,
        required: [true, 'User must have a first name!'],
        trim: true,
    },
    lastName:{
        type: String,
        required: [true, 'User must have a last name!'],
        trim: true,
    },

    email:{
        type: String,
        required: [true, 'User must have an email!'],
        unique: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid Email'],
    },

    uid:{
        type: String,
        required: [true, 'User must have a uid!'],
        unique: true,
        trim: true,
        select: false,
    },

    creditCards: [{
        type: mongoose.Schema.ObjectId,
        ref: 'CreditCard',
    }],

    photo:{
        type: String,
        default: 'defaultUserPhoto',
    },

    role:{
        type: String,
        enum: ['user'], //other roles not implemented yet
        default: 'user',
    },
    dateCreated:{
        type: Date,
        default: Date.now(),
    },
    cart:{
        type: mongoose.Schema.ObjectId,
        ref: 'Cart',
    }

},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
}
);

userSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'creditCards',
        select: 'cardName',
    });
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;