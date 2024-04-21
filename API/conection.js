const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
});

// Confure the data base conection
const conection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE 
});

// Connect to the data base
conection.connect(error => {
    if (error) {
      console.error('Error de conexión a la base de datos:', error);
      return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
  });

module.exports = {conection}
