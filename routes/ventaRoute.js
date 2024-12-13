const express = require('express');
const router = express.Router();

const ventasController = require('../controllers/ventaController');


router.get('/ventas', ventasController.getVentas); 




module.exports = router;
