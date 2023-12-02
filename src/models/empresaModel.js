const mysqlConfig = require('../config/mysql');

const mysql = mysqlConfig({});
const connection = mysql.getConnection();

exports.getHorarioFuncionamento = (query, queryParams) => {
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