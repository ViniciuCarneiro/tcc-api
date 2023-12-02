const empresaModel = require('../models/empresaModel');

exports.getHorarioFuncionamento = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const startIndex = (page - 1) * pageSize;

    const query = 'SELECT * FROM horariofuncionamento LIMIT ? OFFSET ?';
    const queryParams = [pageSize, startIndex];

    const horarios = await empresaModel.getHorarioFuncionamento(query, queryParams);

    if (horarios.length === 0) {
      res.status(404).json({ message: 'Não há registros na página informada.' });
    } else {
      res.status(200).json({
        message: 'Busca realizada com sucesso.',
        page,
        pageSize,
        horarios,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar os horarios de funcionamento.' });
  }
};
