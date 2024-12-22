import { user_switch_event } from '@src/constants/consts';
import { message } from 'antd';
import Cookies from 'js-cookie';

import http from './base';

export interface EmailPwd {
  email: string;
  password: string;
}
export interface WalletData {
  publicKey: string;
  signedMessage: string;
  verificationMsg?: string;
}

export type DomainData = {
  publicKey: string;
  signedMessage: string;
  verificationMsg: string;
  domainName: string; //只在域名登录的时候会携带此参数
};

export type EmailCode = {
  email: string;
  verificationCode: string;
};
export const LOGIN_WAY = 'login_way';

export const loginByAll = async (
  data:
    | EmailPwd
    | WalletData
    | (EmailCode & {
        verificationKey: string;
      })
) => {
  console.log('--->loginByAll', data);
  const res: { token: string } = await http.post('/signin', data);
  localStorage.setItem('token', res.token);
  window.dispatchEvent(new Event(user_switch_event));
  return res;
};
export const loginByWallet = async (data: WalletData) => {
  const res = await loginByAll(data);
  Cookies.set(data.publicKey, res.token, { expires: 1 });
  localStorage.setItem(LOGIN_WAY, 'wallet');
  return res;
};

export const sendVerificationCode = async (email: string) => {
  const res = await http.post('/signin/sendEmailVerifyCode', { email });
  message.info('sending verification code');
  return res;
};

export const loginByDomain = async (data: DomainData) => {
  console.log('--->loginByDomain', data);
  const res = await loginByAll(data);
  Cookies.set(data.publicKey, res.token, { expires: 1 });
  localStorage.setItem(LOGIN_WAY, 'domain');
  return res;
};
