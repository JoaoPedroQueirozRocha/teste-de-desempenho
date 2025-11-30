// Sessão 3 - Teste de Estresse
// Servidor com Operações Pesadas de Processamento

const express = require('express');
const app = express();

app.use(express.json());

// Função que simula processamento pesado (cálculo de Fibonacci)
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Endpoint com processamento pesado
app.get('/calculate/:n', (req, res) => {
    const n = parseInt(req.params.n);

    if (n > 40) {
        return res.status(400).json({ error: 'Número muito grande (máx: 40)' });
    }

    const startTime = Date.now();
    const result = fibonacci(n);
    const processingTime = Date.now() - startTime;

    res.json({
        input: n,
        result: result,
        processingTime: processingTime + 'ms'
    });
});

// Endpoint com operação de I/O simulada
app.get('/io-intensive', (req, res) => {
    // Simula operação de I/O pesada
    const data = [];
    for (let i = 0; i < 10000; i++) {
        data.push({
            id: i,
            name: `User ${i}`,
            email: `user${i}@example.com`,
            timestamp: new Date()
        });
    }
    res.json({ count: data.length, data: data.slice(0, 10) });
});

// Endpoint com uso intensivo de memória
app.get('/memory-intensive', (req, res) => {
    const largeArray = new Array(1000000).fill({
        id: Math.random(),
        data: 'X'.repeat(100)
    });

    res.json({
        message: 'Processamento intensivo de memória concluído',
        arraySize: largeArray.length
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor de estresse rodando em http://localhost:${PORT}`);
});
