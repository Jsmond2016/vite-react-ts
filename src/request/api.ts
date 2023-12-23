'use strict';
import request from './index';

export const loginApi = () => {
  return {
    userName: 'Lucky',
    password: '123456',
    role: [1, 2, 3, 4, 5, 6, 7],
  };
};
export const gteCodeApi = (): Promise<CaptchaApiRes> => request.get('/prod-api/captchaImage');
