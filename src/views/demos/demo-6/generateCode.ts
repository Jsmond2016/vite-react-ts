import { Project, SourceFile } from 'ts-morph';

const project = new Project({
  useInMemoryFileSystem: true,
});

export const sourceFile = project.createSourceFile('example.ts');
// const ESLint = ESLintModule.ESLint;
// const eslint = new ESLint({
//   overrideConfigFile: '../../../../.eslintrc.js',
// });

export const getPropertiesFromInterface = (interfaceName: string) => {
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

export function getEnumOptions(sourceFile: SourceFile, enumName: string) {
  const myEnum = sourceFile.getEnum(enumName);
  if (!myEnum) return [];
  const members = myEnum.getMembers();
  const enumInfo = members.map((member) => {
    const value = member.getValue() || 0;
    const labelName = member.getJsDocs().map((desc) => desc.getDescription())[0];
    return {
      value,
      label: labelName,
    };
  });
  return enumInfo;
}
