import './Login.css';   
import {environment} from "../../../../environment";
import { useNavigate, Link } from 'react-router-dom';
import React, { useReducer, useState, useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AuthContext } from '../../../contextApis/AuthContext'; 
import ChatApplogo from '../../../assets/ChatApplication_LOGO.png';
import LoadingComponent from '../../ReusableComponents/LoadingComponent/LoadingComponent';
import { LoginUserContext } from "../../../contextApis/LoginUserContext";
import { toast } from 'react-toastify';
import axios from 'axios';


function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const { LoginUser } = useContext(LoginUserContext);

  const initialState = {
    email: "",
    password: "",
    captcha: "MNO",
  }


  const [form, dispatch] = useReducer(RenderFunction, initialState);
  const [showPassword, setShowPassword] = useState(false);


  function RenderFunction(state, action) {
    const { type, payload } = action;

    switch (type) {
      case "email":
        return { ...state, email: payload };

      case "password":
        return { ...state, password: payload };

      default:
        return state;
    }

  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = { email: form.email, password: form.password };

    try {
      const response  = await axios.post(`${environment.serverUrl}${environment.authApi}/login`, payload);
      const data = response.data;

      if (data?.user?.token) {
        setIsLoading(true);
        localStorage.setItem('token', data.user.token); // Store token in localStorage
        login(data.user.token); // Update token in AuthContext
   
        // Optional delay to show loader before redirect
        setTimeout(() => {
          toast.success("Login successfull");
          navigate('/home');
          setIsLoading(false); 
        }, 2000);
      } 

    } catch (error) {
      setIsLoading(false); 
      console.error("❌ Login failed:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }

  }

  return (
    <section className="vh-100" style={{ backgroundColor  : '#9A616D' }}>
      {isLoading && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000 }}>
          <LoadingComponent />
        </div>
      )}

      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-8">
            <div className="card" style={{ borderRadius: '1rem', height: '38rem', overflow: 'hidden' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    alt="login form"
                    className="img-fluid zoom-animation"
                    src="https://img.freepik.com/free-vector/two-hands-holding-phones-with-messages-speech-bubbles-people-chatting-through-mobile-app-flat-vector-illustration-communication-network-social-media-concept-banner-landing-web-page_74855-25390.jpg?semt=ais_hybrid&w=740"
                    style={{ borderRadius: '1rem 0 0 1rem', marginTop: '8rem' }} />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                        <span className="h1 fw-bold mb-0">
                          <img src={ChatApplogo} alt="login form" className="img-fluid rotate-alternate"
                            style={{ height: '7rem', borderRadius: '7rem' }} />
                        </span>
                      </div>

                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                        Sign into your account
                      </h5>

                      <div className="form-outline mb-4">
                        <input type="email" className="form-control form-control-lg"
                          id="email"
                          value={form?.email}
                          onChange={(e) => dispatch({ type: 'email', payload: e.target.value })}
                          placeholder="Email address" />
                        <label className="form-label">Email address</label>
                      </div>


                      <div className="form-outline mb-4" style={{ position: 'relative' }}>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          value={form?.password}
                          onChange={(e) => dispatch({ type: 'password', payload: e.target.value })}
                          className="form-control form-control-lg"
                          placeholder="Password"
                        />
                        <label className="form-label">Password</label>

                        {/* Eye Icon */}
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          style={{
                            position: 'absolute',
                            top: '33%',
                            right: '10px',
                            transform: 'translateY(-50%)',
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </div>

                      {/* <a className="small text-muted" > */}
                      <Link to="/auth/forgot-password" style={{ textDecoration: 'none' }}>
                        Forgot password?
                      </Link>
                      {/* </a> */}

                      <div className="pt-1 mb-4">
                        <button className="btn btn-dark btn-lg btn-block" type="submit">
                          Login
                        </button>
                      </div>


                      <p className="mb-5 pb-lg-2" style={{ color: '#393f81', fontSize: '0.8rem' }}>
                        Don't have an account?
                        <Link to="/auth/register" style={{ color: 'rgb(32 46 199)', textDecoration: 'none' }}>
                          Register here
                        </Link>
                      </p>

                      <a className="small text-muted">Terms of use.</a>
                      <a className="small text-muted">Privacy policy</a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;