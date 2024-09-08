'use strict';

import { IsObject } from './util';

// 验证码返回类型定义
export interface CaptchaApiRes {
  code: number;
  msg: string;
  img: string;
  captchaEnabled: boolean;
  uuid: string;
}

// type GetNameByPath<T> = T extends object
//   ? {
//       [K in keyof T]-?: T[K] extends string | number | boolean | null | undefined
//         ? K
//         : T[K] extends object
//           ? [K] | GetNameByPath<T[K]> extends infer R
//             ? R extends (string | number)[]
//               ? R
//               : never
//             : never
//           : never;
//     }[keyof T]
//   : never;
// type Test = GetNameByPath<Obj>; // expect: 'a' | ['b', 'c'] | ['b', 'd', 'e']

type Obj = {
  a: string;
  list: Array<{ id: string }>;
  b: {
    c: string;
    d: {
      e: number;
    };
  };
};

// 测试

// export type GetNameByPath2<T> = T extends object
//   ? {
//       [K in keyof T]-?: T[K] extends string | number | boolean | null | undefined | any[]
//         ? K | (IsObject<T[K]> extends true ? [K, ...GetNameByPath2<T[K]>] : never)
//         : never;
//     }[keyof T]
//   : never;

type GetNameListByPath3<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string
        ? [K] | (T[K] extends object ? [K, ...GetNameListByPath3<T[K]>] : never)
        : never;
    }[keyof T]
  : never;

export type GetNameByPath2<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string
        ? T[K] extends string | number | boolean | null | undefined | any[]
          ? K
          : IsObject<T[K]> extends true
            ? [K, ...GetNameListByPath3<T[K]>]
            : never
        : never;
    }[keyof T]
  : never;

// 测试
type Test = GetNameByPath2<Obj>; // expect: 'a' | ['b', 'c'] | ['b', 'd', 'e']
