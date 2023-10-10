const mysqlConfig = require('../config/mysql');

const mysql = mysqlConfig({});
const connection = mysql.getConnection();

// Função para buscar todos os clientes
exports.getClientes = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM cliente';
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// Função para inserir um novo cliente
exports.inserirCliente = (novoCliente) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO cliente SET ?';
    connection.query(query, novoCliente, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve({ id: result.insertId, ...novoCliente });
      }
    });
  });
};

// Função para atualizar um cliente existente
exports.atualizarCliente = (id, dadosAtualizados) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE cliente SET ? WHERE id = ?';
    connection.query(query, [dadosAtualizados, id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        if (result.affectedRows === 0) {
          reject(new Error('Cliente não encontrado.'));
        } else {
          resolve({ id, ...dadosAtualizados });
        }
      }
    });
  });
};

// Função para excluir um cliente
exports.excluirCliente = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM cliente WHERE id = ?';
    connection.query(query, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        if (result.affectedRows === 0) {
          reject(new Error('Cliente não encontrado.'));
        } else {
          resolve();
        }
      }
    });
  });
};
