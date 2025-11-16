const mockSessions = [
  { id: 'sess_001', title: 'React Help' },
  { id: 'sess_002', title: 'Data Analysis' },
  { id: 'sess_003', title: 'API Debugging' }
];

const mockConversations = {
  sess_001: [
    { role: 'user', content: 'What is React?' },
    { role: 'assistant', content: 'React is a UI library.', tableData: [] }
  ],
  sess_002: [
    { role: 'user', content: 'Analyze Q3 sales' },
    { role: 'assistant', content: 'Here is the ', tableData: [{ Metric: 'Revenue', Value: '1M' }] }
  ],
  sess_003: [
    { role: 'user', content: 'Fix 500 error' },
    { role: 'assistant', content: 'Check server logs.', tableData: [] }
  ]
};

module.exports = { mockSessions, mockConversations };