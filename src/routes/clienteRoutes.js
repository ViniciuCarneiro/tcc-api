const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const clienteController = require('../controllers/clienteController');

const router = express.Router();

// Rotas de cliente na API
router.get('/', authMiddleware.verifyToken, clienteController.getClientes);
router.post('/', authMiddleware.verifyToken, clienteController.inserirCliente);
router.patch('/:clienteId', authMiddleware.verifyToken, clienteController.atualizarCliente);
router.delete('/:clienteId', authMiddleware.verifyToken, clienteController.excluirCliente);

router.post('/login', clienteController.loginCliente);

module.exports = router;
