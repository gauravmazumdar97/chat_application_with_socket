import React, { useReducer, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ChatApplogo from '../../../assets/ChatApplication_LOGO.png';
import  axios  from "axios";
import LoadingComponent from "../../ReusableComponents/LoadingComponent/LoadingComponent";
import {environment} from "../../../../environment";

function Register() {

  const [isLoading, setIsLoading] = useState(false);
  const initialState = {
    fullname: "",
    phoneno: "",
    email: "",
    password: "",
  }


  const [form, dispatch] = useReducer(RenderFunction, initialState);
  const navigate = useNavigate();
  
  function RenderFunction(state, action){
      const { type, payload } = action;

      switch (type) {
        case "fullname":
            return { ...state, fullname: payload };

        case "phoneno":
          return { ...state, phoneno: payload };

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
      setIsLoading(true);
      
          const payload = {
            email: form.email,
            password: form.password,
            fullname: form.fullname,
            phoneno: form.phoneno,
          };
          
          
          try {
            // const { data } = await axios.post('http://192.168.20.227:7000/api/auth/register', payload);
            const { data } = await axios.post(`${environment.serverUrl}${environment.authApi}/register`, payload);
      
            setTimeout(() => {
              navigate('/login');
              setIsLoading(false);
            }, 2000);
            
          } catch (error) {
            setIsLoading(false); // Stop loading on error
            console.error("❌ Register failed:", error.response?.data?.message || error.message);
            alert(error.response?.data?.message || "Register failed. Please try again.");
      }

    }
    
  return (
    <section className="vh-100" style={{ backgroundColor: '#9A616D' }}>
      {isLoading && (
        <div style={{ 
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',justifyContent: 'center',alignItems: 'center',zIndex: 1000}}>
          <LoadingComponent />
        </div> )}
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-8">
            <div className="card" style={{ borderRadius: '1rem', height: '600px', overflow: 'hidden' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                <img
                    alt="login form"
                    className="img-fluid zoom-animation"
                    src="https://img.freepik.com/free-vector/two-hands-holding-phones-with-messages-speech-bubbles-people-chatting-through-mobile-app-flat-vector-illustration-communication-network-social-media-concept-banner-landing-web-page_74855-25390.jpg?semt=ais_hybrid&w=740"
                    style={{ borderRadius: '1rem 0 0 1rem', marginTop: '8rem' }} />
                </div>

                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body text-black">
                    <form className='m-2' onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center">
                        <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                      </div>

                      <h5 className="fw-normal mb-3 pb-3 d-flex justify-content-between align-items-center"
                        style={{ fontSize:'1.5rem' }}>
                          <span>Sign up your account</span>
                          <span>
                            <img src={ChatApplogo} alt="login form" className="img-fluid rotate-alternate"
                              style={{ height: '5.5rem', borderRadius: '7rem', marginLeft:'3rem' }} />
                          </span>
                      </h5>

                      <div className="form-outline mb-2">
                        <input type="text" className="form-control form-control-md" 
                        id="fullname" autoComplete="off" 
                        value={form?.fullname}
                        onChange={(e) => dispatch({ type: 'fullname', payload: e.target.value })}
                        placeholder="Please enter your full name" />
                        <label className="form-label">Full name</label>
                      </div>

                      <div className="form-outline mb-2">
                        <input type="number" id="phoneno" 
                         value={form?.phoneno} autoComplete="off"
                         onChange={(e) => dispatch({ type: 'phoneno', payload: e.target.value })}
                         className="form-control form-control-md" 
                         placeholder="Please enter your phonen no" />
                        <label className="form-label">Phone no</label>
                      </div>

                      <div className="form-outline mb-2">
                        <input type="email" className="form-control form-control-md" 
                        id="email" autoComplete="off" 
                        value={form?.email}
                        onChange={(e) => dispatch({ type: 'email', payload: e.target.value })}
                        placeholder="Please enter your email" />
                        <label className="form-label">Email address</label>
                      </div>

                      <div className="form-outline mb-2">
                        <input type="password" id="password" 
                         value={form?.password} autoComplete="new-password"
                         onChange={(e) => dispatch({ type: 'password', payload: e.target.value })}
                         className="form-control form-control-md" 
                         placeholder="Please enter the password" />
                        <label className="form-label">Password</label>
                      </div>

                      <div className="pt-3">
                        <button className="btn btn-dark btn-lg btn-block" type="submit">
                          Register
                        </button>

                      <p className="mb-5 pb-lg-2" style={{ marginTop:'1.2rem' ,color: '#393f81', fontSize:'0.8rem' }}>
                        <Link to="/auth/login" style={{ color: 'rgb(32 46 199)', textDecoration: 'none' }}>
                          Back to login 
                        </Link>
                      </p>
                      </div>
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

export default Register;