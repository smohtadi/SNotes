import React from 'react';
import { Link } from 'react-router-dom';
import ErrorFlash from '../Error.component';

const LandingPresentional = ({
  errorFlag,
  errorMsg,
  onSubmit,
  loginFieldStyle
}) => {
  return (
    <div>
      <div className='text-center'>
        <h1>Login</h1>
        <h3>
          <Link to='/register'>Register Here</Link>
        </h3>
      </div>
      <ErrorFlash message={errorMsg} errorFlag={errorFlag} />
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Username:</label>
          <input
            name='username'
            className='form-control'
            style={loginFieldStyle}
            type='text'
            placeholder='Enter your username'
          />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            name='password'
            className='form-control'
            style={loginFieldStyle}
            type='password'
            placeholder='Enter your password'
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-primary'>
            LOGIN <i className='fas fa-sign-in-alt'></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LandingPresentional;
