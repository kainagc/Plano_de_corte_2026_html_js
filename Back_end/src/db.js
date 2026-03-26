const Sequelize  = require('sequelize');

const sequelize = new Sequelize('plano_de_corte_2026', 'postgres', 'mtc250974', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
});

module.exports = sequelize;