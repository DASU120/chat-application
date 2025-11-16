
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true); 

  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            
            <img
              src="%PUBLIC_URL%/sidebar-icon.png"
              alt="Toggle Sidebar"
              className="h-6 w-6 cursor-pointer"
              onClick={toggleSidebar}
            />
          </button>

          <h1 className="text-xl font-bold">Chat Assistant</h1>
          <ThemeToggle />
        </header>

        <div className="flex flex-1 overflow-hidden">
          
          <Sidebar isOpen={sidebarOpen} />

          
          <main className={`flex-1 overflow-hidden transition-all duration-300 ${sidebarOpen ? 'ml-0' : 'ml-0'}`}>
            <Routes>
              <Route path="/" element={<Navigate to="/chat/demo" replace />} />
              <Route path="/chat/:sessionId" element={<ChatWindow />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;