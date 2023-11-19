'use strict';
// 验证码返回类型定义
interface CaptchaApiRes {
  code: number;
  msg: string;
  img: string;
  captchaEnabled: boolean;
  uuid: string;
}
