const keys = require('../config/keys');
const userApi = keys.SERVER_URI + '/user';

const sendHttpRequest = (method, url, data, sendCredentials) => {
  return new Promise ((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    if (data) {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }
    xhr.withCredentials = sendCredentials ? true : false;
    xhr.responseType = 'json';
    xhr.onload = () => {
      xhr.status >= 400 ? reject(xhr.response) : resolve(xhr.response);
    }
    xhr.onerror = () => {
      reject(new Error('Network connection failed'));
    }
    xhr.send(JSON.stringify(data));
  });
}
export const loginService = function (user) {
  return sendHttpRequest('POST', `${userApi}/login`, user, true);
}
export const registerService = function (user) {
  return sendHttpRequest('POST', `${userApi}/register`, user, true);
};
export const getBalance = function(uid) {
  return sendHttpRequest('GET', `${userApi}/balance/${uid}`);
};
export const logoutService = function() {
  return sendHttpRequest ('DELETE', `${userApi}/logout`, null, true);
};
export const checkLoggedIn = function () {
  return sendHttpRequest('GET', `${userApi}/isLogged`, null, true);
};