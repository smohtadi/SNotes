import React from 'react';
import { withCookies } from 'react-cookie';
import Balance from '../Balance.component';
import TransactionContainer from '../Transaction/TransactionContainer.component';
import { getTransactions } from '../../services/transaction.service';
import { getBalance } from '../../services/user.service';

class DashboardContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      uid: this.props.cookies.cookies.uid,
      balance: 0,
      transactions: []
    };
    this.loadDashCmps = this.loadDashCmps.bind(this);
  }
  componentDidMount() {
    this.loadDashCmps();
  }
  displayTransactions() {
    return this.state.transactions.map((transaction, i) => {
      return <TransactionContainer
      transaction={transaction}
      loadDashCmps={this.loadDashCmps}
      key={i}
      />
    });
  }
  loadDashCmps () {
    getTransactions(this.state.uid).then(res => {
      this.setState({ transactions : res });
    }).catch(error => {
      console.log(error)
    });
    getBalance(this.state.uid).then(res => {
      this.setState({ balance: res.balance});
    }).catch(error => {
      console.log(error)
    });
  }
  render () {
    return (
      <div>
        <Balance balance={ this.state.balance } />
        {this.displayTransactions()}
      </div>
    );
  }
}
export default withCookies(DashboardContainer);