import React from 'react';

const ReportPresentational = ({
  incomeSum,
  spendingSum,
  incomeProjected,
  spendingProjected,
  suggestedSaving
}) => {
  const style = {
    padding: '3% 0 3% 0',
    backgroundColor: 'white',
    marginTop: '1%',
    boxShadow: '5px 5px 5px 0px #d1d1d1'
  };

  return (
    <div>
      <div className='text-center' style={style}>
        <div className='row'>
          <div className='col-12'>
            <h1>Report:</h1>
          </div>
        </div>

        <div className='row'>
          <div className='col-6'>
            <p>Spendings in the last 3 months:</p>
          </div>
          <div className='col-6'>
            <p>Projected spending for next month:</p>
          </div>
        </div>

        <div className='row'>
          <div className='col-6'>
            <h4>$ {spendingSum}</h4>
          </div>
          <div className='col-6'>
            <h4>$ {spendingProjected}</h4>
          </div>
        </div>

        <div className='row'>
          <div className='col-6'>
            <p>Income in the last 3 months:</p>
          </div>
          <div className='col-6'>
            <p>Projected income for the next month:</p>
          </div>
        </div>

        <div className='row'>
          <div className='col-6'>
            <h4>$ {incomeSum}</h4>
          </div>
          <div className='col-6'>
            <h4>$ {incomeProjected}</h4>
          </div>
        </div>

        <div className='row'>
          <div className='col-12'>
            <p>Suggested savings:</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <h4>$ {suggestedSaving}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPresentational;