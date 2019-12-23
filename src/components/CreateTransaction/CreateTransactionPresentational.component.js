import React from 'react';

const CreateTransactionPresentational = ({
  dateStyle, amountStyle, onChangeAmount, onChangeDate,
  onChangeDescription, onChangeMonth, onChangeType,
  onChangeYear, onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} style={{margin: '1%'}}>
      <div className="form-group row">
        <div className="col-6">
          <input
          onChange={onChangeDescription}
          autoComplete="off"
          className="form-control"
          placeholder="Description"
          />
        </div>
        <div className="col-2">
          <input
          onChange={onChangeDate}
          autoComplete="off"
          className="form-control"
          style = {dateStyle}
          placeholder="DD" />
        </div>
        <div className="col-2">
          <input
          onChange={onChangeMonth}
          autoComplete="off"
          className="form-control"
          style = {dateStyle}
          placeholder="MM" />
        </div>
        <div className="col-2">
          <input
          onChange={onChangeYear}
          autoComplete="off"
          className="form-control"
          style = {dateStyle}
          placeholder="YYYY" />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-6">
        <select
        className="form-control"
        onChange={onChangeType}>
          <option value='Debit'>Debit</option>
          <option value='Credit'>Credit</option>
        </select>
        </div>
        <div className="col-6">
          <input
          onChange={onChangeAmount}
          autoComplete="off"
          className="form-control"
          name="amount"
          style={amountStyle}
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