// import { ESLint } from 'eslint';
import { Project, PropertySignature } from 'ts-morph';

import { formItemUtil, getEnumOptions } from './tool';

const project = new Project({
  // tsConfigFilePath: '../../../../tsconfig.json',
  useInMemoryFileSystem: true,
});

const sourceFile = project.createSourceFile('example.ts');

// const eslint = new ESLint();

const getPropertiesFromInterface = (interfaceName: string) => {
  const myInterface = sourceFile.getInterface(interfaceName);
  if (!myInterface) return [];
  return myInterface.getProperties().map((property) => {
    const propertyType = property.getType();
    const docs = property.getJsDocs().map((doc) => doc.getDescription());
    const propertySymbol = property.getSymbol();
    const propertyName = propertySymbol?.getName() || '';
    const labelName = (docs[0] || '').trim();
    return {
      sourceProperty: property,
      propertyType,
      labelName,
      propertyName,
      isRequired: !property.hasQuestionToken(),
    };
  });
};

type EnumGeneratorParams = {
  property: PropertySignature;
  propertyName: string;
  labelName: string;
};

const typeUtil = {
  stringGenerator: (propertyName: string, labelName: string, result: any[]) => {
    const inputItem = formItemUtil.inputItemGenerator(propertyName, labelName);
    result.push(inputItem);
  },
  interfaceGenerator: () => {},
  numberGenerator: () => {},
  enumGenerator: (
    { property, propertyName, labelName }: EnumGeneratorParams,
    result: any[],
  ) => {
    const enumTypeName = property.getTypeNode()?.getText();
    const options = getEnumOptions(sourceFile, enumTypeName!);
    const selectItem = formItemUtil.selectItemGenerator(propertyName, labelName, options);
    result.push(selectItem);
  },
};

export async function generateFilterCode(sourceCode: string): Promise<string> {
  sourceFile.replaceWithText(sourceCode);
  const parseArray = getPropertiesFromInterface('Filters');
  const result: any = [];
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
        const selectItem = formItemUtil.selectItemGenerator(
          propertyName,
          labelName,
          options,
        );
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
      type: 'input',
      label: labelName,
      key: propertyName,
    };
    result.push(restItem);
  });
  return JSON.stringify(result, null, 2);
  // TODO: 使用 eslint 格式化代码
  const eslintTemp = await eslint.lintText(JSON.stringify(result));
  await ESLint.outputFixes(eslintTemp);
  return eslintTemp[0].output as string;
}

export async function generateColumnsCode(sourceCode: string): Promise<string> {
  sourceFile.replaceWithText(sourceCode);
  const myInterface = sourceFile.getInterface('Filters');
  if (!myInterface) return '';
  const result = [];
  for (const property of myInterface.getProperties()) {
    // const propertyType = property.getType();
    const docs = property.getJsDocs().map((doc) => doc.getDescription());
    const propertySymbol = property.getSymbol();
    const propertyName = propertySymbol?.getName() || '';
    const labelName = (docs[0] || '').trim();
    result.push({
      dataIndex: propertyName,
      title: labelName,
      // refer: https://ant-design.gitee.io/components/table-cn
      // TODO: render: date | number | unit | operateButtons，注意：函数不能使用 JSON.stringify 序列化
      // TODO: fixed: left | right
      // TODO: width
      // TODO: ellipsis: true | false
    });
  }
  return JSON.stringify(result, null, 2);
}
