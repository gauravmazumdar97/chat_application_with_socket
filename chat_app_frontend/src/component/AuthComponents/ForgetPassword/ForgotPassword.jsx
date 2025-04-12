import React, { useReducer, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ChatApplogo from '../../../assets/ChatApplication_LOGO.png';
import './ForgotPassword.css';



function ForgotPassword() {

  const initialState = {
    new_password:  "",
  }


  const [form, dispatch] = useReducer(RenderFunction, initialState);

  function RenderFunction(state, action){
      const { type, payload } = action;

      switch (type) {
        case "new_password":
          return { ...state, new_password: payload };
      
        default:
          return state;
      }
  
    }

    function handleSubmit(e) {
      e.preventDefault(); // Prevent page reload
      console.log("This is the value in the FORM :-");
      console.log(form);
    }
    
  return (
    <section className="vh-100" style={{ backgroundColor: '#9A616D' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-8">
            <div className="card" style={{ borderRadius: '1rem', height: '600px', overflow: 'hidden' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  {/* <img alt="login form" className="img-fluid"
                    src="https://img.freepik.com/free-vector/two-hands-holding-phones-with-messages-speech-bubbles-people-chatting-through-mobile-app-flat-vector-illustration-communication-network-social-media-concept-banner-landing-web-page_74855-25390.jpg?semt=ais_hybrid&w=740"
                    style={{ borderRadius: '1rem 0 0 1rem', marginTop: '8rem' }} /> */}
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
                          <span>Create new password</span>
                          <span>
                            <img src={ChatApplogo} alt="login form" className="img-fluid"
                              style={{ height: '5.5rem', borderRadius: '7rem', marginLeft:'3rem' }} />
                          </span>
                      </h5>

                      <div className="form-outline mb-5">
                        <input type="new_password" id="new_password" 
                         value={form?.new_password}
                         onChange={(e) => dispatch({ type: 'new_password', payload: e.target.value })}
                         className="form-control form-control-md" 
                         placeholder="Please enter your new password" />
                        <label className="form-label">New password</label>
                      </div>

                      <div className="pt-5">
                        <button className="btn btn-dark btn-lg btn-block" type="submit">
                          New Password
                        </button>

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


export default ForgotPassword