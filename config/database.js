const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('blog_sample', 'root', '', {
  host: '127.0.0.1', // atau coba localhost
  dialect: 'mysql',
});

module.exports = sequelize;