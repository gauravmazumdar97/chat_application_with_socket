import React, { useState, createContext, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext'; // Import AuthContext

export const LoginUserContext = createContext(null);

export const LoginUserProvider = ({ children }) => {
  const { token } = useContext(AuthContext); // Consume token from AuthContext
  const [LoginUser, setLoginUser] = useState(null);

  // Function to decode JWT token
  const decodeToken = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decode token
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  useEffect(() => {
    if (token) {
      const decodedUser = decodeToken(token); // Decode user data from token
      if (decodedUser) {
        setLoginUser(decodedUser);
      }
    } else {
      setLoginUser(null); // Clear user if no token exists
    }
  }, [token]); // Re-run effect when token changes

  return (
    <LoginUserContext.Provider value={{ LoginUser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};
