import React from 'react';
import { Atom } from 'react-loading-indicators';

function LoadingComponent() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Atom
        color="#32cd32"       // LimeGreen
        size="medium"         // Options: small | medium | large
        text="Loading..."     // Optional: add loading text
        textColor="#32cd32"   // Text color
      />
    </div>
  );
}

export default LoadingComponent;
