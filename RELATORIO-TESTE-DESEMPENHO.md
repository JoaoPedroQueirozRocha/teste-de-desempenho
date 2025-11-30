# RELATÓRIO DE TESTE DE DESEMPENHO

**Disciplina:** Desenvolvimento de Sistemas
**Tema:** Testes de Desempenho com Node.js e Autocannon
**Data:** 30/11/2025
**Aluno(a): João Pedro Queiroz Rocha**

## 1. INTRODUÇÃO

Este relatório apresenta os resultados obtidos durante a execução de seis sessões práticas de testes de desempenho, abordando diferentes tipos de cenários: teste básico, teste de carga, teste de estresse, teste de pico, teste de resistência e teste de escalabilidade.

### 1.1 Objetivos

- Compreender os diferentes tipos de testes de desempenho
- Aplicar ferramentas de teste de performance em APIs Node.js
- Analisar métricas de desempenho (latência, throughput, requisições/segundo)
- Identificar gargalos e limites do sistema
- Comparar diferentes arquiteturas (single-thread vs cluster)

### 1.2 Ferramentas Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Autocannon** - Ferramenta de benchmark HTTP
- **Cluster Module** - Para escalabilidade horizontal

---

## 2. SESSÃO 1 - INTRODUÇÃO AO TESTE DE DESEMPENHO

### 2.1 Objetivo

Criar um servidor HTTP simples e realizar o primeiro teste de performance para entender métricas básicas.

### 2.2 Configuração

- **Servidor:** HTTP simples retornando "Hello World"
- **Conexões simultâneas:** 10
- **Duração:** 10 segundos

### 2.3 Código do Servidor

**[ESPAÇO PARA PRINT DO CÓDIGO - sessao1-servidor-simples.js]**

```
(Cole aqui o print do código do servidor)
```

### 2.4 Código do Teste

**[ESPAÇO PARA PRINT DO CÓDIGO - sessao1-teste-basico.js]**

```
(Cole aqui o print do código do teste)
```

### 2.5 Execução

**[ESPAÇO PARA PRINT DA EXECUÇÃO DO SERVIDOR]**

```
(Cole aqui o print do terminal mostrando o servidor rodando)
```

**[ESPAÇO PARA PRINT DA EXECUÇÃO DO TESTE]**

```
(Cole aqui o print do terminal mostrando o teste rodando)
```

### 2.6 Resultados Obtidos

| Métrica                  | Valor Obtido |
| ------------------------- | ------------ |
| Requisições totais      | ___________  |
| Requisições por segundo | ___________  |
| Latência média          | ___________  |
| Throughput                | ___________  |

**[ESPAÇO PARA PRINT DOS RESULTADOS COMPLETOS]**

```
(Cole aqui o print dos resultados do teste)
```

### 2.7 Análise

_Descreva aqui sua análise dos resultados:_

---

## 3. SESSÃO 2 - TESTE DE CARGA

### 3.1 Objetivo

Testar uma API REST completa sob carga normal de usuários simultâneos.

### 3.2 Configuração

- **Servidor:** API REST com operações CRUD
- **Conexões simultâneas:** 100
- **Duração:** 30 segundos
- **Operações:** GET, POST, PUT, DELETE

### 3.3 Código do Servidor

**[ESPAÇO PARA PRINT DO CÓDIGO - sessao2-servidor-api.js]**

```
(Cole aqui o print do código do servidor - parte 1)
```

**[ESPAÇO PARA PRINT DO CÓDIGO - Continuação]**

```
(Cole aqui o print do código do servidor - parte 2)
```

### 3.4 Código do Teste

**[ESPAÇO PARA PRINT DO CÓDIGO - sessao2-teste-carga.js]**

```
(Cole aqui o print do código do teste)
```

### 3.5 Execução

**[ESPAÇO PARA PRINT DA EXECUÇÃO DO SERVIDOR]**

```
(Cole aqui o print do terminal mostrando o servidor rodando)
```

**[ESPAÇO PARA PRINT DA EXECUÇÃO DO TESTE]**

```
(Cole aqui o print do terminal mostrando o teste rodando)
```

### 3.6 Resultados Obtidos

| Métrica                  | Valor Obtido |
| ------------------------- | ------------ |
| Duração total           | ___________  |
| Requisições totais      | ___________  |
| Requisições por segundo | ___________  |
| Latência média          | ___________  |
| Latência p95             | ___________  |
| Latência p99             | ___________  |
| Throughput                | ___________  |
| Erros                     | ___________  |

**[ESPAÇO PARA PRINT DOS RESULTADOS COMPLETOS]**

