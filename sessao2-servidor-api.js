// Sessão 2 - Teste de Carga
// API REST com Operações de Banco de Dados

const express = require('express');
const app = express();

// Simulação de banco de dados em memória
let users = [];
let nextId = 1;

app.use(express.json());

// GET - Listar todos os usuários
app.get('/users', (req, res) => {
    res.json(users);
});

// GET - Buscar usuário por ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
    }
});

// POST - Criar novo usuário
app.post('/users', (req, res) => {
    const user = {
        id: nextId++,
        name: req.body.name,
        email: req.body.email,
        createdAt: new Date()
    };
    users.push(user);
    res.status(201).json(user);
});

// PUT - Atualizar usuário
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        res.json(user);
    } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
    }
});

// DELETE - Remover usuário
app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index !== -1) {
        users.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});
