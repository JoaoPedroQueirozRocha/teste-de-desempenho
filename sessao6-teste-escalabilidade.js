// Sessão 6 - Teste de Escalabilidade
// Comparando Performance: Servidor Single vs Cluster

const autocannon = require('autocannon');

console.log('=== TESTE DE ESCALABILIDADE ===\n');
console.log('Este teste compara performance entre servidor single-thread e cluster\n');

// Teste 1: Carga Baixa (50 conexões)
console.log('=== FASE 1: CARGA BAIXA (50 conexões) ===\n');

const fase1 = autocannon({
    url: 'http://localhost:3000',
    connections: 50,
    duration: 20,
    requests: [
        { method: 'GET', path: '/api/data' },
        { method: 'GET', path: '/api/compute/30' }
    ]
});

autocannon.track(fase1, { renderProgressBar: true });

fase1.on('done', (results1) => {
    console.log('\n=== RESULTADOS FASE 1 (50 conexões) ===');
    console.log('Requisições/seg:', results1.requests.average.toFixed(0));
    console.log('Latência média:', results1.latency.mean.toFixed(0), 'ms');
    console.log('Throughput:', (results1.throughput.average / 1024).toFixed(2), 'KB/sec');

    setTimeout(() => {
        // Teste 2: Carga Média (200 conexões)
        console.log('\n\n=== FASE 2: CARGA MÉDIA (200 conexões) ===\n');

        const fase2 = autocannon({
            url: 'http://localhost:3000',
            connections: 200,
            duration: 20,
            requests: [
                { method: 'GET', path: '/api/data' },
                { method: 'GET', path: '/api/compute/32' }
            ]
        });

        autocannon.track(fase2, { renderProgressBar: true });

        fase2.on('done', (results2) => {
            console.log('\n=== RESULTADOS FASE 2 (200 conexões) ===');
            console.log('Requisições/seg:', results2.requests.average.toFixed(0));
            console.log('Latência média:', results2.latency.mean.toFixed(0), 'ms');
            console.log('Throughput:', (results2.throughput.average / 1024).toFixed(2), 'KB/sec');

            setTimeout(() => {
                // Teste 3: Carga Alta (500 conexões)
                console.log('\n\n=== FASE 3: CARGA ALTA (500 conexões) ===\n');

                const fase3 = autocannon({
                    url: 'http://localhost:3000',
                    connections: 500,
                    duration: 20,
                    requests: [
                        { method: 'GET', path: '/api/data' },
                        { method: 'GET', path: '/api/compute/33' }
                    ]
                });

                autocannon.track(fase3, { renderProgressBar: true });

                fase3.on('done', (results3) => {
                    console.log('\n=== RESULTADOS FASE 3 (500 conexões) ===');
                    console.log('Requisições/seg:', results3.requests.average.toFixed(0));
                    console.log('Latência média:', results3.latency.mean.toFixed(0), 'ms');
                    console.log('Throughput:', (results3.throughput.average / 1024).toFixed(2), 'KB/sec');

                    // Resumo Final
                    console.log('\n\n=== RESUMO - ANÁLISE DE ESCALABILIDADE ===\n');

                    console.log('┌─────────────┬────────────┬──────────────┬─────────────┐');
                    console.log('│ Carga       │ Req/seg    │ Latência (ms)│ Throughput  │');
                    console.log('├─────────────┼────────────┼──────────────┼─────────────┤');
                    console.log(`│ 50 conex    │ ${results1.requests.average.toFixed(0).padEnd(10)} │ ${results1.latency.mean.toFixed(0).padEnd(12)} │ ${(results1.throughput.average / 1024).toFixed(2).padEnd(11)} │`);
                    console.log(`│ 200 conex   │ ${results2.requests.average.toFixed(0).padEnd(10)} │ ${results2.latency.mean.toFixed(0).padEnd(12)} │ ${(results2.throughput.average / 1024).toFixed(2).padEnd(11)} │`);
                    console.log(`│ 500 conex   │ ${results3.requests.average.toFixed(0).padEnd(10)} │ ${results3.latency.mean.toFixed(0).padEnd(12)} │ ${(results3.throughput.average / 1024).toFixed(2).padEnd(11)} │`);
                    console.log('└─────────────┴────────────┴──────────────┴─────────────┘\n');

                    // Cálculo de escalabilidade
                    const scalability200 = (results2.requests.average / results1.requests.average) * 100;
                    const scalability500 = (results3.requests.average / results1.requests.average) * 100;

                    console.log('=== ÍNDICE DE ESCALABILIDADE ===');
                    console.log(`50 → 200 conexões: ${scalability200.toFixed(1)}% da performance inicial`);
                    console.log(`50 → 500 conexões: ${scalability500.toFixed(1)}% da performance inicial\n`);

                    console.log('=== ANÁLISE ===');
                    if (scalability500 > 80) {
                        console.log('✓ EXCELENTE escalabilidade - Sistema mantém >80% da performance');
                        console.log('  Sistema se beneficia de arquitetura multi-core/cluster');
                    } else if (scalability500 > 60) {
                        console.log('✓ BOA escalabilidade - Sistema mantém >60% da performance');
                        console.log('  Possível otimizar distribuição de carga entre workers');
                    } else if (scalability500 > 40) {
                        console.log('⚠ ESCALABILIDADE MODERADA - Sistema mantém >40% da performance');
                        console.log('  Revisar gargalos e otimizar processamento');
                    } else {
                        console.log('✗ ESCALABILIDADE LIMITADA - Performance degradou significativamente');
                        console.log('  Identificar gargalos críticos (I/O, CPU, memória)');
                    }

                    console.log('\n=== RECOMENDAÇÕES ===');
                    console.log('• Servidor cluster aproveita múltiplos cores da CPU');
                    console.log('• Load balancer pode distribuir carga entre múltiplas instâncias');
                    console.log('• Cache pode reduzir processamento repetitivo');
                    console.log('• Considerar escalabilidade horizontal (mais servidores)');
                });
            }, 3000);
        });
    }, 3000);
});
