const { DataTypes } = require('sequelize');
const sequelize = require('./db'); // Caminho para o seu arquivo de conexão que você mostrou antes

const Usuario = sequelize.define('Usuario', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'usuarios' // Garante que ele use o nome exato da tabela no Postgres
});

module.exports = Usuario;