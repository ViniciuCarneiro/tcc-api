const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const empresaController = require('../controllers/empresaController');

const router = express.Router();

// Rotas de Empresa na API
router.get('/funcionamento', authMiddleware.verifyToken, empresaController.getHorarioFuncionamento);

module.exports = router;
