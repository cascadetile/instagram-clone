import axios from 'axios';
import { IProfile } from '../pages/Profile/types';

const baseURL = 'https://registration-service-dn3x.onrender.com';
const profileBaseURL = 'https://profile-service.onrender.com';

const auth = async (email: string, password: string, session: string) => axios({
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    Authorization: session,
  },
  url: `${baseURL}/auth`,
  data: {
    email,
    password,
  },
});

const sendEmail = async (email: string, session: string) => axios({
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    Authorization: session,
  },
  url: `${baseURL}/registration/email`,
  data: {
    email,
  },
});

const sendOTP = async (otp: string, email: string, session: string) => axios({
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    Authorization: session,
  },
  url: `${baseURL}/registration/otp`,
  data: {
    otp,
    email,
  },
});

const sendNameAndPassword = async (
  name: string,
  password: string,
  session: string,
) => axios({
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    Authorization: session,
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
    Authorization: session,
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
    Authorization: session,
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
    Authorization: session,
  },
  url: `${baseURL}/registration/agree`,
});

const getProfile = async (profileId: string, session: string) => axios({
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
    Authorization: session,
  },
  url: `${profileBaseURL}/profiles/${profileId}`,
});

export const changeAvatar = async (formData: FormData, session: string) => axios({
  method: 'patch',
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: session,
  },
  url: `${profileBaseURL}/profile/picture`,
  data: formData,
});

export const changeProfile = async (body: Partial<IProfile>, session: string) => axios({
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    Authorization: session,
  },
  url: `${profileBaseURL}/profile/edit`,
  data: body,
});

export {
  auth,
  sendEmail,
  sendOTP,
  sendNameAndPassword,
  sendBirthday,
  sendUsername,
  sendAgree,
  getProfile,
};
