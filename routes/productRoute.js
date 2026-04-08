const express = require('express');
const router1 = express.Router();
const productController = require('../controllers/productController.js');

//bring in middleware
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

//router1.use(protect)

// ❗ No authentication here (as requested)
router1.post('/products', authorizeRoles('admin'), productController.createProduct);
router1.get('/products', authorizeRoles('salesperson'), productController.getProducts);
router1.get('/products/:id', productController.getProduct);
router1.put('/products/:id', productController.updateProduct);
router1.delete('/products/:id', productController.deleteProduct);
router1.patch('/upload/:id', productController.updateProductImage);
router1.post('/createproductwithemail', productController.createProductwithEmail);



module.exports = router1;