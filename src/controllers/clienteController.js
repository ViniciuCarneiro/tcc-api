const clienteModel = require('../models/clienteModel');

exports.getClientes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const startIndex = (page - 1) * pageSize;

    const query = 'SELECT * FROM cliente WHERE ativo = 1 LIMIT ? OFFSET ?';
    const queryParams = [pageSize, startIndex];
    const clientes = await clienteModel.getClientes(query, queryParams);

    const countQuery = 'SELECT COUNT(*) AS totalCount FROM cliente WHERE ativo = 1';
    const countResult = await clienteModel.getClientes(countQuery, []);

    const totalCount = countResult[0].totalCount;
    const totalPages = Math.ceil(totalCount / pageSize);

    if (clientes.length === 0) {
      res.status(404).json({ message: 'Não há registros na página informada.' });
    } else {
      res.status(200).json({
        message: 'Busca realizada com sucesso.',
        page,
        pageSize,
        totalPages,
        clientes,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar clientes.' });
  }
};


exports.inserirCliente = async (req, res) => {
  const novoCliente = req.body;
  try {
    const clienteInserido = await clienteModel.inserirCliente(novoCliente);
    const message = "Cadastro realizado com sucesso!";
    res.status(201).json({ message, cliente: clienteInserido });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao inserir cliente.' });
  }
};

exports.atualizarCliente = async (req, res) => {
  const { clienteId } = req.params;
  const dadosAtualizados = req.body;

  try {
    const clienteAtualizado = await clienteModel.atualizarCliente(clienteId, dadosAtualizados);
    res.status(200).json(clienteAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar cliente.' });
  }
};

exports.excluirCliente = async (req, res) => {
  const { clienteId } = req.params;
  try {
    await clienteModel.excluirCliente(clienteId);
    const message = "Cliente inativado com sucesso!";
    res.status(201).json({ message, clienteId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir cliente.' });
  }
};

exports.loginCliente = async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const { token, cliente } = await clienteModel.loginCliente(usuario, senha);
    res.status(200).json({ message: 'Login bem-sucedido', token, cliente });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Falha na autenticação' });
  }
};