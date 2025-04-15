import React, { createContext, useState } from 'react';

export const AuthContext = createContext(); // named export

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticate, setAuthenticate] = useState(false);

  const login = (token) => {
    // localStorage.setItem('token', token);
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
