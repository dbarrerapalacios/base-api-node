const Sequelize = require('sequelize');
const config = require('config');
module.exports  = new Sequelize(config.get('database.database'), config.get('database.user'), config.get('database.password'), {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});


