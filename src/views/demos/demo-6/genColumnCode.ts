import { PropertySignature } from 'ts-morph';
import { sourceFile } from './generateCode';

export async function generateColumnsCode(sourceCode: string, interfaceName: string = "Filters"): Promise<string> {
  sourceFile.replaceWithText(sourceCode);
  const myInterface = sourceFile.getInterface(interfaceName);
  if (!myInterface) return '';
  const result = [];
  for (const property of myInterface.getProperties()) {
    const docs = property.getJsDocs().map((doc) => doc.getDescription());
    const propertySymbol = property.getSymbol();
    const propertyName = propertySymbol?.getName() || '';
    const labelName = (docs[0] || '').trim();
    result.push(`{
      title: "${labelName}",
      dataIndex: "${propertyName}",
      render: ${getRender(propertyName, labelName, property)}
    }`);
    // refer: https://ant-design.gitee.io/components/table-cn
    // TODO: render: 
    //       - [x] date
    //       - [x] number | unit
    //       - [x] link       
    //       - [x] status | status[]
    //       - [x] operateButtons，注意：函数不能使用 JSON.stringify 序列化
    // TODO: fixed: left | right
    // TODO: width
    // TODO: ellipsis: true | false
  }
  const operateBtns = `{
    title: "操作",
    dataIndex: "operate"
    render: (v, record) => (
      <Space direction="horizontal">
        <Button onClick={() => history.push(\`/todoUrl/\$\{record.id\}\`)}>查看详情</Button>
        <Button onClick={() => onEdit(record)}>编辑</Button>
        <Button onClick={() => onDelete(record)}>删除</Button>
      </Space>)
    }`
  result.push(operateBtns)

  return `[
    ${result.join(`,
    `)}
  ]`;
  // return JSON.stringify(result, null, 2);
}


const timeRelatedText = ['time', 'date', 'expire', 'timeStamp', 'year', 'start', 'end', 'month', 'minute', 'seconds', 'hour']
const linkRelatedText = ['link', 'url']
const statusRelatedText = ['is', 'enable', 'status', 'flag']
const isRelated = (relatedList: string[], v: string) => {
  return  relatedList.some(item => v.toLocaleLowerCase().includes(item))
}
function getRender(propertyName: string, labelName: string, property: PropertySignature): string {
  console.log('labelName: ', labelName);
  // TODO: 这里的类型应该使用 property.getType 判断
  if (property.getType().isEnum() || isRelated(statusRelatedText, propertyName)) {
    return '(v) => statusRender(v, todoOptions)'
  }
  if (isRelated(timeRelatedText, propertyName)) {
    return "dateTimeRender";
  } 
  if (isRelated(linkRelatedText, propertyName)) {
    return "linkRender"
  }
  return "textRender"
}

const tableTemplate = (columns: any[]) => {
  `
  <Table dataSource={dataSource} columns={columns} />;
  `
}
export const genTableCode = async (sourceCode: string, interfaceName: string = "Filters") => {
  const columns = await generateColumnsCode(sourceCode, interfaceName)
}