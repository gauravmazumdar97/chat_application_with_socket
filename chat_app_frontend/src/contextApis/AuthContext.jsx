import React, { useEffect, createContext, useState } from 'react';

export const AuthContext = createContext(); // named export

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticate, setAuthenticate] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticate(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token); // save token
    setAuthenticate(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthenticate(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticate, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
