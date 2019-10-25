import React from 'react';
import { createTransaction } from '../../services/transaction.service';
import { withCookies } from 'react-cookie';
import CreateTransactionPresentational from './CreateTransactionPresentational.component';

class CreateTransactionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateStyle: null,
      amountStyle: null,
      type: 'Credit'
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
  }

  onChangeType(e) {
    this.setState({ type: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const target = e.target;
    if (
      !this.dateValidator(
        target.date.value,
        target.month.value,
        target.year.value
      )
    ) {
      this.setState({ dateStyle: { border: '2px solid #eb1d5b' } });
      return;
    } else {
      this.setState({ dateStyle: null });
    }

    if (!this.amountValidator(target.amount.value)) {
      this.setState({ amountStyle: { border: '2px solid #eb1d5b' } });
      return;
    } else {
      this.setState({ amountStyle: null });
    }

    createTransaction({
      description: target.description.value,
      date: new Date(
        target.year.value,
        target.month.value - 1,
        target.date.value
      ),
      uid: this.props.cookies.get('uid'),
      amount: target.amount.value,
      type: this.state.type
    })
      .then(res => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  }

  dateValidator(d, m, y) {
    if (
      isNaN(d) ||
      isNaN(m) ||
      isNaN(y) ||
      d === '' ||
      m === '' ||
      y === '' ||
      (d < 1 || d > 31) ||
      (m < 1 || m > 12) ||
      (y < 1970 || y > 2025)
    )
      return false;
    return true;
  }

  amountValidator(amount) {
    if (isNaN(amount) || amount < 0 || amount === '') {
      return false;
    }
    return true;
  }

  render() {
    return (
      <CreateTransactionPresentational
        onSubmit={this.onSubmit}
        dateStyle={this.state.dateStyle}
        onChangeType={this.onChangeType}
        amountStyle={this.state.amountStyle}
      />
    );
  }
}

export default withCookies(CreateTransactionContainer);
