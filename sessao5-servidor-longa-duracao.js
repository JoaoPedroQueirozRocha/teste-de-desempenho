// Sessão 5 - Teste de Resistência (Soak Test)
// Servidor com Monitoramento de Recursos

const express = require('express');
const app = express();

app.use(express.json());

// Variáveis para monitoramento
let requestCount = 0;
let startTime = Date.now();
const memorySnapshots = [];

// Simulação de possível memory leak
let cache = [];

// Middleware para contar requisições
app.use((req, res, next) => {
    requestCount++;

    // Captura snapshot de memória a cada 1000 requisições
    if (requestCount % 1000 === 0) {
        const memUsage = process.memoryUsage();
        memorySnapshots.push({
            timestamp: new Date(),
            requestCount: requestCount,
            heapUsed: (memUsage.heapUsed / 1024 / 1024).toFixed(2) + ' MB',
            heapTotal: (memUsage.heapTotal / 1024 / 1024).toFixed(2) + ' MB',
            rss: (memUsage.rss / 1024 / 1024).toFixed(2) + ' MB'
        });
    }

    next();
});

// Endpoint principal
app.get('/api/data', (req, res) => {
    // Simula adição ao cache (potencial memory leak)
    cache.push({
        id: requestCount,
        timestamp: new Date(),
        data: 'x'.repeat(1000)
    });

    // Limpa cache se ficar muito grande (previne crash)
    if (cache.length > 10000) {
        cache = cache.slice(-5000); // Mantém últimos 5000
    }

    res.json({
        message: 'Success',
        requestNumber: requestCount,
        uptime: Math.floor((Date.now() - startTime) / 1000) + 's',
        cacheSize: cache.length
    });
});

// Endpoint de processamento
app.post('/api/process', (req, res) => {
    // Simula processamento
    const data = req.body.data || [];
    const result = data.map(item => ({
        ...item,
        processed: true,
        processedAt: new Date()
    }));

    res.json(result);
});

// Endpoint de estatísticas
app.get('/stats', (req, res) => {
    const uptime = Math.floor((Date.now() - startTime) / 1000);
    const memUsage = process.memoryUsage();

    res.json({
        uptime: uptime + ' segundos',
        totalRequests: requestCount,
        avgRequestsPerSecond: (requestCount / uptime).toFixed(2),
        memory: {
            heapUsed: (memUsage.heapUsed / 1024 / 1024).toFixed(2) + ' MB',
            heapTotal: (memUsage.heapTotal / 1024 / 1024).toFixed(2) + ' MB',
            rss: (memUsage.rss / 1024 / 1024).toFixed(2) + ' MB'
        },
        cacheSize: cache.length,
        memorySnapshots: memorySnapshots.slice(-5) // Últimos 5 snapshots
    });
});

// Endpoint para limpar cache manualmente
app.post('/clear-cache', (req, res) => {
    const oldSize = cache.length;
    cache = [];
    res.json({
        message: 'Cache limpo',
        itemsRemoved: oldSize
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor de resistência rodando em http://localhost:${PORT}`);
    console.log('Monitoramento de memória ativo');
    console.log('Verifique /stats para estatísticas em tempo real');
});
