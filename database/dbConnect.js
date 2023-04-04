const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nse_db",
  multipleStatements: true,
});

// const con = mysql.createConnection({
//     host: "mysql-55363-0.cloudclusters.net",
//     port: 11052,
//     user: "admin",
//     password: "LhBOGPdf",
//     database: "mod_voting",
//     multipleStatements: true
// });

module.exports = con;
