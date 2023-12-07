const express = require('express');
const productsController = require('./../controllers/productController')
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router({mergeParams: true});

router
    .route('/')
    .get(productsController.getAllProducts)
    .post(productsController.createProduct);
    

router.route('/:id')
    .get(productsController.getProduct)
    .patch(productsController.updateProduct)
    .delete(productsController.deleteProduct);

router.route('/photo/:id')
    .get(productsController.getProductImage);

router.use('/:productId/reviews', reviewRouter);



module.exports = router;