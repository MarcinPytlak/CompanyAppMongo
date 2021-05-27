// post.routes.js

const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products.controller');

router.get('/products', productsController.getAll);
router.get('/products/random', productsController.getRandom);
router.get('/products/:id', productsController.getProductById);
router.post('/products', productsController.postProduct);
router.put('/products/:id', productsController.putProductById);
router.delete('/products/:id', productsController.deleteProduct);

module.exports = router;
