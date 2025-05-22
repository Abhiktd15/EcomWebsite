const express = require('express');
const { fetchUserById, updateUser } = require('../controller/User.controller.js');
const { isAuth } = require('../services/common.services.js');

const router = express.Router();
//  /users is already added in base path
router.use(isAuth)

router.get('/own', fetchUserById)
        .patch('/:id', updateUser)

exports.router = router;