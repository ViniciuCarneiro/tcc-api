const mysqlConfig = require('../config/mysql');

const mysql = mysqlConfig({});
const connection = mysql.getConnection();

exports.getAgendamento = (query, queryParams) => {
  return new Promise((resolve, reject) => {
    connection.query(query, queryParams, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

exports.getAgendamentoDashboard = (query, params) => {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

exports.getAgendamentoVerify = (query, params) => {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

exports.inserirAgendamento = (novoAgendamento) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO agendamento SET ?';
    connection.query(query, novoAgendamento, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve({ id: result.insertId, ...novoAgendamento });
      }
    });
  });
};

exports.atualizarAgendamento = (id, dadosAtualizados) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE agendamento SET ? WHERE id = ?';

    connection.query(query, [dadosAtualizados, id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        if (result.affectedRows === 0) {
          reject(new Error('Agendamento não encontrado.'));
        } else {
          resolve({ id, ...dadosAtualizados });
        }
      }
    });
  });
};