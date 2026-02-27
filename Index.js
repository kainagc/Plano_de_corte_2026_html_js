const express = require('express');
const path = require('path');
const app = express();

// 1. Define a pasta 'src' como a pasta de arquivos públicos (estáticos)
app.use(express.static(path.join(__dirname, 'src')));

// 2. Rota para abrir o Home.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'Views', 'Home.html'));
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