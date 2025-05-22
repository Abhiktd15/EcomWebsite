const express = require('express');
const { createUser, loginUser, checkAuth } = require('../controller/Auth.controller.js');
const passport = require('passport');
const { isAuth } = require('../services/common.services.js');

const router = express.Router();
//  /auth is already added in base path
router.post('/signup', createUser)
.post('/login', loginUser)
router.use(isAuth)
router.get('/check', checkAuth);
exports.router = router;