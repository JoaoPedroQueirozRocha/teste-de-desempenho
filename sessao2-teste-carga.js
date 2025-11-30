// Sessão 2 - Teste de Carga
// Simulando Carga Normal de Usuários

const autocannon = require('autocannon');

console.log('=== TESTE DE CARGA - SIMULAÇÃO DE CARGA NORMAL ===\n');

const instance = autocannon({
    url: 'http://localhost:3000',
    connections: 100,     // 100 usuários simultâneos
    duration: 30,         // Duração de 30 segundos
    requests: [
        {
            method: 'GET',
            path: '/users'
        },
        {
            method: 'POST',
            path: '/users',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Test User',
                email: 'test@example.com'
            })
        },
        {
            method: 'GET',
            path: '/users/1'
        }
    ]
});

autocannon.track(instance, { renderProgressBar: true });

instance.on('done', (results) => {
    console.log('\n=== RESULTADOS DO TESTE DE CARGA ===\n');
    console.log('Duração total:', results.duration, 'segundos');
    console.log('Requisições totais:', results.requests.total);
    console.log('Requisições por segundo:', results.requests.average);
    console.log('Latência média:', results.latency.mean, 'ms');
    console.log('Latência p95:', results.latency.p95, 'ms');
    console.log('Latência p99:', results.latency.p99, 'ms');
    console.log('Throughput:', (results.throughput.average / 1024).toFixed(2), 'KB/sec');
    console.log('Erros:', results.errors);

    console.log('\n=== ANÁLISE ===');
    if (results.requests.average > 500) {
        console.log('✓ Sistema suporta carga normal adequadamente');
    } else {
        console.log('✗ Sistema pode ter problemas de performance');
    }
});
