const mysqlConfig = require('../config/mysql');

const mysql = mysqlConfig({});
const connection = mysql.getConnection();

exports.getServico = (query, queryParams) => {
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

exports.getServicoById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM servico WHERE id = ?';
    const queryParams = [id];

    connection.query(query, queryParams, (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.length === 0) {
          resolve(null);
        } else {
          resolve(results[0]);
        }
      }
    });
  });
};

exports.inserirServico = (novoServico) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO servico SET ?';
    connection.query(query, novoServico, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve({ id: result.insertId, ...novoServico });
      }
    });
  });
};

exports.atualizarServico = (id, dadosAtualizados) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE servico SET ? WHERE id = ?';

    connection.query(query, [dadosAtualizados, id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        if (result.affectedRows === 0) {
          reject(new Error('Serviço não encontrado.'));
        } else {
          resolve({ id, ...dadosAtualizados });
        }
      }
    });
  });
};

exports.excluirServico = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE servico SET ativo = 0 WHERE id = ?';
    connection.query(query, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        if (result.affectedRows === 0) {
          reject(new Error('Serviço não encontrado.'));
        } else {
          resolve();
        }
      }
    });
  });
};