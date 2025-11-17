import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ isOpen }) {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  const user = {
    name: 'Dasu',
    email: 'dasu@gmail.com',
    avatar: 'https://via.placeholder.com/40'
  };

  useEffect(() => {
    fetch('https://chat-application-0zaa.onrender.com/api/sessions')
      .then(res => res.json())
      .then(data => setSessions(data))
      .catch(err => console.error('Failed to load sessions:', err));
  }, []);

  const handleNewChat = () => {
    fetch('https://chat-application-0zaa.onrender.com/api/new-chat')
      .then(res => res.json())
      .then(data => {
        navigate(`/chat/${data.id}`);
      })
      .catch(err => console.error('Failed to create new chat:', err));
  };

  if (!isOpen) return null;

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full flex flex-col">
      
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={handleNewChat}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          + New Chat
        </button>
      </div>

      
      <div className="flex-1 overflow-y-auto p-2">
        <h3 className="px-2 py-1 text-sm font-semibold text-gray-500 dark:text-gray-400">Recent Chats</h3>
        <ul>
          {sessions.map(session => (
            <li key={session.id} className="mt-1">
              <a
                href={`/chat/${session.id}`}
                className="block p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 truncate"
              >
                {session.title || `Chat ${session.id}`}
              </a>
            </li>
          ))}
        </ul>
      </div>

      
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
        <div className="flex items-center space-x-3">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user.email}
            </p>
          </div>
          <button
            onClick={() => alert('Logout functionality would go here')}
            className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
            aria-label="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}