```
(Cole aqui o print dos resultados do teste)
```

### 3.7 Análise

_Descreva aqui sua análise dos resultados:_

- O sistema suportou a carga normal? _______________
- Houve erros? _______________
- A latência ficou aceitável? _______________

---

## 4. SESSÃO 3 - TESTE DE ESTRESSE

### 4.1 Objetivo

Identificar o ponto de ruptura do sistema aumentando gradualmente a carga até o limite.

### 4.2 Configuração

- **Fase 1:** 100 conexões - 20 segundos
- **Fase 2:** 300 conexões - 20 segundos
- **Fase 3:** 500 conexões - 20 segundos

### 4.3 Código do Servidor

**[ESPAÇO PARA PRINT DO CÓDIGO - sessao3-servidor-processamento.js]**

```
(Cole aqui o print do código do servidor - parte 1)
```

**[ESPAÇO PARA PRINT DO CÓDIGO - Continuação]**

```
(Cole aqui o print do código do servidor - parte 2)
```

### 4.4 Código do Teste

**[ESPAÇO PARA PRINT DO CÓDIGO - sessao3-teste-estresse.js]**

```
(Cole aqui o print do código do teste - parte 1)
```

**[ESPAÇO PARA PRINT DO CÓDIGO - Continuação]**

```
(Cole aqui o print do código do teste - parte 2)
```

### 4.5 Execução

**[ESPAÇO PARA PRINT DA EXECUÇÃO DO SERVIDOR]**

```
(Cole aqui o print do terminal mostrando o servidor rodando)
```

**[ESPAÇO PARA PRINT DOS RESULTADOS - FASE 1]**

```
(Cole aqui o print dos resultados da Fase 1)
```

**[ESPAÇO PARA PRINT DOS RESULTADOS - FASE 2]**

```
(Cole aqui o print dos resultados da Fase 2)
```

**[ESPAÇO PARA PRINT DOS RESULTADOS - FASE 3]**

```
(Cole aqui o print dos resultados da Fase 3)
```

### 4.6 Resultados Obtidos

| Fase | Conexões | Req/seg | Latência (ms) | Erros   |
| ---- | --------- | ------- | -------------- | ------- |
| 1    | 100       | _______ | _______        | _______ |
| 2    | 300       | _______ | _______        | _______ |
| 3    | 500       | _______ | _______        | _______ |

**[ESPAÇO PARA PRINT DA COMPARAÇÃO FINAL]**

```
(Cole aqui o print da comparação das fases)
```

### 4.7 Análise

_Descreva aqui sua análise:_

- Em qual ponto o sistema começou a degradar? _______________
- Qual o ponto de ruptura identificado? _______________
- Degradação de performance: _______________

---

## 5. SESSÃO 4 - TESTE DE PICO

### 5.1 Objetivo

Simular um pico súbito de tráfego (como Black Friday ou lançamento de produto) e verificar a capacidade de recuperação do sistema.

### 5.2 Configuração

- **Fase 1:** Tráfego normal (10 conexões - 15s)
- **Fase 2:** PICO SÚBITO (500 conexões - 20s)
- **Fase 3:** Recuperação (10 conexões - 15s)

### 5.3 Código do Servidor

**[ESPAÇO PARA PRINT DO CÓDIGO - sessao4-servidor-eventos.js]**

```
(Cole aqui o print do código do servidor - parte 1)
```

**[ESPAÇO PARA PRINT DO CÓDIGO - Continuação]**

```
(Cole aqui o print do código do servidor - parte 2)
```

### 5.4 Código do Teste

**[ESPAÇO PARA PRINT DO CÓDIGO - sessao4-teste-pico.js]**

```
(Cole aqui o print do código do teste - parte 1)
```

**[ESPAÇO PARA PRINT DO CÓDIGO - Continuação]**

```
(Cole aqui o print do código do teste - parte 2)
```

### 5.5 Execução

**[ESPAÇO PARA PRINT DA EXECUÇÃO DO SERVIDOR]**

```
(Cole aqui o print do terminal mostrando o servidor rodando)
```

**[ESPAÇO PARA PRINT DOS RESULTADOS - FASE 1 (Normal)]**

```
(Cole aqui o print dos resultados da Fase 1)
```

**[ESPAÇO PARA PRINT DOS RESULTADOS - FASE 2 (PICO)]**

```
(Cole aqui o print dos resultados da Fase 2 - PICO)
```

**[ESPAÇO PARA PRINT DOS RESULTADOS - FASE 3 (Recuperação)]**

