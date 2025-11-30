// Sessão 4 - Teste de Pico
// Servidor para Teste de Eventos com Picos de Tráfego

const express = require('express');
const app = express();

app.use(express.json());

// Simulação de banco de dados de eventos
let events = [];
let tickets = [];
let nextEventId = 1;
let nextTicketId = 1;

// Criar novo evento
app.post('/events', (req, res) => {
    const event = {
        id: nextEventId++,
        name: req.body.name,
        date: req.body.date,
        availableTickets: req.body.availableTickets || 100,
        createdAt: new Date()
    };
    events.push(event);
    res.status(201).json(event);
});

// Listar eventos
app.get('/events', (req, res) => {
    res.json(events);
});

// Comprar ingresso (endpoint crítico que gera pico)
app.post('/events/:id/purchase', (req, res) => {
    const eventId = parseInt(req.params.id);
    const event = events.find(e => e.id === eventId);

    if (!event) {
        return res.status(404).json({ error: 'Evento não encontrado' });
    }

    if (event.availableTickets <= 0) {
        return res.status(400).json({ error: 'Ingressos esgotados' });
    }

    // Simula processamento de pagamento
    const processingDelay = Math.random() * 100; // 0-100ms
    setTimeout(() => {
        event.availableTickets--;
        const ticket = {
            id: nextTicketId++,
            eventId: eventId,
            purchasedBy: req.body.customerEmail,
            purchasedAt: new Date()
        };
        tickets.push(ticket);
        res.status(201).json(ticket);
    }, processingDelay);
});

// Verificar disponibilidade
app.get('/events/:id/availability', (req, res) => {
    const event = events.find(e => e.id === parseInt(req.params.id));
    if (event) {
        res.json({
            eventId: event.id,
            availableTickets: event.availableTickets,
            status: event.availableTickets > 0 ? 'available' : 'sold_out'
        });
    } else {
        res.status(404).json({ error: 'Evento não encontrado' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor de eventos rodando em http://localhost:${PORT}`);

    // Cria um evento inicial para testes
    events.push({
        id: nextEventId++,
        name: 'Show de Lançamento',
        date: '2024-12-31',
        availableTickets: 1000,
        createdAt: new Date()
    });
    console.log('Evento criado: ID 1 - Show de Lançamento (1000 ingressos)');
});
