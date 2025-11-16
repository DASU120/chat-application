// src/components/ChatWindow.js
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ChatInput from './ChatInput';
import TableResponse from './TableResponse';
import AnswerFeedback from './AnswerFeedback';

export default function ChatWindow() {
  const { sessionId } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Load existing conversation on mount
  useEffect(() => {
    if (!sessionId) return;
    setLoading(true);
    fetch(`http://localhost:5000/api/session/${sessionId}`)
      .then(res => res.json())
      .then(data => {
        setMessages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load session:', err);
        setLoading(false);
      });
  }, [sessionId]);

  const handleSend = async (question) => {
    const userMessage = { role: 'user', content: question };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/api/chat/${sessionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });
      const data = await res.json();
      const assistantMessage = {
        role: 'assistant',
        content: data.content,
        tableData: data.tableData || []
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, something went wrong.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 && !loading && (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
            Start a conversation!
          </div>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`group flex mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-3xl px-4 py-2 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>
              {msg.tableData && <TableResponse data={msg.tableData} />}
              {msg.role === 'assistant' && <AnswerFeedback />}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg">
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}