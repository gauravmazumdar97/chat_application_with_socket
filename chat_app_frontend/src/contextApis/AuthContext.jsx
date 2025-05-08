import React, { useEffect, createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null); 
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
    localStorage.setItem('token', newToken);
    setToken(newToken)
    setAuthenticate(true); 
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setAuthenticate(false); 
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticate, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
