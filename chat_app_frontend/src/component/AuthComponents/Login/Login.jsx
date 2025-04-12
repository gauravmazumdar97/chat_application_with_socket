import React, { useReducer, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import background_for_chatApplication from '../../../assets/background_for_chatApplication.png';
import ChatApplogo from '../../../assets/ChatApplication_LOGO.png';
import axios from 'axios';
import LoadingComponent from '../../ReusableComponents/LoadingComponent/LoadingComponent';


function Login() {
  const navigate = useNavigate(); // ✅ This is important!
  const [isLoading, setIsLoading] = useState(false); // Loading state


  const initialState = {
    email: "",
    password: "",
    captcha: "MNO",
  }


  const [form, dispatch] = useReducer(RenderFunction, initialState);

  function RenderFunction(state, action){
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
      e.preventDefault(); // Prevent page reload
      setIsLoading(true); // Start loading before API CALL
      console.log("This is the value in the FORM :-");
      console.log(form); 
      const payload = {
        email: form.email,
        password: form.password,
      };
      
      try {
        const { data } = await axios.post('http://192.168.20.227:7000/api/auth/login', payload);
  
        console.log("✅ Login success:", data);
        localStorage.setItem('token', data.user.token);
        
        setTimeout(() => {
          navigate('/home');
          // setIsLoading(false); // Stop loading before navigation
        }, 3000);
        
      } catch (error) {
        // setIsLoading(false); // Stop loading on error
        console.error("❌ Login failed:", error.response?.data?.message || error.message);
        alert(error.response?.data?.message || "Login failed. Please try again.");
      }

    }
    
  return (
    <section className="vh-100" style={{ backgroundColor: '#9A616D' }}>
        {/* Loading overlay - shown only when isLoading is true */}
        {isLoading && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000 }}>
          <LoadingComponent />
          <span style={{ color: 'white', marginLeft: '10px' }}>Logging in...</span>
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
                    <form  onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                        <span className="h1 fw-bold mb-0">
                          <img src={ChatApplogo} alt="login form" className="img-fluid"
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

                      <div className="form-outline mb-4">
                        <input type="password" id="password" 
                         value={form?.password}
                         onChange={(e) => dispatch({ type: 'password', payload: e.target.value })}
                         className="form-control form-control-lg" 
                         placeholder="Password" />
                        <label className="form-label">Password</label>
                      </div>

                      <a className="small text-muted" href="#!">
                      <Link to="/auth/forgot-password" style={{ textDecoration: 'none' }}>
                      Forgot password?
                        </Link>
                        </a>
                      
                      <div className="pt-1 mb-4">
                        <button className="btn btn-dark btn-lg btn-block" type="submit">
                          Login
                        </button>
                      </div>


                      <p className="mb-5 pb-lg-2" style={{ color: '#393f81', fontSize:'0.8rem' }}>
                        Don't have an account?
                        <Link to="/auth/register" style={{ color: 'rgb(32 46 199)', textDecoration: 'none' }}>
                          Register here
                        </Link>
                      </p>

                      <a href="#!" className="small text-muted">Terms of use.</a>
                      <a href="#!" className="small text-muted">Privacy policy</a>
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