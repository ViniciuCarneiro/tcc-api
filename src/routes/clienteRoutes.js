const express = require('express');
const clienteController = require('../controllers/clienteController');

const router = express.Router();

router.get('/', clienteController.getClientes);
router.post('/', clienteController.inserirCliente);

module.exports = router;
