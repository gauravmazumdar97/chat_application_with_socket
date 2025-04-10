import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/login" style={styles.link}>Go back home</Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '100px 20px',
    color: '#333',
  },
  heading: {
    fontSize: '72px',
    marginBottom: '20px',
  },
  message: {
    fontSize: '24px',
    marginBottom: '30px',
  },
  link: {
    fontSize: '18px',
    color: '#007bff',
    textDecoration: 'none',
  }
};

export default NotFound;
