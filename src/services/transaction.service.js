const keys = require('../config/keys');
const tranApi = keys.SERVER_URI + '/transaction';

const sendHttpRequest = function(method, url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    if (data) {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }
    xhr.responseType = 'json';
    xhr.onload = () => {
      xhr.status >= 400 ? reject(xhr.response) : resolve(xhr.response);
    };
    xhr.onerror = () => {
      reject('Network connection failed');
    };
    xhr.send(JSON.stringify(data));
  });
};
export const createTransaction = function(transaction) {
  return sendHttpRequest('POST', `${tranApi}/create/`, transaction);
};
export const getTransactions = function(uid) {
  return sendHttpRequest('GET', `${tranApi}/${uid}`);
};
export const getTransaction = function(tid) {
  return sendHttpRequest('GET', `${tranApi}/getOne/${tid}`);
};
export const editTransaction = function(transaction) {
  return sendHttpRequest('PUT', `${tranApi}/update/`, transaction);
};
export const deleteTransaction = function(tid) {
  return sendHttpRequest('DELETE', `${tranApi}/delete/${tid}`);
};
export const getReport = function(uid, type) {
  const curr_date = new Date();
  const prev_date = new Date();
  curr_date.setDate(curr_date.getMonth() + 1);
  prev_date.setMonth(prev_date.getMonth() - 3);
  const query =
    'uid=' +
    uid +
    '&type=' +
    type +
    '&yearFrom=' +
    prev_date.getFullYear() +
    '&monthFrom=' +
    prev_date.getMonth() +
    '&yearTo=' +
    curr_date.getFullYear() +
    '&monthTo=' +
    curr_date.getMonth();
  return sendHttpRequest('GET', `${tranApi}/report/q?${query}`);
};
