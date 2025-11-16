const express = require('express');
const cors = require('cors');
const { mockSessions, mockConversations } = require('./mockData');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/sessions', (req, res) => {
  res.json(mockSessions);
});

app.get('/api/new-chat', (req, res) => {
  const newId = `sess_${Date.now()}`;
  
  res.json({ id: newId, title: 'New Chat' });
});

app.get('/api/session/:id', (req, res) => {
  const session = mockConversations[req.params.id] || [];
  res.json(session);
});

app.post('/api/chat/:id', (req, res) => {
  const { question } = req.body;
  
  res.json({
    content: `You asked: "${question}". Here's a table:`,
    tableData: [
      { Metric: 'Accuracy', Value: '92%' },
      { Metric: 'Speed', Value: 'Fast' }
    ]
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));