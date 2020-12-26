const userController = require('../controllers/user.controller');

const express = require('express');
const router = express.Router();

router.put("/:id", userController.update);

router.post('/signin', userController.signin);

router.post('/register', userController.register);

router.get('/createAdmin', userController.createAdmin);

module.exports = router;