const mongoose = require('mongoose');

const creditCardSchema = new mongoose.Schema(
    {
        cardName: {
            type: String,
            required: [true, 'A credit card must have a card Name']
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

const CreditCard = mongoose.model('CreditCard', creditCardSchema);

module.exports = CreditCard;