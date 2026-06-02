const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Projeto = sequelize.define('Projeto', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ambiente: {
        type: DataTypes.STRING,
        allowNull: true
    },
    clienteId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    clienteNome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    etapa: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dataCriacao: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'projetos'
});

module.exports = Projeto;
