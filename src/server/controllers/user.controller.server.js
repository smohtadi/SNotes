const express = require('express');
const userModel = require('../models/user.model.server');
const keys = require('../../config/keys');
const bcrypt = require('bcrypt');

const userRouter = express.Router();

function sessionizeUser(user) {
  return { uid: user['_id'], threshold: user.threshold };
}

userRouter.post('/register', async (req, res) => {
  try {
    if (
      req.body === undefined ||
      req.body.username === undefined ||
      req.body.password === undefined
    ) {
      throw new Error('Request is missing props');
    }
    const user = await userModel.findOne({ username: req.body.username });
    if (user) {
      throw new Error('Username exists');
    }
    const newUser = new userModel(req.body);
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    const sessionUser = sessionizeUser(newUser);
    await newUser.save();
    req.session.user = sessionUser;
    res.status(201).json(req.session.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

userRouter.post('/login', async (req, res) => {
  try {
    if (
      req.body === undefined ||
      req.body.username === undefined ||
      req.body.password === undefined
    ) {
      throw new Error('Request is missing props');
    }
    const user = await userModel.findOne({ username: req.body.username });
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      throw new Error('Invalid login credentials');
    }
    const sessionUser = sessionizeUser(user);
    req.session.user = sessionUser;
    res.status(200).json(req.session.user);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

userRouter.delete('/logout', (req, res) => {
  try {
    const user = req.session.user;
    if (user) {
      req.session.destroy(err => {
        if (err) throw err;
        res.clearCookie(keys.SESS_NAME);
        res.status(200).json(user);
      });
    } else {
      throw new Error('No user found on session');
    }
  } catch (error) {
    res.status(422).json({ Error: error.message });
  }
});

userRouter.get('/balance/:uid', async (req, res) => {
  try {
    const balance = await userModel.find({ _id: req.params.uid }).select({
      balance: 1,
      _id: 0
    });
    res.status(200).json(balance[0]);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
});

userRouter.get('/isLogged', (req, res) => {
  res.status(200).json(req.session.user);
});

module.exports = userRouter;
