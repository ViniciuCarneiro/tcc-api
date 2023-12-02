const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const servicoController = require('../controllers/servicoController');

const router = express.Router();

// Rotas de Serviços na API
router.get('/', authMiddleware.verifyToken, servicoController.getServicos);
router.post('/', authMiddleware.verifyToken, servicoController.inserirServicos);
router.put('/:servicoId', authMiddleware.verifyToken, servicoController.atualizarServicos);
router.delete('/:servicoId', authMiddleware.verifyToken, servicoController.excluirServicos);

module.exports = router;
