import axiosInstance from './axios';
import {Category, Profile} from '../types/domain';
import {getEncryptStorage} from '../utils';

type RequestUser = {
  email: string;
  password: string;
};

// 회원가입
const postSignup = async ({email, password}: RequestUser): Promise<void> => {
  const {data} = await axiosInstance.post('/auth/signup', {
    email,
    password,
  });

  return data;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

// 로그인
const postLogin = async ({
  email,
  password,
}: RequestUser): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/auth/signin', {
    email,
    password,
  });

  return data;
};

type ResponseProfile = Profile & Category;

// 프로필 조회
const getProfile = async (): Promise<ResponseProfile> => {
  const {data} = await axiosInstance.get('/auth/me');

  return data;
};

// 토큰 갱신
const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');

  const {data} = await axiosInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
};

// 로그아웃
const logout = async () => {
  await axiosInstance.post('/auth/logout');
};

export {postSignup, postLogin, getProfile, getAccessToken, logout};
export type {RequestUser, ResponseToken, ResponseProfile};