```
(Cole aqui o print dos resultados da Fase 3)
```

### 5.6 Resultados Obtidos

| Fase              | Conexões | Req/seg | Latência (ms) | Erros   | Timeouts |
| ----------------- | --------- | ------- | -------------- | ------- | -------- |
| 1 (Normal)        | 10        | _______ | _______        | _______ | _______  |
| 2 (PICO)          | 500       | _______ | _______        | _______ | _______  |
| 3 (Recuperação) | 10        | _______ | _______        | _______ | _______  |

**[ESPAÇO PARA PRINT DO RESUMO FINAL]**

```
(Cole aqui o print do resumo do teste de pico)
```

### 5.7 Análise

_Descreva aqui sua análise:_

- O sistema conseguiu lidar com o pico? _______________
- Houve muitos erros durante o pico? _______________
- O sistema se recuperou após o pico? _______________
- Recomendações: _______________

---

## 6. SESSÃO 5 - TESTE DE RESISTÊNCIA (SOAK TEST)

### 6.1 Objetivo

Verificar a estabilidade do sistema em execução prolongada, identificando possíveis memory leaks ou degradação ao longo do tempo.

### 6.2 Configuração

- **Conexões simultâneas:** 50
- **Duração:** 5 minutos (300 segundos)
- **Monitoramento:** Memória, CPU, requisições

### 6.3 Código do Servidor

**[ESPAÇO PARA PRINT DO CÓDIGO - sessao5-servidor-longa-duracao.js]**

```
(Cole aqui o print do código do servidor - parte 1)
```

**[ESPAÇO PARA PRINT DO CÓDIGO - Continuação]**

```
(Cole aqui o print do código do servidor - parte 2)
```

### 6.4 Código do Teste

**[ESPAÇO PARA PRINT DO CÓDIGO - sessao5-teste-resistencia.js]**

```
(Cole aqui o print do código do teste - parte 1)
```

**[ESPAÇO PARA PRINT DO CÓDIGO - Continuação]**

```
(Cole aqui o print do código do teste - parte 2)
```

### 6.5 Execução

**[ESPAÇO PARA PRINT DA EXECUÇÃO DO SERVIDOR]**

```
(Cole aqui o print do terminal mostrando o servidor rodando)
```

**[ESPAÇO PARA PRINT DO SNAPSHOT - 30 segundos]**

```
(Cole aqui o print do snapshot de monitoramento aos 30s)
```

**[ESPAÇO PARA PRINT DO SNAPSHOT - 60 segundos]**

```
(Cole aqui o print do snapshot de monitoramento aos 60s)
```

**[ESPAÇO PARA PRINT DO SNAPSHOT - 90 segundos]**

```
(Cole aqui o print do snapshot de monitoramento aos 90s)
```

**[ESPAÇO PARA PRINT DOS RESULTADOS FINAIS]**

```
(Cole aqui o print dos resultados finais após 5 minutos)
```

### 6.6 Resultados Obtidos

| Métrica                           | Valor Obtido |
| ---------------------------------- | ------------ |
| Duração total                    | ___________  |
| Requisições totais               | ___________  |
| Requisições por segundo (média) | ___________  |
| Latência média                   | ___________  |
| Latência p95                      | ___________  |
| Latência p99                      | ___________  |
| Throughput                         | ___________  |
| Erros                              | ___________  |
| Memória inicial                   | ___________  |
| Memória final                     | ___________  |

**[ESPAÇO PARA PRINT DO HISTÓRICO DE MEMÓRIA]**

```
(Cole aqui o print do histórico de memória)
```

### 6.7 Análise

_Descreva aqui sua análise:_

- A performance se manteve estável? _______________
- Houve crescimento excessivo de memória? _______________
- Foi detectado memory leak? _______________
- O sistema está pronto para produção? _______________

---

## 7. SESSÃO 6 - TESTE DE ESCALABILIDADE

### 7.1 Objetivo

Comparar a performance entre servidor single-thread e cluster (multi-core) para avaliar a escalabilidade horizontal.

### 7.2 Configuração

- **Fase 1:** 50 conexões
- **Fase 2:** 200 conexões
- **Fase 3:** 500 conexões
- **Arquitetura:** Cluster com N workers (baseado em CPU cores)

### 7.3 Código do Servidor Cluster

**[ESPAÇO PARA PRINT DO CÓDIGO - sessao6-servidor-escalavel.js]**

```
(Cole aqui o print do código do servidor cluster - parte 1)
```

**[ESPAÇO PARA PRINT DO CÓDIGO - Continuação]**

```
(Cole aqui o print do código do servidor cluster - parte 2)
```

