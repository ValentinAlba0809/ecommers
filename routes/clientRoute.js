const express = require('express');
const router = express.Router();

const clientController = require('../controllers/clienteController');

router.post('/cliente', clientController.createCliente);
router.get('/clientes', clientController.getClientes); 
router.delete('/clientes/:id', clientController.deleteCliente);
router.put('/clientes/:id', clientController.updateCliente); 



module.exports = router;
