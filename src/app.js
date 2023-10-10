const express = require('express');

const clienteRoutes = require('./routes/clienteRoutes'); // Importe as rotas

const app = express();
app.use(express.json());

app.use('/clientes', clienteRoutes);

module.exports = app;