import React from 'react';

const CreateTransactionPresentational = ({ onSubmit, dateStyle, onChangeType, amountStyle  }) => {
  return (
    <form onSubmit={onSubmit} style={{margin: '1%'}}>
      <div className="form-group row">
        <div className="col-6">
          <input
          autoComplete="off"
          className="form-control"
          name="description"
          placeholder="Description"
          />
        </div>
        <div className="col-2">
          <input
          autoComplete="off"
          className="form-control"
          style = {dateStyle}
          name="date"
          placeholder="DD" />
        </div>
        <div className="col-2">
          <input
          autoComplete="off"
          className="form-control"
          style = {dateStyle}
          name="month"
          placeholder="MM" />
        </div>
        <div className="col-2">
          <input
          autoComplete="off"
          className="form-control"
          style = {dateStyle}
          name="year"
          placeholder="YYYY" />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-6">
        <select
        className="form-control"
        name="type"
        onChange={onChangeType}
        value= 'Credit'>
          <option value='Debit'>Debit</option>
          <option value='Credit'>Credit</option>
        </select>
        </div>
        <div className="col-6">
          <input
          autoComplete="off"
          className="form-control"
          name="amount"
          style = {amountStyle}
          placeholder="Amount"
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-12">
          <button className="btn btn-primary">
            Create Transaction
          </button>
        </div>
      </div>
    </form>
  )
}

export default CreateTransactionPresentational;