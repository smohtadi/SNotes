import React from 'react';
import { withCookies } from 'react-cookie';
import { getReport } from '../../services/transaction.service';
import { getBalance } from '../../services/user.service';
import Stats from '../../utils/Stats.util';
import ReportPresentational from './ReportPresentational.component';

class ReportContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spendingSum: 0,
      incomeSum: 0,
      incomeProjected: 0,
      spendingProjected: 0,
      suggestedSaving: 0,
    };
  }

  async componentDidMount() {
    try {
      const uid = this.props.cookies.get('uid');
      const threshold = this.props.cookies.get('threshold');
      const creditData = await getReport(uid, 'Credit');
      const debitData = await getReport(uid, 'Debit');
      let balance = await getBalance(uid);
      balance = balance.balance;
      const stats = new Stats(creditData, debitData);
      this.setState({
        incomeSum: stats.getTotal('Credit'),
        spendingSum: stats.getTotal('Debit'),
        incomeProjected: stats.getProjection('Credit'),
        spendingProjected: stats.getProjection('Debit'),
        suggestedSaving: stats.getSuggestedSaving(threshold, balance),
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <ReportPresentational
        incomeSum={this.state.incomeSum}
        spendingSum={this.state.spendingSum}
        incomeProjected={this.state.incomeProjected}
        spendingProjected={this.state.spendingProjected}
        suggestedSaving={this.state.suggestedSaving}
      />
    );
  }
}

export default withCookies(ReportContainer);
