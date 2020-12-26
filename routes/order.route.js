const { isAdmin, isAuth } = require('../middlewares/auth.middleware');
const orderController = require('../controllers/order.controller');

const express = require('express');
const router = express.Router();

router.get("/mine", orderController.getMyOrders);

router.put('/:id.pay', isAuth, orderController.pay);

router.get('/',isAuth, orderController.getOrders);

router.post('/', isAuth, orderController.createOrder);

router.delete('/:id', isAuth, isAdmin, orderController.deleteOrder);

router.get('/:id', isAuth, orderController.getOrderById);

module.exports = router;