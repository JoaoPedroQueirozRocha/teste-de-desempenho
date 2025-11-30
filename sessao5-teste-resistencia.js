// Sessão 5 - Teste de Resistência (Soak Test)
// Teste de Longa Duração para Detectar Memory Leaks e Degradação

const autocannon = require('autocannon');
const http = require('http');

console.log('=== TESTE DE RESISTÊNCIA - DURAÇÃO PROLONGADA ===\n');
console.log('Este teste irá rodar por 5 minutos (300 segundos)');
console.log('Monitorando: Performance, Memória, e Estabilidade\n');

// Função para obter estatísticas do servidor
function getStats() {
    return new Promise((resolve, reject) => {
        http.get('http://localhost:3000/stats', (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

// Monitora estatísticas a cada 30 segundos
const monitorInterval = setInterval(async () => {
    try {
        const stats = await getStats();
        console.log('\n--- Snapshot de Monitoramento ---');
        console.log('Tempo de execução:', stats.uptime);
        console.log('Total de requisições:', stats.totalRequests);
        console.log('Média req/s:', stats.avgRequestsPerSecond);
        console.log('Memória Heap:', stats.memory.heapUsed, '/', stats.memory.heapTotal);
        console.log('Tamanho do cache:', stats.cacheSize);
        console.log('--------------------------------\n');
    } catch (error) {
        console.error('Erro ao obter estatísticas:', error.message);
    }
}, 30000);

// Configuração do teste de longa duração
const instance = autocannon({
    url: 'http://localhost:3000',
    connections: 50,        // 50 conexões constantes
    duration: 300,          // 5 minutos (300 segundos)
    pipelining: 1,
    requests: [
        {
            method: 'GET',
            path: '/api/data'
        },
        {
            method: 'POST',
            path: '/api/process',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: [
                    { id: 1, value: 'test' },
                    { id: 2, value: 'test' }
                ]
            })
        }
    ]
});

autocannon.track(instance, { renderProgressBar: true });

instance.on('done', async (results) => {
    clearInterval(monitorInterval);

    console.log('\n\n=== RESULTADOS FINAIS DO TESTE DE RESISTÊNCIA ===\n');
    console.log('Duração total:', results.duration, 'segundos');
    console.log('Requisições totais:', results.requests.total);
    console.log('Requisições por segundo (média):', results.requests.average);
    console.log('Latência média:', results.latency.mean, 'ms');
    console.log('Latência p50:', results.latency.p50, 'ms');
    console.log('Latência p95:', results.latency.p95, 'ms');
    console.log('Latência p99:', results.latency.p99, 'ms');
    console.log('Throughput:', (results.throughput.average / 1024).toFixed(2), 'KB/sec');
    console.log('Erros:', results.errors);
    console.log('Timeouts:', results.timeouts);

    // Obter estatísticas finais do servidor
    try {
        const finalStats = await getStats();
        console.log('\n=== ESTATÍSTICAS DO SERVIDOR ===');
        console.log('Tempo de execução:', finalStats.uptime);
        console.log('Total de requisições processadas:', finalStats.totalRequests);
        console.log('Memória Heap Usada:', finalStats.memory.heapUsed);
        console.log('Memória Heap Total:', finalStats.memory.heapTotal);
        console.log('Memória RSS:', finalStats.memory.rss);
        console.log('Tamanho do cache:', finalStats.cacheSize);

        console.log('\n=== HISTÓRICO DE MEMÓRIA ===');
        if (finalStats.memorySnapshots && finalStats.memorySnapshots.length > 0) {
            finalStats.memorySnapshots.forEach(snapshot => {
                console.log(`Req ${snapshot.requestCount}: Heap ${snapshot.heapUsed} / ${snapshot.heapTotal}, RSS: ${snapshot.rss}`);
            });
        }

        console.log('\n=== ANÁLISE ===');

        // Análise de performance
        if (results.requests.average > 800) {
            console.log('✓ Performance mantida estável durante todo o teste');
        } else {
            console.log('✗ Degradação de performance detectada');
        }

        // Análise de erros
        if (results.errors === 0) {
            console.log('✓ Nenhum erro durante o teste de longa duração');
        } else {
            console.log('✗ Erros detectados:', results.errors);
        }

        // Análise de memória
        const heapMB = parseFloat(finalStats.memory.heapUsed);
        if (heapMB < 200) {
            console.log('✓ Uso de memória controlado');
        } else if (heapMB < 500) {
            console.log('⚠ Uso de memória elevado - monitorar');
        } else {
            console.log('✗ Possível memory leak detectado');
        }

    } catch (error) {
        console.error('Erro ao obter estatísticas finais:', error.message);
    }
});
