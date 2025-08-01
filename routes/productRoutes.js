const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/',productController.getProducts);
router.get('/:id',productController.getProductById);
router.put('/:id',productController.updateProduct);
router.post('/',productController.createProduct);
router.delete('/:id',productController.deleteProduct);
router.patch('/:id',productController.restoreProduct);

module.exports = router;