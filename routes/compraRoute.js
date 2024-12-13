const express = require('express');
const router = express.Router();

const compraController = require('../controllers/compraController');


router.get('/compras', compraController.getCompras); 




module.exports = router;
