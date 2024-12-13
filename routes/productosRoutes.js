const express = require('express');
const router = express.Router();

const productosController = require('../controllers/productosController');


router.get('/productos', productosController.getProducto); 
router.post('/productos', productosController.createProducto);  
router.put('/productos/:id', productosController.updateProducto);  
router.get('/productos/:id', productosController.getProductoId);  
router.delete('/productos/:id', productosController.deleteProducto);  

module.exports = router;
