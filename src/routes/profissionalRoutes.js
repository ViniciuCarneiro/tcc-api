const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const profissionalController = require('../controllers/profissionalController');

const router = express.Router();

// Rotas de Profissionais na API
router.get('/', authMiddleware.verifyToken, profissionalController.getProfissional);
router.post('/', profissionalController.inserirProfissional);
router.patch('/:profissionalId', authMiddleware.verifyToken, profissionalController.atualizarProfissional);
router.delete('/:profissionalId', authMiddleware.verifyToken, profissionalController.excluirProfissional);

router.post('/login', profissionalController.loginProfissional);

module.exports = router;
