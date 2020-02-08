export default class Stats {
  mCreditArr = [];
  mDebitArr = [];
  mProjectedCredit = 0;
  mProjectedDebit = 0;
  
  constructor (creditData, debitData) {
    this.fillDataArrays(creditData, debitData);
  }

  fillDataArrays (creditData, debitData) {
    for (let i = 0; i < 3; i++) {
      if (i < creditData.length) {
        this.mCreditArr.push(creditData[i].amount);
      } else {
        this.mCreditArr.push(0);
      }
      if (i < debitData.length) {
        this.mDebitArr.push(debitData[i].amount);
      } else {
        this.mDebitArr.push(0);
      }
    }
  }
  
  getTotal (type) {
    let total = 0; let arr;
    if (type === 'Credit') {
      arr = this.mCreditArr;
    } else {
      arr = this.mDebitArr;
    }
    for (let i = 0; i < 3; i++) {
      total += arr[i]; 
    }
    return total;
  }

  getProjection (type) {
    let arr, amount;
    if (type === "Credit") {
      arr = this.mCreditArr;
      amount = this.getTotal("Credit");
    } else {
      arr = this.mDebitArr;
      amount = this.getTotal("Debit");
    }
    const meanX = 1;
    const meanY = amount / 3;
    const slope =
    this.covariance(arr, meanX, meanY) /
    this.variance(arr, meanX);
    let y = (3 * slope) + (meanY - (slope * meanX));
    if (y < 0) { y = 0 }
    return y.toFixed(2);
  }

  getSuggestedSaving(threshold, balance) {
    let projectedIncome = this.getProjection("Credit");
    let projectedDebit = this.getProjection("Debit");
    projectedIncome = (projectedIncome === 0) ? 1 : projectedIncome;
    let x = (projectedIncome - projectedDebit + balance - threshold) / projectedIncome;
    if (x >= 0.20) {
      x = 0.20;
    } else if (x <= 0) {
      x = 0;
    }
    return (projectedIncome * x).toFixed(2);
  }

  covariance (arr, meanX, meanY) {
    let result = 0;
    for (let i = 0; i < arr.length; i++) {
      result += (i - meanX) * (arr[i] - meanY);
    }
    return result;
  }

  variance (arr, meanX) {
    let result = 0;
    for (let i = 0; i < arr.length; i++) {
      result += Math.pow((i - meanX), 2);
    }
    return result;
  }
}