const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'A cart must belong to a user']
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'Product',
                    required: [true, 'A cart must have a product']
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ]
    },
    {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

cartSchema.methods.removeProduct = async function(productId) {
    //reduce quantity of product
    //if quantity is 0, remove product from cart
    for(let i = 0; i < this.products.length; i++){
        if(this.products[i].product.equals(productId)){
            if(this.products[i].quantity > 1){
                this.products[i].quantity--;
            }else{
                this.products.splice(i, 1);
            }
            break;
        }
    }
    await this.save();
};

cartSchema.methods.changeProductQuantity = async function (productId, quantity) {
    let productFound = false;

    //change quantity of product
    for(let i = 0; i < this.products.length; i++){
        if (this.products[i].product.equals(productId)) {
            console.log(`quantity: ${quantity}`);
            console.log(`product quantity: ${this.products[i].quantity}`);
            if(quantity == 'increment') quantity = this.products[i].quantity + 1;
            if (quantity == 0) this.products.splice(i, 1);
            else this.products[i].quantity = quantity;
            productFound = true;
            
            break;
        }
    }

    //if product not found, add product to cart
    if (!productFound && quantity != 0) {
        console.log(`adding product ${productId} to cart`);
        this.products.push({product: productId, quantity: 1});
    }

    await this.save();
}

cartSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'products.product',
        select: 'name price imageCover'
    });
    next();
});

cartSchema.virtual('totalPrice').get(function() {
    let totalPrice = 0;
    this.products.forEach(el => {
        totalPrice += el.product.price * el.quantity;
    });
    return totalPrice;
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;