import React from 'react';
import { withRouter } from 'react-router-dom';
import TransactionPresentational from './TransactionPresentational.component';
import { deleteTransaction } from '../../services/transaction.service';

class TransactionContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isSelected: false,
      date: this.getDate(this.props.transaction.date)
    };
    this.onClickShowEditDelete = this.onClickShowEditDelete.bind(this);
    this.onClickEditTransaction = this.onClickEditTransaction.bind(this);
    this.onClickDeleteTransaction = this.onClickDeleteTransaction.bind(this);
  }

  getDate (date) {
    const OPTIONS = { year: 'numeric', month:'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', OPTIONS);
  }
  
  onClickShowEditDelete (e) {
    this.setState({ isSelected: !this.state.isSelected });
  }

  onClickEditTransaction(e) {
    this.props.history.push(`/transaction/edit/${this.props.transaction._id}`);
  }

  onClickDeleteTransaction(e) {
    deleteTransaction(this.props.transaction._id).then(res => {
      this.props.loadDashCmps();
    }).catch(error => {
      console.error(error);
    });
  }

  render () {
    return (<TransactionPresentational
    transaction = {this.props.transaction}
    onClickShowEditDelete = {this.onClickShowEditDelete}
    date = {this.state.date}
    isSelected = {this.state.isSelected}
    onClickEditTransaction = {this.onClickEditTransaction}
    onClickDeleteTransaction = {this.onClickDeleteTransaction} />);
  }
}

export default withRouter(TransactionContainer);