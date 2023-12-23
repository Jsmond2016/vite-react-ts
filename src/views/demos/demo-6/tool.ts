function inputItemGenerator(propertyName: string, labelName: string) {
  return {
    type: 'input',
    label: labelName,
    key: propertyName,
  };
}

export type IOption = {
  label: string;
  value: string | number;
};
function selectItemGenerator(propertyName: string, labelName: string, options: IOption[]) {
  return {
    type: 'select' as const,
    label: labelName,
    key: propertyName,
    options,
  };
}

/**
 * @example: 
 * ```tsx
  [
    {
    
      "title": "状态",
      "dataIndex": "status",
    },
    {
      "title": "名字",
      "dataIndex": "name"
    }
  ]

  考虑以下情况：
    - 文本渲染
      - 基础文本
      - 图文混合
      - 数字和单位、金额、
    - 时间渲染：时间格式不同，
    - 状态渲染：
    - Id 渲染，附带跳转按钮；
    - 编辑修改
    - 操作栏：
      - 详情
      - 修改（内容，状态）
      - 删除
 * 
 * ```
 * 
 */

export const formItemUtil = {
  inputItemGenerator,
  selectItemGenerator,
};

export const tableUtil = {};

/**
 * 组装内容
 *
 * - propertyLabelName: 字段 label 名
 * - propertyName: 字段名
 * - propertyType: 字段类型 string | number
 *   - string:
 *   - number: genSelect 逻辑
 *
 *
 *
 * genSelect 逻辑
 * - 创建 Select
 * - 创建 options，字段：
 *   - value:
 *   - label:
 *
 *
 *
 *
 */
