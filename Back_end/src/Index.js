const express = require('express');
const path = require('path');
const Usuario = require('./Usuarios');
const sequelize = require('./db');

const app = express();

sequelize.authenticate()
  .then(() => console.log("Banco conectado"))
  .catch(err => console.error("Erro ao conectar:", err));

sequelize.sync();

app.use(express.json());

/* 🔥 SERVIR FRONTEND */
app.use(express.static(path.join(__dirname, '../frontend')));

// Página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/Views/Home.html'));
});

// Cadastro
app.post('/api/usuarios', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    await Usuario.create({ nome, email, senha });

    res.status(201).json({ mensagem: "Criado!" });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao salvar usuário." });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({
      where: { email, senha }
    });

    if (usuario) {
      res.status(200).json({ mensagem: "Login autorizado" });
    } else {
      res.status(401).json({ erro: "E-mail ou senha inválidos." });
    }
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao processar o login." });
  }
});

// Rotas páginas
app.get('/Cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/Views/Cadastro.html'));
});

app.get('/Login', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/Views/Login.html'));
});

app.get('/App', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/Views/App.html'));
});

app.get('/App/Criar', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/Views/Criar.html'));
});

app.get('/App/Config', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/Views/Config.html'));
});

app.get('/App/Clientes', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/Views/Clientes.html'));
});

app.get('/App/Clientes/Novo', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/Views/Novo_Cliente.html'));
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});