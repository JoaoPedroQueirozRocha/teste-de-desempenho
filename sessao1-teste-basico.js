// Sessão 1 - Introdução ao Teste de Desempenho
// Teste Básico com Autocannon

const autocannon = require('autocannon');

const instance = autocannon({
    url: 'http://localhost:3000',
    connections: 10,      // 10 conexões simultâneas
    duration: 10          // Duração de 10 segundos
});

autocannon.track(instance, { renderProgressBar: true });

instance.on('done', (results) => {
    console.log('\n=== RESULTADOS DO TESTE ===\n');
    console.log('Requisições totais:', results.requests.total);
    console.log('Requisições por segundo:', results.requests.average);
    console.log('Latência média:', results.latency.mean, 'ms');
    console.log('Throughput:', results.throughput.average, 'bytes/sec');
});
