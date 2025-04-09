// CursorFollower.js
import { useEffect } from 'react';
import { gsap } from 'gsap';
import './FollowCursor.css'; // Create this CSS file


const FollowCursor = () => {
  useEffect(() => {
    const ball = document.querySelector('.ball');
    if (!ball) return;

    // Initialize with proper transforms
    gsap.set(ball, {
      xPercent: -50,
      yPercent: -50,
      opacity: 1 // Explicitly set opacity here
    });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.3;
    const fpms = 60 / 1000;

    const xSet = gsap.quickSetter(ball, 'x', 'px');
    const ySet = gsap.quickSetter(ball, 'y', 'px');

    const move = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    window.addEventListener('mousemove', move);

    gsap.ticker.add((time, deltaTime) => {
      const delta = deltaTime * fpms;
      const dt = 1.0 - Math.pow(1.0 - speed, delta);

      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSet(pos.x);
      ySet(pos.y);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      gsap.killTweensOf(ball); // Clean up GSAP animations
    };
  }, []);

  return <div className="ball" />;
};

export default FollowCursor;
