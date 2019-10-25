import React from 'react';
import { withRouter } from 'react-router-dom';
import EditransactionPresentational from './EditTransactionPresentational.component';
import { getTransaction, editTransaction } from '../../services/transaction.service';

class EditTransactionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      type: 'Credit',
      amount: 0
    };
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    getTransaction(this.props.match.params.id)
      .then(res => {
        this.setState({
          description: res.description,
          type: res.type,
          amount: res.amount
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onChangeType(e) {
    this.setState({ type: e.target.value });
  }
  onChangeDescription(e) {
    this.setState({description: e.target.value})
  }
  onChangeAmount(e) {
    this.setState({amount: e.target.value});
  }
  onSubmit(e) {
    e.preventDefault();
    if (isNaN(e.target.amount.value) || e.target.amount.value === '') {
      console.log('Amount not a number');
      return;
    }
    editTransaction({
      description: e.target.description.value,
      type: e.target.type.value,
      amount: e.target.amount.value,
      tid: this.props.match.params.id
    })
      .then(res => {
        this.props.history.push('/profile');
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <EditransactionPresentational
        onSubmit={this.onSubmit}
        description={this.state.description}
        type={this.state.type}
        onChangeType={this.onChangeType}
        amount={this.state.amount}
        onChangeDescription={this.onChangeDescription}
        onChangeAmount={this.onChangeAmount}
      />
    );
  }
}

export default withRouter(EditTransactionContainer);