参考：

- [github/Hooks-Admin](https://github.com/HalseySpicy/Hooks-Admin)
- [预览-Hooks-Admin](https://pro.spicyboy.cn/#/auth/page)
- [官网-naiveadmin](https://www.naiveadmin.com/)
- [预览-naiveadmin](https://plus.naiveadmin.com/)

> 以下是待实现的 todos;

## 工具栏模块

- [ ] 系统边距大小设置；
- [ ] 中英文切换，国际化切换；
- [ ] 换肤切换
  - [ ] 菜单模式切换，分为多种模式；
  - [ ] 菜单分割
  - [ ] 侧边栏反转主题色
  - [ ] 头部反转色
  - [ ] 菜单分割
  - [ ] -----
  - [ ] 主题色自定义设置；
  - [ ] 暗黑模式；
  - [ ] 灰色模式
  - [ ] 色弱模式
  - [ ] 紧凑主题
  - [ ] 圆角大小自定义
  - [ ] ------
  - [ ] 菜单折叠
  - [ ] 菜单手风琴
  - [ ] 水印
  - [ ] 面包屑-是否使用
  - [ ] 面包屑-使用图标
  - [ ] 内容使用标签栏-是否使用
  - [ ] 标签栏图标
  - [ ] 页脚-是否使用；
- [ ] 消息通知： 配置后端接口
  - [ ] 通知
  - [ ] 消息
  - [ ] 待办
- [ ] 标签栏
  - [ ] 样式优化，过渡效果动画添加
  - [ ] 标签栏最右侧工具栏
    - [ ] 刷新
    - [ ] 最大/小化
    - [ ] 关闭当前
    - [ ] 关闭左侧
    - [ ] 关闭右侧
    - [ ] 关闭其他
    - [ ] 关闭所有


## 系统菜单默认模块

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

- [ ] crud 模型: 基于 zustand 封装 crud 模型；
  - [ ] useTableModel
  - [ ] useEditorModel
  - [ ] useStatusModel
  - [ ] useCustomModel
- [ ] 基础组件 (表单创建和修改，表格和详情数据渲染)，更多内容可以参考这里 https://www.naiveadmin.com/comp/index
  - [ ] RenderFormItem
  - [ ] FilterForm
  - [ ] EditableTable
  - [ ] EditModalForm
    - 参考这里的思路实现：[Modal管理-看这篇文章就够了 (实践篇)- 掘金](https://juejin.cn/post/7315231440777707558)
    - 结合这里：https://github.com/eBay/nice-modal-react
    - demo: 文档：https://opensource.ebay.com/nice-modal-react/#antd
    - [React弹窗使用最佳实践 - @ebay/nice-modal-reactReact弹窗使用最佳实践 - @ebay - 掘金](https://juejin.cn/post/7367163252936507455)
    - chatgpt 推荐的：[mpontus/react-modal-hook: Syntactic sugar for handling modals using React Hooks](https://github.com/mpontus/react-modal-hook)
    - 其他：https://github.com/search?q=react-modal-hook&type=repositories&s=stars&o=desc
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
  - [ ] genService & genTsTypes;
  - [ ] genPage


## 规范化

- [ ] 项目名字，暂定 amazing-admin
- [ ] 单元测试，自定义组件都要加上单元测试；
- [ ] ts，所有类型排除 any；绝对的 ts 规范；
- [ ] git 提交格式化
- [ ] 代码格式化 eslint, stylelint
- [ ] 代码风格 prettier
- [ ] 目录结构规范化，命名等
- [ ] 特定业务场景技术设计合理
- [ ] 项目说明文档，参考：https://github.jzfai.top/vue3-admin-cn-doc/guide/

## 性能优化

- [ ] 缓存的使用
- [ ] 防抖节流
- [ ] 打包、构建流程优化

## 其他

- [ ] 函数式编程
- [ ] 水印
- [ ] 国际化
- [ ] 错误监控和回溯
- [ ] docker 部署
- [ ] 后端业务平台接入


## 技术方案实现

- [ ] 大文件上传
- [ ] 导入
- [ ] 导出
- [ ] 流文件下载
- [ ] 集成 AI 功能；
- [ ] 微前端
- [ ] 低代码
- [ ] 代码生成器

## 进阶

- [ ] 参考其他 admin 平台，汲取优秀内容进行整合；