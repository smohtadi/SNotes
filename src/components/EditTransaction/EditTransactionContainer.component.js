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
    if (isNaN(this.state.amount)) {
      return;
    }
    editTransaction({
      description: this.state.description,
      type: this.state.type,
      amount: this.state.amount,
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
      amount={this.state.amount}
      description={this.state.description}
      type={this.state.type}  
      onChangeAmount={this.onChangeAmount}
      onChangeDescription={this.onChangeDescription}
      onChangeType={this.onChangeType}
      onSubmit={this.onSubmit}
      />
    );
  }
}

export default withRouter(EditTransactionContainer);