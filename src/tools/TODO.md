# 计划

- genService: 对接 apifox 接口，基于 标签的方式，生成前端 service 层；包括接口类型；
  - genTypes: 生成类型；
  - genService: 生成前端接口；并绑定前面定义的类型；
- genPage:
  - 先开发好基础页面组件，设计好最佳页面模式和考虑常见的业务场景；
  - 定义模板；基于前面设计好的情况，定义好页面模板；
  - 生成页面和相关内容：
    - 路由生成；
    - store model 模型生成；
    - 常量生成；
    - 页面生成（CRUD 页面 or modal 形式）
    - 组件生成： 按钮，下拉框，导入导出；
