import React from 'react';
import '../styles/LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="form-container">
      <div id="LoadingSpinner">
        <div className="loading-spinner"></div>
        <span className="loading-msg-text">Fetching Events...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
