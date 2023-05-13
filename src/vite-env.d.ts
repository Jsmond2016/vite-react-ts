// 全局声明文件
// <reference types="vite/client" />
// 处理 module 红色波浪线问题
declare module "*.module.scss" {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module "*.ts"
