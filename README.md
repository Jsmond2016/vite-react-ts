# 记录

- [apifox 示例项目](https://app.apifox.com/project/3427245)
- [JSON.stringify](https://stackoverflow.com/questions/6754919/json-stringify-function)
- [JSONfn](https://github.com/vkiryukhin/jsonfn?tab=readme-ov-file)

```js
JSON.stringify(objWithFunction, function (key, val) {
  if (typeof val === 'function') {
    return val + ''; // implicitly `toString` it
  }
  return val;
});

// NOTE: 实际上，使用这个方式的结果，是类似如下

const obj = {
  a: 1,
  b: (b, c) => {
    return b + c;
  },
};
JSON.stringify(obj, function (key, val) {
  if (typeof val === 'function') {
    return val + ''; // implicitly `toString` it
  }
  return val;
});
// result: '{"a":1,"b":"(b, c) => {return b+c}"}'

JSON.parse('{"a":1,"b":"(b, c) => {return b+c}"}');
// {a: 1, b: '(b, c) => { return b+c}' }

// 而我实际需要的是这样的，最终还是放弃 JSON.stringify， 使用 ES6 的目标字符串

// {a: 1, b: (b, c) => { return b+c } }
```

## ts-morph

> 用于解析 ts 类型；

- [github/ts-morph](https://github.com/dsherret/ts-morph#readme)
- [docs/ts-morph](https://ts-morph.com/details/index)
- [ts-ast-viewer](https://ts-ast-viewer.com/)

# vite-react-ts

使用 Vite / React / TypeScript / AntD 写的一些小案例用于学习；

## 特点

- [x] 使用 Vite / React / TypeScript / AntD 搭建项目；
- [] 配置自动化生成工具，生成常用代码：
  - [x] enums 和 options 枚举和选项；
  - [ ]List 和 Detail 页面；
- [x] Mockjs 配置；

## 相关技术栈：

- [Vite](https://cn.vitejs.dev/guide/)
- [React](https://zh-hans.react.dev/learn)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [AntD v.5.x](https://ant-design.antgroup.com/components/layout-cn)
- [React-Router-Dom](https://reactrouter.com/en/main/start/tutorial)
- [Redux](https://cn.redux.js.org/introduction/getting-started)
- redux-thunk
- axios
- [msw: mock 工具](https://mswjs.io/docs/basics/intercepting-requests#http-requests)
- [mrm: 生成项目配置工具](https://mrm.js.org/docs/getting-started)
- [unocss](https://alfred-skyblue.github.io/unocss-docs-cn/)

## 工具

- [taliwindcss 速查文档](https://www.tailwindcss.cn/docs/installation) 设置 CSS 样式
- [highlight.js](https://highlightjs.org/demo#lang=javascript&v=1&theme=atom-one-dark)
- [github/highlight.js](https://github.com/highlightjs/highlight.js)

  **资料参考：**

- [Vite 搭建 React18 项目，分享一些使用技巧](https://juejin.cn/post/7182098358536765495)
- [Vite2 + Vue3 + TypeScript + Pinia 搭建一套企业级的开发脚手架【值得收藏】](https://juejin.cn/post/7036745610954801166#heading-14)
- [React Router v6 完全指南](https://juejin.cn/post/7187199524903845946#heading-17)
- [React-Router6指北+项目权限设计](https://juejin.cn/post/7071086182116884487#heading-6)
- blog: https://www.jiafeng.co/details/243
- github: https://github.com/zjiafeng/vite-react
- mockjs:
  - [mockjs 官网](http://mockjs.com/examples.html#Number)
  - [博客-mockjs 基本使用-按指定规则生成随机测试数据](https://www.cnblogs.com/suwanbin/p/13200521.html)

## 新技术学习计划

- ahooks
  - useRequest
- react-query
- zustand

  - [zustand-doc](https://zustand-demo.pmnd.rs/)
  - [精读《zustand 源码》](https://juejin.cn/post/7056568996157456398?from=search-suggest)

- jotai
  - [jotai-doc](https://jotai.org/)
