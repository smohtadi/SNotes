import React from 'react';
import LandingContainer from './Landing/LandingContainer.component';
import { checkLoggedIn } from '../services/user.service';

export default function(ComposedComponent) {
  return class Authenticate extends React.Component {
    constructor(props) {
      super(props);
      this.state = { isAuthenticated: false };
    }

    componentDidMount() {
      checkLoggedIn()
        .then(res => {
          if (res.uid !== undefined) {
            this.setState({ isAuthenticated: true });
          }
        })
        .catch(err => {
          this.setState({ isAuthenticated: false });
          this.props.history.push('/');
          console.log(err);
        });
    }

    render() {
      return this.state.isAuthenticated ? (
        <ComposedComponent {...this.props} />
      ) : <LandingContainer />;
    }
  };
}
