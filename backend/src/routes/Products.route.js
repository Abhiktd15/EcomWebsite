const express = require('express');
const { createProduct, fetchAllProducts, fetchProductById, updateProduct } = require('../controller/Product.controller.js');
const { isAuth } = require('../services/common.services.js');

const router = express.Router();
//  /products is already added in base path
router.use(isAuth)

router.post('/', createProduct)
    .get('/', fetchAllProducts)
    .get('/:id', fetchProductById)
    .patch('/:id', updateProduct)

exports.router = router;