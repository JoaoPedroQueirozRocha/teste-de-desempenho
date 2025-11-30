// Sessão 3 - Teste de Estresse
// Aumentando Carga Gradualmente até o Limite do Sistema

const autocannon = require('autocannon');

console.log('=== TESTE DE ESTRESSE - AUMENTANDO CARGA GRADUALMENTE ===\n');

// Fase 1: Carga Normal (100 conexões)
console.log('Fase 1: Carga Normal (100 conexões) - 20 segundos\n');

const fase1 = autocannon({
    url: 'http://localhost:3000',
    connections: 100,
    duration: 20,
    requests: [
        { method: 'GET', path: '/calculate/30' },
        { method: 'GET', path: '/io-intensive' }
    ]
});

autocannon.track(fase1, { renderProgressBar: true });

fase1.on('done', (results1) => {
    console.log('\n=== RESULTADOS FASE 1 (100 conexões) ===');
    console.log('Requisições/seg:', results1.requests.average);
    console.log('Latência média:', results1.latency.mean, 'ms');
    console.log('Erros:', results1.errors);

    // Fase 2: Carga Alta (300 conexões)
    console.log('\n\nFase 2: Carga Alta (300 conexões) - 20 segundos\n');

    const fase2 = autocannon({
        url: 'http://localhost:3000',
        connections: 300,
        duration: 20,
        requests: [
            { method: 'GET', path: '/calculate/30' },
            { method: 'GET', path: '/io-intensive' },
            { method: 'GET', path: '/memory-intensive' }
        ]
    });

    autocannon.track(fase2, { renderProgressBar: true });

    fase2.on('done', (results2) => {
        console.log('\n=== RESULTADOS FASE 2 (300 conexões) ===');
        console.log('Requisições/seg:', results2.requests.average);
        console.log('Latência média:', results2.latency.mean, 'ms');
        console.log('Erros:', results2.errors);

        // Fase 3: Carga Extrema (500 conexões)
        console.log('\n\nFase 3: Carga Extrema (500 conexões) - 20 segundos\n');

        const fase3 = autocannon({
            url: 'http://localhost:3000',
            connections: 500,
            duration: 20,
            requests: [
                { method: 'GET', path: '/calculate/35' },
                { method: 'GET', path: '/io-intensive' },
                { method: 'GET', path: '/memory-intensive' }
            ]
        });

        autocannon.track(fase3, { renderProgressBar: true });

        fase3.on('done', (results3) => {
            console.log('\n=== RESULTADOS FASE 3 (500 conexões) ===');
            console.log('Requisições/seg:', results3.requests.average);
            console.log('Latência média:', results3.latency.mean, 'ms');
            console.log('Erros:', results3.errors);

            console.log('\n\n=== COMPARAÇÃO DAS FASES ===');
            console.log('Fase 1 (100): ', results1.requests.average, 'req/s - Latência:', results1.latency.mean, 'ms');
            console.log('Fase 2 (300): ', results2.requests.average, 'req/s - Latência:', results2.latency.mean, 'ms');
            console.log('Fase 3 (500): ', results3.requests.average, 'req/s - Latência:', results3.latency.mean, 'ms');

            console.log('\n=== ANÁLISE ===');
            console.log('Degradação de performance detectada em:',
                results3.requests.average < results1.requests.average * 0.5 ? 'ALTA' : 'MODERADA');
        });
    });
});
