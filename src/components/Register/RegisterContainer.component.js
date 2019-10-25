import React from 'react';
import { withCookies } from 'react-cookie';
import { registerService } from '../../services/user.service';
import RegisterPresentational from './RegisterPresentational.component';

class RegisterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      borderStyle: null,
      errorFlag: false,
      errorMsg: ''
    }
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onSubmit (e) {
    e.preventDefault();
    const t = e.target;
    if (t.username.value === ''
    || t.password.value === ''
    || isNaN(t.balance.value)
    || isNaN(t.threshold.value)) {
      this.setState({ borderStyle: {border: '2px solid red'} });
      return;
    }
    registerService({
      username: t.username.value,
      password: t.password.value,
      balance: t.balance.value,
      threshold: t.threshold.value
    }).then(res => {
        this.props.history.push('/profile');
        this.props.cookies.set('uid', res.uid, { path: '/', maxAge: 60 * 60 * 2 });
        this.props.cookies.set('threshold', res.threshold, { path: '/', maxAge: 60 * 60 * 2 } );
      }).catch(error => {
        this.setState({
          errorFlag: true,
          errorMsg: error.message
        });
    });
  }

  render () {
    return (
      <RegisterPresentational
      borderStyle={this.state.borderStyle}
      onSubmit={this.onSubmit}
      errorFlag={this.state.errorFlag}
      errorMsg={this.state.errorMsg}
      />
    );
  }
}

export default withCookies (RegisterContainer);