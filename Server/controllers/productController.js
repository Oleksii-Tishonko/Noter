const {json} = require('express');
const Product = require('./../models/productModel');


exports.getAllProducts = async (req, res) =>{
    const products = await Product.find();
    
    res.status(200).json({
        status: 'success',
        results: products.length,
        data:{
            products,
        },
    });
}