export type IsArray<T> = T extends any[] ? true : false;
export type IsObject<T> = T extends object ? (T extends any[] ? false : true) : false;

type GetNameListByPath<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string
        ? [K] | (T[K] extends object ? [K, ...GetNameListByPath<T[K]>] : never)
        : never;
    }[keyof T]
  : never;

export type GetMultipleNameByPath<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string
        ? T[K] extends string | number | boolean | null | undefined | any[]
          ? K
          : IsObject<T[K]> extends true
            ? [K, ...GetNameListByPath<T[K]>]
            : never
        : never;
    }[keyof T]
  : never;

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
type Test = GetMultipleNameByPath<Obj>; // expect: 'list' | 'a' |  ['b', 'c'] | ['b', 'd', 'e']

type GetNameValueByPathList<T extends object, F extends string[]> = F extends []
  ? T
  : F extends [infer First, ...infer Rest]
    ? First extends keyof T
      ? GetNameValueByPathList<T[First], Rest>
      : never
    : never;
// 测试
type Test1 = GetNameValueByPathList<Obj, ['a']>; // string
type Test2 = GetNameValueByPathList<Obj, ['b']>; // { c: string; d: { e: number; }; }
type Test3 = GetNameValueByPathList<Obj, ['b', 'd']>; // { e: number; }
type Test4 = GetNameValueByPathList<Obj, ['list']>; // Array<{ id: string }>

// 排除中间的对象 key; 确保 path 准确；
type ExcludeObjectKey<T extends object, F extends string | string[]> = F extends string
  ? F
  : IsObject<GetNameValueByPathList<T, F>> extends true
    ? never
    : F;

// 测试
type Test11 = ExcludeObjectKey<Obj, ['a']>; // string
type Test22 = ExcludeObjectKey<Obj, ['b']>; // { c: string; d: { e: number; }; }
type Test33 = ExcludeObjectKey<Obj, ['b', 'd']>; // { e: number; }
type Test44 = ExcludeObjectKey<Obj, ['list']>; // Array<{ id: string }>

type Test55 = ExcludeObjectKey<Obj, GetMultipleNameByPath<Obj>>; // expect: 'list' | 'a' |  ['b', 'c'] | ['b', 'd', 'e']

export type GetFieldName<T> = ExcludeObjectKey<T, GetMultipleNameByPath<T>>;
type Test56 = ExcludeObjectKey<Obj, GetMultipleNameByPath<Obj>>; // expect: 'list' | 'a' |  ['b', 'c'] | ['b', 'd', 'e']

// ===========================================================================================
// export type GetNameByPath<T> = T extends object
//   ? {
//       [K in keyof T]-?: K extends string
//         ? T[K] extends string | number | boolean | null | undefined | enum
//           ? K
//           : never
//         : never;
//     }[keyof T]
//   : never;

// type Test = GetNameByPath<Obj>; // 'a'

// 帮我写一个 ts 类型：GetNameByPath

// 示例:
// ```ts
// type GetNameByPath<T> = //待实现

// type Obj = {
//   a: string;
//   b: {
//     c: string;
//     d: {
//       e: number;
//     };
//   };
// };

// GetNameByPath<Obj> = 'a' | ['a'] | ['b', 'c'] | ['b', 'd', 'e']

// =================================================================================

// export type GetNameByPathList<T> = T extends object
//   ? {
//       [K in keyof T]-?: K extends string
//         ? [K] | (T[K] extends object ? [K, ...GetNameByPathList<T[K]>] : never)
//         : never;
//     }[keyof T]
//   : never;

// // 测试
// type Obj = {
//   a: string;
//   b: {
//     c: string;
//     d: {
//       e: number;
//     };
//   };
// };

// export type GetNameByPath<T> = GetNameByPathList<T> | GetNameByPath<T>;

// // 使用示例
// type Result = GetNameByPath<Obj>; // ['a'] | ['b', 'c'] | ['b', 'd', 'e']

// type Album = {
//   name: string;
//   album: string;
//   config: {
//     title: string;
//     count: number;
//     list: Array<{
//       id: number;
//       amount: number;
//       reason: string;
//     }>;
//   };
// };
// type Result2 = GetNameByPath<Album>;
