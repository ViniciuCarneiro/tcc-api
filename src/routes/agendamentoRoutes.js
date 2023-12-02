const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const agendamentoController = require('../controllers/agendamentoController');

const router = express.Router();

// Rotas de Serviços na API
router.post('/busca', authMiddleware.verifyToken, agendamentoController.getAgendamentos);
router.get('/dashboard', authMiddleware.verifyToken, agendamentoController.getAgendamentosDashboard);
router.get('/verify', authMiddleware.verifyToken, agendamentoController.getAgendamentoVerify);
router.post('/', authMiddleware.verifyToken, agendamentoController.inserirAgendamento);
router.put('/:agendamentoId', authMiddleware.verifyToken, agendamentoController.atualizarAgendamento);

module.exports = router;
