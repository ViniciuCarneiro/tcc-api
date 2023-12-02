const express = require('express');

const clienteRoutes = require('./routes/clienteRoutes');
const servicoRoutes = require('./routes/servicoRoutes');
const profissionalRoutes = require('./routes/profissionalRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');
const empresaRoutes = require('./routes/empresaRoutes');

const app = express();
app.use(express.json());

app.use('/clientes', clienteRoutes);
app.use('/servicos', servicoRoutes); 
app.use('/profissionais', profissionalRoutes); 
app.use('/agendamentos', agendamentoRoutes); 
app.use('/empresa', empresaRoutes); 

module.exports = app;