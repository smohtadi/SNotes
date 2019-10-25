import React from 'react';
import { Link } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { logoutService } from '../services/user.service';

class Navbar extends React.Component {
  constructor (props) {
    super(props);
  }
  style = {
    backgroundColor: 'white',
    padding: '1% 0 1% 0',
    textAlign: 'center',
    boxShadow: '5px 5px 5px 0px #d1d1d1'
  };

  logout = function() {
    logoutService()
      .then(res => {
        this.props.cookies.remove('uid');
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  };

  render () {
  return (
    <div className='container-fluid' style={this.style}>
      <div className='row'>
        <div className='col-4'>
          <Link to='/'>
            <i className='fas fa-dollar-sign'></i>Notes
          </Link>
        </div>
        <div className='col-4'>
          <Link to='/report'>
            <i className='fas fa-chart-bar'></i> Report
          </Link>
        </div>
        <div className='col-4'>
          <button className='btn' onClick={this.logout}>
            <i className='fas fa-sign-out-alt'></i> Logout
          </button>
        </div>
      </div>
    </div>
  );
  }
};

export default withCookies(Navbar);