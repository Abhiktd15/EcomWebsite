const express = require('express');
const { fetchCategories, createCategory } = require('../controller/Category.controller.js');
const { isAuth } = require('../services/common.services.js');

const router = express.Router();
//  /categories is already added in base path
router.use(isAuth)
router.get('/', fetchCategories).post('/',createCategory)

exports.router = router;