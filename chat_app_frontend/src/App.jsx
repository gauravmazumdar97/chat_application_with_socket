import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthComponent from './component/AuthComponents/AuthComponent';
import HomeComponent from './component/HomeComponent/HomeComponent';
import Unauthorized from "./component/AuthComponents/Unauthorized/Unauthorized";
import NotFound from './component/ReusableComponents/NotFound/NotFound';
import FollowCursor from './component/ReusableComponents/FollowCursor/FollowCursor';


function App() {
  return (
    <Router>
      <FollowCursor/>
      <Routes>
        <Route path="/auth/*" element={<AuthComponent />} />
        <Route path="/home" element={<HomeComponent />} />
        <Route path="/unauthorize" element={<Unauthorized />} />
        <Route path="*" element={<AuthComponent />} /> {/* Show NotFound on undefined routes */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;