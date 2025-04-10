import React from 'react'
import Login from "../AuthComponents/Login/Login";
import Register from "../AuthComponents/Register/Register";
import ForgotPassword from "../AuthComponents/ForgetPassword/ForgotPassword";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LogOut from './LogOut/LogOut';



function AuthComponent() {
  return (
    <div>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="*" element={<Navigate to="login" replace />} />
        </Routes>
    </div>
  )
}

export default AuthComponent