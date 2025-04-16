import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ChatApplogo from '../../../assets/ChatApplication_LOGO.png';

function LoadingComponent() {
  const logoRef = useRef(null);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    // GSAP Animation
    gsap.fromTo(
      logoRef.current,
      { scale: 0.3, rotation: 5, opacity: 0.1 },
      {
        scale: 1.5,
        rotation: 1080,
        opacity: 1,
        duration: 2,
        ease: 'power3.inOut',
        repeat: -1,
        yoyo: true,
      }
    );

    // Percentage loader
    const interval = setInterval(() => {
      setPercentage((prev) => {
        const newValue = prev + Math.floor(Math.random() * 10) + 1;
        return newValue > 100 ? 100 : newValue;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <img ref={logoRef} src={ChatApplogo} alt="App Logo" style={{ height: '6rem', borderRadius: '50%' }}
        className="mb-4" />
      
      {/* Percentage Display */}
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'rgb(253 253 253)', marginTop: '1rem', 
        fontFamily: 'monospace' }}>{percentage}%
      </div>
      
      {/* Progress Bar (Optional) */}
      <div style={{width: '200px',height: '10px',backgroundColor: '#e0e0e0',borderRadius: '5px',
        marginTop: '0.5rem',overflow: 'hidden'}}>
      <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: '#32cd32', 
        transition: 'width 0.3s ease' }}></div>
      </div>
    </div>
  );
}

export default LoadingComponent;