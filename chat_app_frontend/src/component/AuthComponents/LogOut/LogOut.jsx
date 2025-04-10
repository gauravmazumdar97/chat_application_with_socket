// src/pages/LogoutPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LogOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session/local storage or any auth token
    localStorage.removeItem('token'); // Example
    sessionStorage.clear();

    // Optional delay for animation or feedback
    const timer = setTimeout(() => {
      navigate('/auth/login');
    }, 4000); // 4 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-xl text-center"
      >
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Logging Out...</h1>
        <p className="text-gray-500">You are being redirected to the login page.</p>
      </motion.div>
    </div>
  );
};

export default LogOut;
