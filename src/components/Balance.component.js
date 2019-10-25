import React from 'react';
import CreateTransactionContainer from './CreateTransaction/CreateTransactionContainer.component';

export default class Balance extends React.Component {
  constructor (props) {
    super(props);
    this.state = { showCreate: false }
    this.onClickShowCreate = this.onClickShowCreate.bind(this);
  }

  containerStyle = {
    textAlign: 'center',
    margin: '5% 0% 5% 0',
    backgroundColor: 'white',
    padding: '5% 0 5% 0',
    boxShadow: '5px 5px 5px 0px #d1d1d1'
  }

  pStyle = { marginBottom: 0 }

  onClickShowCreate (e) {
    this.setState({ showCreate: !this.state.showCreate });
  }
  
  render () {
    return (
      <div style={this.containerStyle}>
        <div className="row">
          <div className="col-6">
            <p style={this.pStyle}>BALANCE</p>
          </div>
          <div className="col-6">
            <p style={this.pStyle}>...</p>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <h3>{this.props.balance.toFixed(2)}</h3>
          </div>
          <div className="col-6">
            <h3>...</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button className="btn btn-info" onClick={this.onClickShowCreate}>
              { (!this.state.showCreate) ? 'Show Create Menu' : 'Hide Create Menu'}
            </button>
          </div>
        </div>
        { (this.state.showCreate) ? <CreateTransactionContainer /> : null }
      </div>
    );
  }
}