### 7.4 Código do Servidor Single-Thread

**[ESPAÇO PARA PRINT DO CÓDIGO - sessao6-servidor-single.js]**

```
(Cole aqui o print do código do servidor single-thread)
```

### 7.5 Código do Teste

**[ESPAÇO PARA PRINT DO CÓDIGO - sessao6-teste-escalabilidade.js]**

```
(Cole aqui o print do código do teste - parte 1)
```

**[ESPAÇO PARA PRINT DO CÓDIGO - Continuação]**

```
(Cole aqui o print do código do teste - parte 2)
```

### 7.6 Execução

**[ESPAÇO PARA PRINT DA EXECUÇÃO DO SERVIDOR CLUSTER]**

```
(Cole aqui o print mostrando os workers sendo iniciados)
```

**[ESPAÇO PARA PRINT DOS RESULTADOS - FASE 1 (50 conexões)]**

```
(Cole aqui o print dos resultados da Fase 1)
```

**[ESPAÇO PARA PRINT DOS RESULTADOS - FASE 2 (200 conexões)]**

```
(Cole aqui o print dos resultados da Fase 2)
```

**[ESPAÇO PARA PRINT DOS RESULTADOS - FASE 3 (500 conexões)]**

```
(Cole aqui o print dos resultados da Fase 3)
```

**[ESPAÇO PARA PRINT DA DISTRIBUIÇÃO DE REQUISIÇÕES]**

```
(Cole aqui o print mostrando a distribuição entre workers)
```

### 7.7 Resultados Obtidos

| Carga         | Req/seg | Latência (ms) | Throughput |
| ------------- | ------- | -------------- | ---------- |
| 50 conexões  | _______ | _______        | _______    |
| 200 conexões | _______ | _______        | _______    |
| 500 conexões | _______ | _______        | _______    |

**[ESPAÇO PARA PRINT DA TABELA COMPARATIVA FINAL]**

```
(Cole aqui o print da tabela comparativa)
```

### 7.8 Índice de Escalabilidade

- **50 → 200 conexões:** _______% da performance inicial
- **50 → 500 conexões:** _______% da performance inicial

**[ESPAÇO PARA PRINT DA ANÁLISE DE ESCALABILIDADE]**

```
(Cole aqui o print da análise de escalabilidade)
```

### 7.9 Comparação: Single-Thread vs Cluster

| Arquitetura   | Req/seg (500 conex) | Latência (ms) | CPU Cores Utilizados |
| ------------- | ------------------- | -------------- | -------------------- |
| Single-Thread | _______             | _______        | 1                    |
| Cluster       | _______             | _______        | _______              |

**Ganho de Performance:** _______%

### 7.10 Análise

_Descreva aqui sua análise:_

- Qual arquitetura teve melhor performance? _______________
- Qual o ganho percentual do cluster? _______________
- A distribuição entre workers foi equilibrada? _______________
- Vale a pena usar cluster? _______________

---

## 8. CONCLUSÕES GERAIS

### 8.1 Síntese dos Resultados

**[ESPAÇO PARA TABELA RESUMO DE TODAS AS SESSÕES]**

| Sessão | Tipo de Teste  | Principal Métrica     | Resultado |
| ------- | -------------- | ---------------------- | --------- |
| 1       | Básico        | _______ req/s          | _______   |
| 2       | Carga          | _______ req/s          | _______   |
| 3       | Estresse       | Limite: _______ conex  | _______   |
| 4       | Pico           | Recuperação: _______ | _______   |
| 5       | Resistência   | Estabilidade: _______  | _______   |
| 6       | Escalabilidade | Ganho: _______%        | _______   |

### 8.2 Aprendizados

_Liste os principais aprendizados:_

1. ---
2. ---
3. ---
4. ---
5. ---

### 8.3 Problemas Encontrados

_Descreva problemas encontrados durante os testes:_

1. ---
2. ---
3. ---

### 8.4 Recomendações para Produção

_Com base nos testes, quais recomendações você daria para colocar este sistema em produção?_

1. ---
2. ---
3. ---
4. ---
5. ---

### 8.5 Melhorias Futuras

_Que melhorias poderiam ser implementadas?_

1. ---
2. ---
3. ---

---

## 9. REFERÊNCIAS

- Node.js Documentation: https://nodejs.org/docs
- Express.js Documentation: https://expressjs.com
- Autocannon: https://github.com/mcollina/autocannon
- Cluster Module: https://nodejs.org/api/cluster.html

---

**Assinatura:** _________________________________

**Data:** ___/___/______
