// Sessão 4 - Teste de Pico
// Simulando Pico Súbito de Tráfego (Black Friday, Lançamento de Produto)

const autocannon = require('autocannon');

console.log('=== TESTE DE PICO - SIMULAÇÃO DE EVENTO COM PICO SÚBITO ===\n');

// Fase 1: Tráfego Normal (pré-pico)
console.log('Fase 1: Tráfego Normal - 10 conexões por 15 segundos\n');

const fase1 = autocannon({
    url: 'http://localhost:3000',
    connections: 10,
    duration: 15,
    requests: [
        { method: 'GET', path: '/events' },
        { method: 'GET', path: '/events/1/availability' }
    ]
});

autocannon.track(fase1, { renderProgressBar: true });

fase1.on('done', (results1) => {
    console.log('\n=== RESULTADOS FASE 1 (Tráfego Normal) ===');
    console.log('Requisições/seg:', results1.requests.average);
    console.log('Latência média:', results1.latency.mean, 'ms');
    console.log('Erros:', results1.errors);

    // Aguarda 3 segundos antes do pico
    setTimeout(() => {
        // Fase 2: PICO SÚBITO (500 conexões simultâneas)
        console.log('\n\n⚡ INICIANDO PICO SÚBITO - 500 conexões simultâneas!\n');

        const fase2 = autocannon({
            url: 'http://localhost:3000',
            connections: 500,
            duration: 20,
            requests: [
                {
                    method: 'POST',
                    path: '/events/1/purchase',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ customerEmail: 'customer@example.com' })
                },
                { method: 'GET', path: '/events/1/availability' }
            ]
        });

        autocannon.track(fase2, { renderProgressBar: true });

        fase2.on('done', (results2) => {
            console.log('\n=== RESULTADOS FASE 2 (PICO SÚBITO) ===');
            console.log('Requisições/seg:', results2.requests.average);
            console.log('Latência média:', results2.latency.mean, 'ms');
            console.log('Latência p99:', results2.latency.p99, 'ms');
            console.log('Erros:', results2.errors);
            console.log('Timeouts:', results2.timeouts);

            // Aguarda 3 segundos após o pico
            setTimeout(() => {
                // Fase 3: Recuperação (volta ao normal)
                console.log('\n\nFase 3: Recuperação - Voltando ao tráfego normal\n');

                const fase3 = autocannon({
                    url: 'http://localhost:3000',
                    connections: 10,
                    duration: 15,
                    requests: [
                        { method: 'GET', path: '/events' },
                        { method: 'GET', path: '/events/1/availability' }
                    ]
                });

                autocannon.track(fase3, { renderProgressBar: true });

                fase3.on('done', (results3) => {
                    console.log('\n=== RESULTADOS FASE 3 (Recuperação) ===');
                    console.log('Requisições/seg:', results3.requests.average);
                    console.log('Latência média:', results3.latency.mean, 'ms');
                    console.log('Erros:', results3.errors);

                    console.log('\n\n=== RESUMO DO TESTE DE PICO ===');
                    console.log('Fase 1 (Normal):     ', results1.requests.average.toFixed(0), 'req/s - Latência:', results1.latency.mean.toFixed(0), 'ms');
                    console.log('Fase 2 (PICO):       ', results2.requests.average.toFixed(0), 'req/s - Latência:', results2.latency.mean.toFixed(0), 'ms');
                    console.log('Fase 3 (Recuperação):', results3.requests.average.toFixed(0), 'req/s - Latência:', results3.latency.mean.toFixed(0), 'ms');

                    console.log('\n=== ANÁLISE ===');
                    if (results2.errors > 100) {
                        console.log('✗ Sistema não conseguiu lidar com o pico adequadamente');
                        console.log('  - Muitos erros durante o pico');
                    }
                    if (results3.requests.average < results1.requests.average * 0.8) {
                        console.log('✗ Sistema não se recuperou completamente após o pico');
                    } else {
                        console.log('✓ Sistema se recuperou bem após o pico');
                    }
                });
            }, 3000);
        });
    }, 3000);
});
