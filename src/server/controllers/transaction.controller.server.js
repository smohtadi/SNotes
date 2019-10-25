const express = require('express');
const transactionModel = require('../models/transaction.model.server');
const userModel = require('../models/user.model.server');
const transactionRouter = express.Router();

/**
 * Report Route.
 * URI: /report/q?uid=&type=&yearFrom=&monthFrom=6&
 * yearTo=&monthTo= 
 */
transactionRouter.get('/report/q?', async (req, res) => {
  try {
    const dateFrom = new Date(req.query.yearFrom, req.query.monthFrom, 1);
    const dateTo = new Date(req.query.yearTo, req.query.monthTo, 1);
    const transactions = await transactionModel.aggregate([
      { $match: {
        type: req.query.type, uid: req.query.uid,
        date: { $gte: dateFrom, $lte: dateTo } } },
      { $group: {
        _id: { year: { $year: '$date' }, month: { $month: '$date' } },
        amount: { $sum: '$amount' } }
      },
      { $sort: { "_id.year": 1, "_id.month": 1} }
    ]);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(404).send(error);
  }
});

transactionRouter.get('/getOne/:id', async (req, res) => {
  try {
    const transaction = await transactionModel.findById(req.params.id);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(404).send(error)
  }
});

transactionRouter.get('/:uid', async (req, res) => {
  try {
    const transactions = await transactionModel.find({ uid: req.params.uid });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(404).send(error);
  }
});

transactionRouter.post('/create/', async (req, res) => {
  try {
    const transaction = new transactionModel(req.body);
    let amount = transaction.amount;
    if (transaction.type === 'Debit') { amount *= (-1); }
    await transaction.save();
    await addToBalance(transaction.uid, amount);
    res.status(201).json({tid: transaction['_id']});
  } catch (error) {
    res.status(400).send(error);
  }
});

transactionRouter.put('/update/', async (req, res) => {
  try {
    const transaction = await transactionModel.findById(req.body.tid);
    let updatedAmount = req.body.amount;
    let originalAmount = transaction.amount;
    let originalType = transaction.type;
    transaction.description = req.body.description;
    transaction.amount = req.body.amount;
    transaction.type = req.body.type;
    await transaction.save();
    if (originalType === 'Credit') { originalAmount *= (-1); }
    if (req.body.type === 'Debit') { updatedAmount *= (-1); }
    updatedAmount = originalAmount + updatedAmount;
    await addToBalance(transaction.uid, updatedAmount);
    res.status(200).send('Success');
  } catch (error) {
    res.status(404).send(error);
  }
});

transactionRouter.delete('/delete/:id', async (req, res) => {
  try {
    const t = await transactionModel.findOneAndDelete({_id: req.params.id});
    let amount = t.amount;
    if (t.type === 'Credit') { amount = t.amount * (-1); }
    const r = await addToBalance(t.uid, amount);
    res.status(200).send(r);
  } catch (error) {
    res.status(404).send(error);
  }
});

function addToBalance (uid, amount) {
  return userModel.findById(uid).then(user => {
    user.balance = user.balance + amount;
    return user.save().then(data=>{
      return 'Success';
    }).catch(erro => {
      throw erro;
    });
  }).catch(error => {
    throw error;
  });
}

module.exports = transactionRouter;