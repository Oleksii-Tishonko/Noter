const {json} = require('express');
const Product = require('./../models/productModel');
const path = require('path');


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

exports.getProduct = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data:{
                product,
            },
        })
    }
    catch(err){
        res.status(404).json({
            status: 'failed to get a product',
            message: err,
        });
    }
}

exports.updateProduct = async (req, res)=>{
    console.log("Updated tour");
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: 'success',
            data: {
                product: product,
            },
        });
    }
    catch(err){
        res.status(404).json({
            status: 'failed to update product',
            message: err,
        });
    }
}
exports.deleteProduct = async (req, res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null,
        });
    }
    catch(err){
        res.status(404).json({
            status: 'failed to delete product',
            message: err,
        });
    }
}
exports.createProduct = async (req, res) => {
    try{
        const newProduct = await Product.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                product: newProduct,
            },
        });
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            status: 'failed to create product (invalid product data)',
            message: err,
        });
    }
}

exports.getProductImage = async (req, res) => {
    try{
        res.set({'Content-type': 'image/jpg'});
        res.setHeader('Content-type', 'image/jpg');

        const imageId = req.params.id;
        let ImagePath = `${__dirname}/../public/image/products/${imageId}/photo.jpg`;

        ImagePath = path.normalize(ImagePath);

        console.log("path: " + ImagePath);

        res.sendFile(ImagePath);
    }
    catch(err){
        console.log(err);
        res.status(404).json({
            status: 'failed to get image for product',
            message: err,
        });
    }

}