import React from 'react';
import { Atom } from 'react-loading-indicators';

function LoadingComponent() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Atom
        color="#32cd32"
        height={220}        // explicitly set height
        width={220}         // explicitly set width
        text="Loading..."
        textColor="#32cd32"
      />
    </div>
  );
}

export default LoadingComponent;
