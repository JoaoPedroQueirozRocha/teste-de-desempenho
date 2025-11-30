// Sessão 6 - Teste de Escalabilidade
// Servidor Preparado para Escalabilidade Horizontal

const express = require('express');
const cluster = require('cluster');
const os = require('os');

const PORT = 3000;
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`=== MODO CLUSTER ATIVADO ===`);
    console.log(`Servidor master (PID ${process.pid}) iniciando...`);
    console.log(`CPUs disponíveis: ${numCPUs}`);
    console.log(`Iniciando ${numCPUs} workers...\n`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        const worker = cluster.fork();
        console.log(`Worker ${i + 1} iniciado (PID ${worker.process.pid})`);
    }

    // Contador de requisições por worker
    const workerStats = {};

    cluster.on('message', (worker, message) => {
        if (message.type === 'request') {
            if (!workerStats[worker.id]) {
                workerStats[worker.id] = 0;
            }
            workerStats[worker.id]++;
        }
    });

    // Log de estatísticas a cada 10 segundos
    setInterval(() => {
        console.log('\n=== Distribuição de Requisições ===');
        Object.keys(workerStats).forEach(workerId => {
            console.log(`Worker ${workerId}: ${workerStats[workerId]} requisições`);
        });
    }, 10000);

    cluster.on('exit', (worker, code, signal) => {
        console.log(`\nWorker ${worker.process.pid} morreu. Reiniciando...`);
        cluster.fork();
    });

} else {
    // Workers executam o servidor Express
    const app = express();
    app.use(express.json());

    // Middleware para contar requisições
    app.use((req, res, next) => {
        process.send({ type: 'request' });
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
        const result = fib(Math.min(n, 35)); // Limita para evitar timeout
        const processingTime = Date.now() - startTime;

        res.json({
            workerId: cluster.worker.id,
            workerPID: process.pid,
            input: n,
            result: result,
            processingTime: processingTime + 'ms'
        });
    });

    // Endpoint de dados
    app.get('/api/data', (req, res) => {
        const data = {
            workerId: cluster.worker.id,
            workerPID: process.pid,
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
            workerId: cluster.worker.id,
            workerPID: process.pid,
            uptime: process.uptime(),
            memory: process.memoryUsage()
        });
    });

    app.listen(PORT, () => {
        console.log(`Worker ${cluster.worker.id} (PID ${process.pid}) escutando na porta ${PORT}`);
    });
}
