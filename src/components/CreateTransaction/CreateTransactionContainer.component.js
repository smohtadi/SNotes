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
      type: 'Credit',
      amount: 0,
      description: "",
      date: 0,
      month: 0,
      year: 0
    };
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeMonth = this.onChangeMonth.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChangeAmount(e) {
    this.setState({ amount: e.target.value });
  }
  onChangeDate(e) {
    this.setState({ date: e.target.value });
  }
  onChangeDescription(e) {
    this.setState({ description: e.target.value });
  }
  onChangeMonth(e) {
    this.setState({ month: e.target.value });
  }
  onChangeType(e) {
    this.setState({ type: e.target.value });
  }
  onChangeYear(e) {
    this.setState({ year: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    if (
      !this.dateValidator(
        this.state.date,
        this.state.month,
        this.state.year
      )
    ) {
      this.setState({ dateStyle: { border: '2px solid #eb1d5b' } });
      return;
    } else {
      this.setState({ dateStyle: null });
    }

    if (!this.amountValidator(this.state.amount)) {
      this.setState({ amountStyle: { border: '2px solid #eb1d5b' } });
      return;
    } else {
      this.setState({ amountStyle: null });
    }
    createTransaction({
      description: this.state.description,
      date: new Date(
        this.state.year,
        this.state.month - 1,
        this.state.date
      ),
      uid: this.props.cookies.get('uid'),
      amount: this.state.amount,
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
        dateStyle={this.state.dateStyle}
        amountStyle={this.state.amountStyle}
        onChangeAmount={this.onChangeAmount}
        onChangeDate={this.onChangeDate}
        onChangeDescription={this.onChangeDescription}
        onChangeMonth={this.onChangeMonth}
        onChangeType={this.onChangeType}
        onChangeYear={this.onChangeYear}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default withCookies(CreateTransactionContainer);
