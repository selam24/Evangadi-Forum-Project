const mysql2 = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const dbConnection = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

module.exports = dbConnection.promise();
