const { isAdmin, isAuth } = require('../middlewares/auth.middleware');
const productController = require('../controllers/product.controller');

const express = require('express');
const router = express.Router();

router.delete("/:id", isAuth, isAdmin, productController.deleteProduct);

router.post("/:id/reviews", isAuth, productController.createReview);

router.put('/:id', isAuth, isAdmin, productController.updateProduct);

router.post('/', isAuth, isAdmin, productController.createProduct);

router.get('/:id', productController.getProductById);

router.get('/', productController.getAllProducts);

module.exports = router;