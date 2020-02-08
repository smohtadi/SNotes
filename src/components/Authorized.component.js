import React from 'react';
import DashboardContainer from './Dashboard/DashboardContainer.component';
import { checkLoggedIn } from '../services/user.service';

export default function(ComposedComponent) {
  return class Authorized extends React.Component {
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
        });
    }

    render() {
      if (this.state.isAuthenticated) {
        return <DashboardContainer {...this.props} />
      }
      return <ComposedComponent {...this.props} />
    }
  };
}
