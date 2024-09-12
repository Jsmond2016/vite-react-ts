参考：

- [github/Hooks-Admin](https://github.com/HalseySpicy/Hooks-Admin)
- [预览-Hooks-Admin](https://pro.spicyboy.cn/#/auth/page)
- [官网-naiveadmin](https://www.naiveadmin.com/)
- [预览-naiveadmin](https://plus.naiveadmin.com/)

todo:

## 系统默认模块

- [ ] 登录 | 注册: 可以参考这个实现：https://plus.naiveadmin.com/login-v4
- [x] 首页
- [ ] 数据大屏
- [ ] 权限管理
  - [ ] 页面权限
  - [ ] 按钮权限
- [ ] 常用组件
  - [ ] Echarts 图表页
  - [ ] 统计数值
- [ ] 列表
  - [ ] 正常 Table
  - [ ] EditTable
  - [ ] List 列表
- [ ] 表单
  - [ ] 表单页面
  - [ ] 分步表单
  - [ ] 高级表单
- [ ] 详情
  - [ ] 基础详情页
- [ ] 系统管理
  - [ ] 用户管理
  - [ ] 角色管理
  - [ ] 菜单和权限管理；
- [ ] 关于项目: 参考这里实现：https://plus.naiveadmin.com/about/index
- [ ] 其他
  - [ ] 个人学习测试 demo；

## 基建设施

- [ ] crud 模型；
  - [ ] useTableModel
  - [ ] useEditorModel
  - [ ] useStatusModel
  - [ ] useCustomModel
- [ ] 基础组件 (表单创建和修改，表格和详情数据渲染)，更多内容可以参考这里 https://www.naiveadmin.com/comp/index
  - [ ] RenderFormItem
  - [ ] FilterForm
  - [ ] EditableTable
  - [ ] --- 分界线 -----
  - [ ] DescriptionRender
  - [ ] CommonModal
  - [ ] Buttons: 按钮组件视情况绑定 Modal-[创建、更新、导入], 二次确认 confirm；默认图标；
    - [ ] CreateButton
    - [ ] DeleteButton
    - [ ] PreviewButton
    - [ ] UpdateButton
    - [ ] ExportButton
    - [ ] ImportButton
  - [ ] StepProcess
  - [ ] --- 分界线 ---
  - [ ] ErrorBoundary
- [ ] httpService 请求库封装
  - [ ] httpInstance
  - [ ] StatusCodeEnum
- [ ] Hooks
  - [ ] useTable
  - [ ] useFilter
  - [ ] useHasAuth
- [ ] utils
  - [ ] dateUtil
  - [ ] antdUtil 用于初始化 antd 部分组件的默认属性；统一所有交互;
  - [ ] urlUtil 处理 url 参数和跳转相关；
- [ ] tools
  - [ ] genConstants
  - [ ] genService
  - [ ] genPage

## 其他

- [ ] 错误监控和回溯
- [ ] 性能优化
- [ ] docker 部署
- [ ] 后端业务平台接入
