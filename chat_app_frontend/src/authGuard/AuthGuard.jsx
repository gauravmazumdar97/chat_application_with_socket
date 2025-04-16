import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contextApis/AuthContext';

const AuthGuard = ({ children }) => {
  const { isAuthenticate } = useContext(AuthContext);
  const token = localStorage.getItem('token');
  const location = useLocation();


  useEffect(() => {

    if (!token && !isAuthenticate && location.pathname !== '/login') {
      window.history.replaceState(null, '', '/login');
    }
  }, [isAuthenticate, location]);


  // return isAuthenticate || token ? children : <Navigate to="/login"/>;
  return isAuthenticate || token ? children : <Navigate to="/login" replace state={{ from: location }} />;
};

export default AuthGuard;