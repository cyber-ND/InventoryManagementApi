const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');

// ❗ No authentication here (as requested)
router.post('/products', productController.createProduct);
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;