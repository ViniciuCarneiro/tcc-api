const mysqlConfig = require('../config/mysql');

const jwt = require('jsonwebtoken');

const mysql = mysqlConfig({});
const connection = mysql.getConnection();

exports.getProfissional = (query, queryParams) => {
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

exports.getProfissionalById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM profissional WHERE id = ?';
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

exports.inserirProfissional = (novoProfissional) => {
  return new Promise((resolve, reject) => {

    const profissionalData = {
      nome: novoProfissional.nome,
      sobrenome: novoProfissional.sobrenome,
      cpf: novoProfissional.cpf,
      email: novoProfissional.email,
      datanascimento: novoProfissional.datanascimento,
      admin: novoProfissional.admin,
      usuario: novoProfissional.usuario,
      senha: novoProfissional.senha,
      ativo: novoProfissional.ativo,
    };

    const query = 'INSERT INTO profissional SET ?';
    connection.query(query, profissionalData, (error, result) => {
      if (error) {
        reject(error);
      } else {
        const profissionalId = result.insertId;

        if (novoProfissional.habilidades && novoProfissional.habilidades.length > 0) {
          const insertHabilidadesQuery = 'INSERT INTO servicoprofissional (servico_id, profissional_id) VALUES ?';
          const habilidadesValues = novoProfissional.habilidades.map((habilidade) => [habilidade.servico_id, profissionalId]);

          connection.query(insertHabilidadesQuery, [habilidadesValues], (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve({ id: profissionalId, ...novoProfissional });
            }
          });
        } else {
          resolve({ id: profissionalId, ...novoProfissional });
        }
      }
    });
  });
};

exports.atualizarProfissional = (id, dadosAtualizados) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE profissional SET ? WHERE id = ?';

    connection.query(query, [dadosAtualizados, id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        if (result.affectedRows === 0) {
          reject(new Error('Profissional não encontrado.'));
        } else {
          resolve({ id, ...dadosAtualizados });
        }
      }
    });
  });
};

exports.excluirProfissional = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE profissional SET ativo = 0 WHERE id = ?';
    connection.query(query, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        if (result.affectedRows === 0) {
          reject(new Error('Profissional não encontrado.'));
        } else {
          resolve();
        }
      }
    });
  });
};

exports.loginProfissional = (usuario, senha) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM profissional WHERE usuario = ? AND senha = ?';
    connection.query(query, [usuario, senha], (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.length === 1) {
          const profissional = results[0];
          const profissionalToken = {
            id: profissional.id,
            nome: profissional.nome,
            sobrenome: profissional.sobrenome,
            email: profissional.email,
            admin: profissional.admin
          }

          const token = jwt.sign({ profissional: profissionalToken }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
          resolve({ token });
        } else {
          reject(new Error('Credenciais inválidas'));
        }
      }
    });
  });
};