const agendamentoModel = require('../models/agendamentoModel');

const clienteModel = require('../models/clienteModel');
const servicoModel = require('../models/servicoModel'); 
const profissionalModel = require('../models/profissionalModel');

const { addMinutes, format  } = require('date-fns');

exports.getAgendamentos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const startIndex = (page - 1) * pageSize;

    let query = 'SELECT * FROM agendamento WHERE cancelado = 0 AND concluido = 0';
    let queryParams = [];

    if (req.body) {
      const { searchParams } = req.body;

      if (searchParams) {
        if (searchParams.dataagendada) {
          query += ' AND dataagendada = ?';
          queryParams.push(searchParams.dataagendada);
        } else if (searchParams.dataagendadastart && searchParams.dataagendadaend) {
          query += ' AND dataagendada BETWEEN ? AND ?';
          queryParams.push(searchParams.dataagendadastart, searchParams.dataagendadaend);
        }

        if (searchParams.id !== undefined) {
          query += ' AND id = ?';
          queryParams.push(searchParams.id);
        }
      }
    }

    query += ' LIMIT ? OFFSET ?';
    queryParams = [...queryParams, pageSize, startIndex];

    const agendamento = await agendamentoModel.getAgendamento(query, queryParams);

    if (agendamento.length === 0) {
      res.status(404).json({ message: 'Não há registros na página informada.' });
    } else {
      const agendamentoComDadosAdicionais = await Promise.all(
        agendamento.map(async (agendamentoItem) => {
          const cliente = await clienteModel.getClienteById(agendamentoItem.cliente_id);
          const servico = await servicoModel.getServicoById(agendamentoItem.servico_id);
          const profissional = await profissionalModel.getProfissionalById(agendamentoItem.profissional_id);

          return {
            id: agendamentoItem.id,
            cliente: cliente,
            servico: servico,
            profissional: profissional,
            dataagendada: agendamentoItem.dataagendada,
            horaagendada: agendamentoItem.horaagendada,
            horatermino: agendamentoItem.horatermino,
            valordesconto: agendamentoItem.valordesconto,
            valorfinal: agendamentoItem.valorfinal,
            cancelado: agendamentoItem.cancelado,
            concluido: agendamentoItem.concluido,
          };
        })
      );

      res.status(200).json({
        message: 'Busca realizada com sucesso.',
        page,
        pageSize,
        agendamentos: agendamentoComDadosAdicionais,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar os agendamentos.' });
  }
};


exports.getAgendamentosDashboard = async (req, res) => {

  const { dataInicio, dataFim } = req.query;

  try {
    const query = `SELECT COUNT(*) AS total, 
                          (SELECT COUNT(*) FROM agendamento WHERE dataagendada BETWEEN ? AND ? AND concluido = 1) AS concluido 
                   FROM agendamento WHERE dataagendada BETWEEN ? AND ? AND cancelado = 0`;

    console.log(query);

    const agendamento = await agendamentoModel.getAgendamentoDashboard(query, [dataInicio, dataFim, dataInicio, dataFim]);

    if (agendamento.length === 0) {
      return res.status(404).json({ message: 'Não há registros na página informada.' });
    }

    const agendamentoComDadosAdicionais = {
      total: agendamento[0].total,
      concluido: agendamento[0].concluido
    };

    res.status(200).json({
      message: 'Busca realizada com sucesso.',
      agendamento: agendamentoComDadosAdicionais,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar os agendamentos.' });
  }
};


exports.getAgendamentoVerify = async (req, res) => {

  const { data, horarioInicio, horarioTermino, profissional } = req.query;

  try {
    const query = `select * from agendamento where cancelado = 0 and concluido = 0 and dataagendada = ? and horaagendada between ? and ? and profissional_id = ?`;

    const agendamento = await agendamentoModel.getAgendamentoVerify(query, [data, horarioInicio, horarioTermino, profissional]);

    if (agendamento.length === 0) {
      return res.status(200).json({ message: 'Horario Livre' });
    }

    res.status(400).json({
      message: 'Horario indisponivel',
      agendamento: agendamento,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar os agendamentos.' });
  }
};

exports.inserirAgendamento = async (req, res) => {
  const novoAgendamento = req.body;

  try {
    const servico = await servicoModel.getServicoById(novoAgendamento.servico_id);
    if (!servico) {
      return res.status(400).json({ error: 'Serviço não encontrado.' });
    }

    const [tempoHoras, tempoMinutos, tempoSegundos] = servico.tempo.split(':');

    const horas = parseInt(tempoHoras) || 0;
    const minutos = parseInt(tempoMinutos) || 0;
    const segundos = parseInt(tempoSegundos) || 0;

    const dataHoraString = `${novoAgendamento.dataagendada}T${novoAgendamento.horaagendada}`;
    const dataHora = new Date(dataHoraString);

    const horaTermino = addMinutes(dataHora, horas * 60 + minutos + segundos / 60);

    const horaFormatada = format(horaTermino, 'HH:mm:ss');

    novoAgendamento.horatermino = horaFormatada;

    const agendamentoInserido = await agendamentoModel.inserirAgendamento(novoAgendamento);

    const message = "Cadastro realizado com sucesso!";
    res.status(201).json({ message, agendamento: agendamentoInserido });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao inserir agendamento.' });
  }
};

exports.atualizarAgendamento = async (req, res) => {
  const { agendamentoId } = req.params;
  const dadosAtualizados = req.body;

  try {
    const agendamentoAtualizado = await agendamentoModel.atualizarAgendamento(agendamentoId, dadosAtualizados);
    res.status(200).json({agendamento:agendamentoAtualizado});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar agendamento.' });
  }
};

function converterTempoParaMinutos(tempo) {
  const [horas, minutos, segundos] = tempo.split(':');
  return parseInt(horas) * 60 + parseInt(minutos);
}