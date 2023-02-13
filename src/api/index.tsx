/* eslint-disable */
import axios from 'axios';

const baseURL = 'https://registration-service-dn3x.onrender.com';

const auth = async (email: string, password: string) => axios({
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
  url: `${baseURL}/auth`,
  data: {
    email,
    password,
  },
});

const sendEmail = async (email: string) => axios({
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
  url: `${baseURL}/registration/email`,
  data: {
    email,
  },
});

const sendOTP = async (otp: string, email: string) => axios({
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
  url: `${baseURL}/registration/otp`,
  data: {
    otp,
    email,
  },
});

const sendNameAndPassword = async (name: string, password: string, session: string) => axios({
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': session,
  },
  url: `${baseURL}/registration/name-and-password`,
  data: {
    name,
    password,
  },
});

const sendBirthday = async (birthday: string, session: string) => axios({
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': session,
  },
  url: `${baseURL}/registration/birthday`,
  data: {
    birthday,
  },
});

const sendUsername = async (username: string, session: string) => axios({
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': session,
  },
  url: `${baseURL}/registration/username`,
  data: {
    username,
  },
});

const sendAgree = async (session: string) => axios({
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': session,
  },
  url: `${baseURL}/registration/agree`,
});

export {
  auth, sendEmail, sendOTP, sendNameAndPassword, sendBirthday, sendUsername, sendAgree,
};
