import React from 'react';

const ErrorFlash = ({ message, errorFlag }) => {
  return (
    (errorFlag) ?
    <h4 style={{ color: 'red' }}>{message}</h4>
    :
    null 
  );
}

export default ErrorFlash;
