const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Cliente = sequelize.define('Cliente', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: true
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: true
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    data: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'clientes'
});

module.exports = Cliente;
