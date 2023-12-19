import { Button, Col, Form, FormInstance, Input, Row, Space } from 'antd';
import { useRef, useState } from 'react';

// import Highlight from 'react-highlight';
import CodeBlock from './CodeBlock';
import { generateColumnsCode } from './genColumnCode';
import { generateFilterCode } from './genFormItemCode';
import { GenFiltersButton, GenerateType } from './DragList';

type FormData = {
  sourceCode: string;
  targetCode: string;
};

type IOperateButtonProps = {
  form: FormInstance<FormData>;
  setCode: (code: string) => void;
  toggleHighlight: () => void;
};

const OperateButtons = ({ form, setCode, toggleHighlight }: IOperateButtonProps) => {
  const setCodeAndHighlight = async (generator: (sourceCode: string) => Promise<string>) => {
    const { sourceCode } = await form.getFieldsValue();
    const result = await generator(sourceCode);
    setCode(result);
    setTimeout(() => {
      toggleHighlight();
    });
  };

  const generateFilters = async () => {
    setCodeAndHighlight(generateFilterCode);
  };

  const generateColumns = async () => {
    setCodeAndHighlight(generateColumnsCode);
  };
  return (
    <Space direction="vertical" size="large" align="center">
      {/* <Button type="primary" onClick={generateFilters}>
        生成 Filters
      </Button> */}
      <GenFiltersButton form={form} />
      <Button type="primary" onClick={generateColumns}>
        生成 Columns
      </Button>
    </Space>
  );
};

const Index = () => {
  const [form] = Form.useForm();
  const [code, setCode] = useState('');
  // refer:https://stackoverflow.com/questions/62210286/declare-type-with-react-useimperativehandle
  const codeRef = useRef<React.ElementRef<typeof CodeBlock>>(null);

  const toggleHighlight = () => {
    codeRef.current?.highlightBlock();
  };

  const initFilterCode = `
/**
 * 宠物信息
 *
 * Pet
 */
export interface Filters {
    /**
     * 分组
     */
    category: Category[];
    /**
     * 宠物ID编号
     */
    id: number;
    /**
     * 名称
     */
    name: string;
    /**
     * 照片URL
     */
    photoUrls: string[];
    /**
     * 宠物销售状态
     */
    status: Status;
    /**
     * 标签
     */
    tags: Tag[];
    /**
     * 开始时间
     */
    startTime: number;
    /**
     * 结束时间
     */
    endTime: number; 

}

/**
 * 分组
 *
 * Category
 */
export interface Category {
    /**
     * 分组ID编号
     */
    id?: number;
    /**
     * 分组名称
     */
    name?: string;
}

/**
 * 宠物销售状态
 */
export enum Status {
    Available = "available",
    Pending = "pending",
    Sold = "sold",
}

/**
 * Tag
 */
export interface Tag {
    /**
     * 标签ID编号
     */
    id?: number;
    /**
     * 标签名称
     */
    name?: string;
}

  
  `;

  return (
    <Form form={form} initialValues={{ sourceCode: initFilterCode }}>
      <Row>
        <h1>代码生成器</h1>
      </Row>
      <Row className="mt-12px">
        <Col span={10}>
          <Form.Item name="sourceCode">
            <Input.TextArea
              className="font-mono text-base h-[500px] min-h-[500px] tab-size"
              style={{
                backgroundColor: 'rgb(59, 62, 61)',
                color: '#fff',
                border: 'none',
              }}
              rows={30}
            />
          </Form.Item>
        </Col>
        <Col span={4} className="text-center">
          {/* <OperateButtons form={form} setCode={setCode} toggleHighlight={toggleHighlight} /> */}
          <Space direction="vertical" size="middle">
            <GenFiltersButton
              type={GenerateType.Filters}
              form={form}
              setOutputCodeString={setCode}
              toggleHighlight={toggleHighlight}
            />
            <GenFiltersButton
              type={GenerateType.Column}
              form={form}
              setOutputCodeString={setCode}
              toggleHighlight={toggleHighlight}
            />
          </Space>
        </Col>
        <Col span={10}>
          <CodeBlock language="javascript" ref={codeRef} code={code} />
        </Col>
      </Row>
    </Form>
  );
};

export default Index;
