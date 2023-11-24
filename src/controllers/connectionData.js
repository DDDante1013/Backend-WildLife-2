const mysql = require("mysql");
// const { Pool } = require("mysql/typings/mysql/lib/Pool");
const dotenv = require("dotenv").config();
const { promisify } = require("util");
// const { Sequelize, Model, DataTypes } = require("sequelize");

// const sequelize = new Sequelize("mydb", "root", "Luci3006ddd@", {
//   host: "localhost",
//   dialect: "mysql",
//   port: 3306,
// });

const connection = mysql.createPool({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
});

// connection.connect((error) => {
//   if (error) throw error;
//   console.log("base dedatos conectada");
// });

connection.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("CONEXION PERDIDA");
    }
  }
  if (err) {
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("MUCHO TIEMPO ESPERANDO BASE DATOS");
    }
  }
  if (err) {
    if (err.code === "ECONNREFUSED") {
      console.error("CONEXION RECHAZADA");
    }
  }
  if (connection) connection.release();
  console.log("BASE DATOS CONECTADA");
  return;
});

connection.query("SELECT * from users", function (error, results, fields) {
  if (error) throw error;
  results.forEach((results) => {
    console.log(results);
  });
});

// para usar async y await
connection.query = promisify(connection.query);
//
// const getConnection = () => {
//   return connection;
// };

module.exports = connection;
