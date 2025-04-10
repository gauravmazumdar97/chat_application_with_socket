import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column min-vh-100 justify-content-center">
      <Row className="justify-content-center">
        <Col md={8} lg={6} className="text-center">
          {/* Error Icon */}
          <div className="mb-4" style={{ fontSize: '5rem', color: '#dc3545' }}>
            <i className="bi bi-shield-lock"></i>
          </div>
          
          {/* Title */}
          <h1 className="display-4 fw-bold mb-3">401 Unauthorized</h1>
          
          {/* Message */}
          <p className="lead mb-4">
            You don't have permission to access this page. Please contact your administrator or 
            sign in with different credentials.
          </p>
          
          {/* Action Buttons */}
          <div className="d-flex gap-3 justify-content-center">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate(-1)}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Go Back
            </Button>
            
            <Button 
              variant="outline-primary" 
              size="lg"
              onClick={() => navigate('/auth/login')}
            >
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Login Page
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Unauthorized;