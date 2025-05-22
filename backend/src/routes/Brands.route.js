const express = require('express');
const { fetchBrands, createBrand } = require('../controller/Brand.controller.js');
const { isAuth } = require('../services/common.services.js');

const router = express.Router();
//  /brands is already added in base path
router.use(isAuth)
router.get('/', fetchBrands).post('/', createBrand);

exports.router = router;