const mysqlConfig = require('../config/mysql');

const jwt = require('jsonwebtoken');

const mysql = mysqlConfig({});
const connection = mysql.getConnection();

exports.getClientes = (query, queryParams) => {
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

exports.getClienteById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM cliente WHERE id = ?';
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

exports.excluirCliente = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE cliente SET ativo = 0 WHERE id = ?';
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

exports.loginCliente = (usuario, senha) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM cliente WHERE usuario = ? AND senha = ?';
    connection.query(query, [usuario, senha], (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.length === 1) {
          const cliente = results[0];
          const clienteToken = {
            nome: cliente.nome,
            sobrenome: cliente.sobrenome,
            email: cliente.email,
            whatsapp: cliente.whatsapp
          }

          const token = jwt.sign({ cliente: clienteToken }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
          resolve({ token });
        } else {
          reject(new Error('Credenciais inválidas'));
        }
      }
    });
  });
};