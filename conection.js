const mysql = require("mysql2");

const dbConfig = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "Tina45989326",
  database: "dbtp5",
};

const conexion = mysql.createConnection(dbConfig);

conexion.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("Conexión exitosa");
  }
});

module.exports = conexion;
