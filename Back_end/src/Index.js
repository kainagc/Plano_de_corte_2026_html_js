const express = require('express');
const path = require('path');
const Usuario = require('./src/Models/Usuarios');
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'Views', 'Home.html'));
});

// Rota para processar o cadastro
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


// Rota para processar o login
app.post('/api/login', async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await Usuario.findOne({ 
            where: { 
                email: email, 
                senha: senha 
            } 
        });

        if (usuario) {
            // Se encontrar o usuário, retorna sucesso
            res.status(200).json({ mensagem: "Login autorizado" });
        } else {
            // Se não encontrar, retorna erro de credenciais
            res.status(401).json({ erro: "E-mail ou senha inválidos." });
        }
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao processar o login." });
    }
});

app.get('/Cadastro',(req,res)=>{
  res.sendFile(path.join(__dirname, 'src', 'Views', 'Cadastro.html'))
})

app.get('/Login',(req,res)=>{
  res.sendFile(path.join(__dirname, 'src', 'Views', 'Login.html'))
})

app.get('/App',(req,res)=>{
  res.sendFile(path.join(__dirname, 'src', 'Views', 'App.html'))
})

app.get('/App/Criar',(req,res)=>{
  res.sendFile(path.join(__dirname, 'src', 'Views', 'Criar.html'))
})

app.get('/App/Config',(req,res)=>{
  res.sendFile(path.join(__dirname, 'src', 'Views', 'Config.html'))
})

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});