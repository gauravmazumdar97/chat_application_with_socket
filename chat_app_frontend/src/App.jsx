import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeComponent from './component/HomeComponent/HomeComponent';
import Unauthorized from "./component/AuthComponents/Unauthorized/Unauthorized";
import NotFound from './component/ReusableComponents/NotFound/NotFound';
import FollowCursor from './component/ReusableComponents/FollowCursor/FollowCursor';
import AuthComponent from './component/AuthComponents/AuthComponent';
import { AuthContextProvider } from './contextApis/AuthContext';
import AuthGuard from './authGuard/authGuard';
import { LoginUserProvider } from './contextApis/LoginUserContext';


function App() {
  return (
    <Router>
      <AuthContextProvider>
        <LoginUserProvider>
          <FollowCursor />
          <Routes>
            <Route path="/auth/*" element={<AuthComponent />} />
            <Route path="/home"
              element={
                <AuthGuard>
                  <HomeComponent />
                </AuthGuard>
              } />
            <Route path="/unauthorize" element={<Unauthorized />} />
            <Route path="*" element={<AuthComponent />} /> {/* Show NotFound on undefined routes */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </LoginUserProvider>
      </AuthContextProvider>
    </Router>

  );
}

export default App;