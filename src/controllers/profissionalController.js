const profissionalModel = require('../models/profissionalModel');

exports.getProfissional = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const startIndex = (page - 1) * pageSize;

    const query = 'SELECT profissional.*, GROUP_CONCAT(servicoprofissional.servico_id) as habilidades FROM profissional LEFT JOIN servicoprofissional ON profissional.id = servicoprofissional.profissional_id WHERE profissional.ativo = 1 GROUP BY profissional.id LIMIT ? OFFSET ?';
    const queryParams = [pageSize, startIndex];

    const profissional = await profissionalModel.getProfissional(query, queryParams);

    const countQuery = 'SELECT COUNT(*) AS totalCount FROM profissional WHERE ativo = 1';
    const countResult = await profissionalModel.getProfissional(countQuery, []);

    const totalCount = countResult[0].totalCount;
    const totalPages = Math.ceil(totalCount / pageSize);

    if (profissional.length === 0) {
      res.status(404).json({ message: 'Não há registros na página informada.' });
    } else {
      const formattedProfissionalData = profissional.map((profissional) => {
        return {
          id: profissional.id,
          nome: profissional.nome,
          sobrenome: profissional.sobrenome,
          cpf: profissional.cpf,
          email: profissional.email,
          datanascimento: profissional.datanascimento,
          admin: profissional.admin,
          usuario: profissional.usuario,
          senha: profissional.senha,
          ativo: profissional.ativo,
          habilidades: profissional.habilidades
            ? profissional.habilidades.split(',').map((servico_id) => ({ servico_id: parseInt(servico_id) }))
            : [],
        };
      });

      res.status(200).json({
        message: 'Busca realizada com sucesso.',
        page,
        pageSize,
        totalPages,
        profissional: formattedProfissionalData,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar clientes.' });
  }
};

exports.inserirProfissional = async (req, res) => {
  const novoProfissional = req.body;
  try {
    const profissionalInserido = await profissionalModel.inserirProfissional(novoProfissional);
    const message = "Cadastro realizado com sucesso!";
    res.status(201).json({ message, profissional: profissionalInserido });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao inserir profissional.' });
  }
};

exports.atualizarProfissional = async (req, res) => {
  const { profissionalId } = req.params;
  const dadosAtualizados = req.body;

  try {
    const profissionalAtualizado = await profissionalModel.atualizarProfissional(profissionalId, dadosAtualizados);
    res.status(200).json({profissional:profissionalAtualizado});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar profissional.' });
  }
};

exports.excluirProfissional = async (req, res) => {
  const { profissionalId } = req.params;
  try {
    await profissionalModel.excluirProfissional(profissionalId);
    const message = "Profissional inativado com sucesso!";
    res.status(201).json({ message, profissionalId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir profissional.' });
  }
};

exports.loginProfissional = async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const { token, profissional } = await profissionalModel.loginProfissional(usuario, senha);
    res.status(200).json({ message: 'Login bem-sucedido', token, profissional });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Falha na autenticação' });
  }
};