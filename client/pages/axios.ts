import axios from 'axios';

function loginAndroid(name, password) {
  return axios.post('http://10.0.2.2:3000/auth/login', { name, password });
}

function loginIOS(name, password) {
  return axios.post('http://localhost:3000/auth/login', { name, password });
}

function signupAndroid(name, password) {
  return axios.post('http://10.0.2.2:3000/auth/signup', { name, password });
}

function signupIOS(name, password) {
  return axios.post('http://localhost:3000/auth/signup', { name, password });
}

function logoutAndroid() {
  return axios('http://10.0.2.2:3000/auth/logout');
}

function logoutIOS() {
  return axios('http://localhost:3000/auth/logout');
}

export default {
  loginAndroid,
  loginIOS,
  signupAndroid,
  signupIOS,
  logoutAndroid,
  logoutIOS,
};
