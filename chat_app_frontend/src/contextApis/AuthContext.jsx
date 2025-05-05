import React, { useEffect, createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null); // Store token directly
  const [isAuthenticate, setAuthenticate] = useState(false);

  // On initial mount, check if a token exists
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setAuthenticate(true);
    }
  }, []);

  const login = (newToken) => {
    localStorage.setItem('token', newToken); // Save token in localStorage
    setToken(newToken); // Set token in state
    setAuthenticate(true); // Mark user as authenticated
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null); // Clear token from state
    setAuthenticate(false); // Mark user as logged out
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticate, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
