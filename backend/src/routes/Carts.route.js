const express = require('express');
const { addToCart, fetchCartByUser, deleteFromCart, updateCart } = require('../controller/Cart.controller.js');
const { isAuth } = require('../services/common.services.js');

const router = express.Router();
//  /products is already added in base path
router.use(isAuth)

router.post('/', addToCart)
    .get('/', fetchCartByUser)
    .delete('/:id', deleteFromCart)
    .patch('/:id', updateCart)


exports.router = router;