import React from 'react';
import { withCookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';
import LandingPresentional from './LandingPresentaional.component';
import { loginService } from '../../services/user.service';

class LandingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginFieldStyle: null,
      errorFlag: false,
      errorMsg: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const t = e.target;
    if (t.username.value === '' || t.password.value === '') {
      this.setState({ loginFieldStyle: { border: '2px solid red' } });
      return;
    }

    loginService({
      username: t.username.value,
      password: t.password.value
    })
      .then(res => {
        this.props.cookies.set('uid', res.uid, {
          path: '/',
          maxAge: 60 * 60 * 2
        });
        this.props.cookies.set('threshold', res.threshold, {
          path: '/',
          maxAge: 60 * 60 * 2
        });
        this.props.history.push('/profile');
      })
      .catch(error => {
        this.setState({
          errorFlag: true,
          errorMsg: error.message
        });
      });
      this.setState({errorFlag: true, errorMsg: 'Checking credentials...'});
  }

  render() {
    return (
      <LandingPresentional
        loginFieldStyle={this.state.loginFieldStyle}
        errorMsg={this.state.errorMsg}
        errorFlag={this.state.errorFlag}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default withRouter(withCookies(LandingContainer));
