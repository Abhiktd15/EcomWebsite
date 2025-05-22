const express = require('express');
const { createOrder, fetchOrdersByUser, deleteOrder, updateOrder,fetchAllOrders } = require('../controller/Order.controller.js');
const { isAuth } = require('../services/common.services.js');

const router = express.Router();
//  /orders is already added in base path
router.use(isAuth)

router.post('/', createOrder)
    .get('/own/', fetchOrdersByUser)
    .delete('/:id', deleteOrder)
    .patch('/:id', updateOrder)
    .get('/',fetchAllOrders)


exports.router = router;