import { ESLint } from 'eslint';
import * as fs from 'fs';
import * as path from 'path';

import genConfig from '../genCodes/index';

type EnumItem = string | number;

const withString = (v: any) => `"${v}"`;
const createEnum = (item: EnumItem[][]) => {
  const [firstItem, ...restItem] = item;
  const [enumName, enumDesc] = firstItem;
  return `
  
  /** ${enumDesc} */
  export enum ${enumName} {
  ${restItem
    .map(
      (item) =>
        `
        /** ${item[2]} */
        ${item[0]} = ${typeof item[1] === 'number' ? item[1] : withString(item[1])}`,
    )
    .join(', \n  ')}    
  }
  `;
};
const createOptions = (item: EnumItem[][]) => {
  const [firstItem, ...restItem] = item;
  const [enumName, enumDesc] = firstItem;
  return `
  /** ${enumDesc}Options */
  export const ${enumName}Options = {
    ${restItem.map((item) => `[${enumName}.${item[0]}]: "${item[2]}" `).join(',\n  ')}
  }
  `;
};

const CONSTANT_PATH = path.resolve(__dirname, '../constants/genCode.ts');

const prefixWarningText = `/** ======================================================

注意：

此文件由配置文件生成，任何修改无效；

请勿修改！！请勿修改！！请勿修改！！！

========================================================= */
`;
const content = genConfig
  .map((v: any) => {
    const enums = createEnum(v);
    const options = createOptions(v);
    return `
     ${enums}
     ${options}
  `;
  })
  .join('');

const genCode = async () => {
  try {
    console.log('正在生成 enum-options ...');
    // reference: https://eslint.org/docs/latest/integrate/nodejs-api
    const eslint = new ESLint({ fix: true });
    const sourceCode = [prefixWarningText, ...content].join('');
    await fs.writeFileSync(CONSTANT_PATH, sourceCode);

    console.log('正在格式化 enum-options ...');
    const resultCode = await eslint.lintFiles(CONSTANT_PATH);
    await ESLint.outputFixes(resultCode);
  } catch (error) {
    console.log('enum - options 生成失败！！', error);
  }
};

genCode();
