const servicoModel = require('../models/servicoModel');

exports.getServicos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const startIndex = (page - 1) * pageSize;

    const query = 'SELECT * FROM servico WHERE ativo = 1 LIMIT ? OFFSET ?';
    const queryParams = [pageSize, startIndex];

    const servicos = await servicoModel.getServico(query, queryParams);

    const countQuery = 'SELECT COUNT(*) AS totalCount FROM servico WHERE ativo = 1';
    const countResult = await servicoModel.getServico(countQuery, []);

    const totalCount = countResult[0].totalCount;
    const totalPages = Math.ceil(totalCount / pageSize);

    if (servicos.length === 0) {
      res.status(404).json({ message: 'Não há registros na página informada.' });
    } else {
      res.status(200).json({
        message: 'Busca realizada com sucesso.',
        page,
        pageSize,
        totalPages,
        servicos,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar clientes.' });
  }
};

exports.inserirServicos = async (req, res) => {
  const novoServico = req.body;
  try {
    const servicoInserido = await servicoModel.inserirServico(novoServico);
    const message = "Cadastro realizado com sucesso!";
    res.status(201).json({ message, servico: servicoInserido });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao inserir serviço.' });
  }
};

exports.atualizarServicos = async (req, res) => {
  const { servicoId } = req.params;
  const dadosAtualizados = req.body;

  try {
    const servicoAtualizado = await servicoModel.atualizarServico(servicoId, dadosAtualizados);
    res.status(200).json({servico:servicoAtualizado});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar serviço.' });
  }
};

exports.excluirServicos = async (req, res) => {
  const { servicoId } = req.params;
  try {
    await servicoModel.excluirServico(servicoId);
    const message = "Serviço inativado com sucesso!";
    res.status(201).json({ message, servicoId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir serviço.' });
  }
};