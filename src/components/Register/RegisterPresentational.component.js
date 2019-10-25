import React from 'react';
import ErrorFlash from '../Error.component';

const RegisterPresentational = ({
  borderStyle,
  onSubmit,
  errorFlag,
  errorMsg
}) => {
  return (
    <div>
      <div className="text-center">
        <h1>Register</h1>
      </div>
      <ErrorFlash errorFlag={errorFlag} errorMsg={errorMsg} /> 
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
          name="username"
          className="form-control"
          style={borderStyle}
          type="text"
          placeholder="Enter a username" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
          name="password"
          className="form-control"
          style={borderStyle}
          type="password"
          placeholder="Enter a password" />
        </div>
        <div className="form-group">
          <label>Balance amount</label>
          <input
          name="balance"
          className="form-control"
          style={borderStyle}
          type="text"
          placeholder="Enter balance amount" />
        </div>
        <div className="form-group">
          <label>Threshold</label>
          <input
          name="threshold"
          className="form-control"
          style={borderStyle}
          type="text"
          placeholder="Min amount of $ you want to have" />
        </div>
        <div className="form-group">
          <button className="btn btn-primary">
            Register
          </button>
        </div>
      </form> 
    </div>
  );
}

export default RegisterPresentational;