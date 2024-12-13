const express = require('express');
const router = express.Router();

const proveedoresController = require('../controllers/proveedoresController');

router.get('/proveedores', proveedoresController.getProveedor);
router.post('/proveedor', proveedoresController.createProveedor);
router.put('/proveedor/:id', proveedoresController.updateProveedor);
router.get('/proveedor/:id', proveedoresController.getProveedorId);
router.delete('/proveedor/:id', proveedoresController.deleteProveedor);

module.exports  = router;