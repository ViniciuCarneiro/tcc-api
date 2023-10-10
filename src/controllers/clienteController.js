const clienteModel = require('../models/clienteModel');

// Função para buscar todos os clientes
exports.getClientes = async (req, res) => {
  try {
    const clientes = await clienteModel.getClientes();
    res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar clientes.' });
  }
};

// Função para inserir um novo cliente
exports.inserirCliente = async (req, res) => {
  const novoCliente = req.body;
  try {
    const clienteInserido = await clienteModel.inserirCliente(novoCliente);
    const message = "Cadastro realizado com sucesso!";
    res.status(201).json({ message, clienteInserido });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao inserir cliente.' });
  }
};

// Função para atualizar um cliente existente
exports.atualizarCliente = async (req, res) => {
  const { id } = req.params;
  const dadosAtualizados = req.body;
  try {
    const clienteAtualizado = await clienteModel.atualizarCliente(id, dadosAtualizados);
    res.status(200).json(clienteAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar cliente.' });
  }
};

// Função para excluir um cliente
exports.excluirCliente = async (req, res) => {
  const { id } = req.params;
  try {
    await clienteModel.excluirCliente(id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir cliente.' });
  }
};
