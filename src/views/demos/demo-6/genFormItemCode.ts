import { PropertySignature } from 'ts-morph';

import { getEnumOptions, getPropertiesFromInterface, sourceFile } from './generateCode';
import { formItemUtil, IOption } from './tool';

type EnumGeneratorParams = {
  property: PropertySignature;
  propertyName: string;
  labelName: string;
};

export const typeUtil = {
  stringGenerator: (propertyName: string, labelName: string, result: any[]) => {
    const inputItem = formItemUtil.inputItemGenerator(propertyName, labelName);
    result.push(inputItem);
  },
  interfaceGenerator: () => {},
  numberGenerator: () => {},
  enumGenerator: (item: EnumGeneratorParams, result: any[]) => {
    const { property, propertyName, labelName } = item;
    const enumTypeName = property.getTypeNode()?.getText();
    const options = getEnumOptions(sourceFile, enumTypeName!);
    const selectItem = formItemUtil.selectItemGenerator(propertyName, labelName, options);
    result.push(selectItem);
  },
};

export interface FilterItem {
  type: 'input' | 'select';
  label: string;
  key: string;
  options?: IOption[];
}

export function generateFilterCode(sourceCode: string): FilterItem[] {
  sourceFile.replaceWithText(sourceCode);
  const parseArray = getPropertiesFromInterface('Filters');
  const result: FilterItem[] = [];
  parseArray.forEach((item) => {
    const { propertyType, propertyName, labelName, sourceProperty: property } = item;

    if (propertyType.isString()) {
      typeUtil.stringGenerator(propertyName, labelName, result);
      return;
    }
    if (propertyType.isEnum()) {
      typeUtil.enumGenerator({ property, propertyName, labelName }, result);
      return;
    }

    if (propertyType.isArray()) {
      // interface
      const elementType = propertyType.getArrayElementType();
      if (elementType?.isInterface()) {
        const name = elementType?.getText().split('.')[1];
        if (!name) {
          return;
        }
        const pps = getPropertiesFromInterface(name);
        const options = pps.map((v) => ({
          label: `todo-${v.labelName}`,
          value: `todo-${v.propertyName}`,
        }));
        const selectItem = formItemUtil.selectItemGenerator(propertyName, labelName, options);
        result.push(selectItem);
        return;
      }
      // string | number | boolean | enum ...
    }
    // if (propertyType.isBoolean()) {
    // }
    // if (propertyType.isNumber()) {
    // }
    // if (propertyType.isBoolean()){}

    // TODO: 接口类型-对象
    // TODO: 数组-字符串数组、数字数组、对象数组等 -> 可能 多选 select | checkbox；筛选条件一般只有 下拉框
    // TODO: boolean
    // TODO: 数字 -> input | radio | select
    // TODO:
    // TODO:
    // TODO:
    // TODO:
    // TODO:
    // TODO:

    // 其他情况
    const restItem = {
      type: 'input' as const,
      label: labelName,
      key: propertyName,
    };
    result.push(restItem);
  });
  return result;
  // TODO: 使用 eslint 格式化代码
  // const eslintTemp = await eslint.lintText(JSON.stringify(result));
  // await ESLint.outputFixes(eslintTemp);
  // return eslintTemp[0].output as string;
}

export const generateFilterCodeString = (result: FilterItem[]): string => {
  return JSON.stringify(result, null, 2);
};
