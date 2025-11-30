// Sessão 6 - Teste de Escalabilidade
// Servidor Single-Thread (para comparação)

const express = require('express');
const app = express();

const PORT = 3001; // Porta diferente para rodar em paralelo

app.use(express.json());

let requestCount = 0;

app.use((req, res, next) => {
    requestCount++;
    next();
});

// Endpoint de processamento
app.get('/api/compute/:n', (req, res) => {
    const n = parseInt(req.params.n);

    // Cálculo de Fibonacci (CPU-intensive)
    function fib(num) {
        if (num <= 1) return num;
        return fib(num - 1) + fib(num - 2);
    }

    const startTime = Date.now();
    const result = fib(Math.min(n, 35));
    const processingTime = Date.now() - startTime;

    res.json({
        mode: 'single-thread',
        processPID: process.pid,
        input: n,
        result: result,
        processingTime: processingTime + 'ms'
    });
});

// Endpoint de dados
app.get('/api/data', (req, res) => {
    const data = {
        mode: 'single-thread',
        processPID: process.pid,
        timestamp: new Date(),
        data: Array(100).fill(null).map((_, i) => ({
            id: i,
            value: Math.random()
        }))
    };
    res.json(data);
});

// Endpoint de health check
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        mode: 'single-thread',
        processPID: process.pid,
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        totalRequests: requestCount
    });
});

app.listen(PORT, () => {
    console.log(`Servidor SINGLE-THREAD rodando em http://localhost:${PORT}`);
    console.log(`PID: ${process.pid}`);
});
