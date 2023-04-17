// const Sequelize = require('sequelize');
const mysql = require('mysql');
require('dotenv').config();
const connectionDetails = () => {
  if (process.env.CLEARDB_DATABASE_URL) {
    return `${process.env.CLEARDB_DATABASE_URL}`
  }
  return {
    database: `${process.env.DB}`,
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_USER_PASSWORD}`,
  };
};

// Create a connection to the database
const connection = mysql.createConnection(connectionDetails());

// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  // eslint-disable-next-line no-console
  console.log(`Successfully connected to the database with ${connectionDetails()}.`);
});

module.exports = connection;


// let sequelize;

// if (process.env.JAWSDB_URL) {
//   sequelize = new Sequelize(process.env.JAWSDB_URL);
// } else {
//   sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//       host: 'localhost',
//       dialect: 'mysql',
//       port: 3306
//     }
//   );
// }

// module.exports = sequelize;
