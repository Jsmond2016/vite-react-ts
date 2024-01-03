'use strict';
module.exports = {
  types: [
    { value: '✨feat', name: '新增:    新的内容' },
    { value: '🐛fix', name: '修复:    修复一个Bug' },
    { value: '📝docs', name: '文档:    变更的只有文档' },
    { value: '💄style', name: '格式:    空格, 分号等格式修复' },
    { value: '♻️refactor', name: '重构:    代码重构，注意和特性、修复区分开' },
    { value: '⚡️perf', name: '性能:    提升性能' },
    { value: '✅test', name: '测试:    添加一个测试' },
    { value: '🔧tool', name: '工具:    开发工具变动(构建、脚手架工具等)' },
    { value: '⏪revert', name: '回滚:    代码回退' },
    { value: '⏪chore', name: '其他:    如发版等' },
    { value: '⏪pkg', name: '依赖变化:    如何依赖变更、升级等' },
  ],
  scopes: [],
  // it needs to match the value for field type. Eg.: 'fix'
  /*  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },  */
  // override the messages, defaults are as follows
  messages: {
    type: '选择一种你的提交类型:',
    scope: '选择一个影响范围 (可选):',
    // used if allowCustomScopes is true
    customScope: '自定义修改模块名:',
    subject: '短说明:\n',
    body: '长说明，使用"|"换行(可选)：\n',
    breaking: '非兼容性说明 (可选):\n',
    footer: '关联关闭的issue，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交说明?(yes/no)',
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['特性', '修复'],
  allowEmptyScopes: true,
  customScopesAlign: 'bottom',
  customScopesAlias: 'custom',
  emptyScopesAlias: 'empty',
  // limit subject length
  subjectLimit: 100,
};
