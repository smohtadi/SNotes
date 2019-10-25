import React from 'react';
import './transaction.css'

const TransactionPresentational = ({
  transaction,
  onClickShowEditDelete,
  date,
  isSelected,
  onClickEditTransaction,
  onClickDeleteTransaction
}) => {
  // Styles
  const debitColor = '#d1326a';
  const creditColor = '#12B423';

  return (
    <div
      className="transaction-container"
      style={
        transaction.type === 'Debit'
          ? { borderLeft: `2px solid ${debitColor}` }
          : { borderLeft: `2px solid ${creditColor}` }
      }>
      <div onClick={onClickShowEditDelete}>
        <div className='row'>
          <div className='col-2'>
            {transaction.type === 'Debit' ? (
              <i
                style={{ margin: '10%', color: debitColor }}
                className='far fa-frown-open fa-3x'></i>
            ) : (
              <i
                style={{ margin: '10%', color: creditColor }}
                className='far fa-smile-beam fa-3x'></i>
            )}
          </div>
          <div className='col-10'>
            <div className='row'>
              <div className='col-7'>
                <h4>{transaction.description}</h4>
              </div>
              <div className='col-3'>
                <h4>$ {transaction.amount}</h4>
              </div>
            </div>
            <div className='row'>
              <div className='col-7'>
                <p>{date}</p>
              </div>
              <div className='col-3'>
                <p>{transaction.type}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isSelected ? (
        <div className='row'>
          <div className='col-7'>
            <button className='btn btn-info' onClick={onClickEditTransaction}>
              Edit
            </button>
          </div>
          <div className='col-5'>
            <button
              className='btn btn-danger'
              onClick={onClickDeleteTransaction}>
              Delete
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TransactionPresentational;
