import { useState, useEffect } from 'react';
import { MdLightMode, MdDarkMode } from "react-icons/md";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 
                 text-gray-800 dark:text-gray-200 
                 hover:bg-gray-300 dark:hover:bg-gray-600 
                 transition"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <MdLightMode size={24} />
      ) : (
        <MdDarkMode size={24} />
      )}
    </button>
  );
}
