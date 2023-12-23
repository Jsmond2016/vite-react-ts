import { Button, FormInstance, Input, Modal, Select } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import React, { useState } from 'react';

import { EditableTable } from '@/components/editableTable';

import { generateColumnsCode, generateColumnsToString } from './genColumnCode';
import { generateFilterCode, generateFilterCodeString } from './genFormItemCode';

export enum GenerateType {
  Column = 'Column',
  Filters = 'Filters',
}

type GenFiltersButtonProps = {
  form: FormInstance;
  setOutputCodeString: React.Dispatch<React.SetStateAction<string>>;
  toggleHighlight: () => void;
  type: GenerateType;
};

const genCodeType = ['input', 'textarea', 'select', 'multi-select', 'checkbox', 'radio'];
const genCodeTypeOptions = genCodeType.map((item) => ({ label: item, value: item }));

const tableColumns = [
  {
    title: '字段描述',
    dataIndex: 'title',
  },
  {
    title: '字段名',
    dataIndex: 'dataIndex',
  },
  {
    title: 'render类型',
    dataIndex: 'renderType',
  },
];

const filterColumns: (ColumnType<any> & { cellComponent?: React.ReactNode })[] = [
  {
    title: '字段描述',
    dataIndex: 'label',
    cellComponent: <Input />,
  },
  {
    title: '字段名',
    dataIndex: 'key',
    cellComponent: <Input />,
  },
  {
    title: '组件',
    dataIndex: 'type',
    cellComponent: <Select options={genCodeTypeOptions} />,
  },
];

const idxGenTypeMap = {
  [GenerateType.Column]: tableColumns,
  [GenerateType.Filters]: filterColumns,
};

const btnNameTypeMap = {
  [GenerateType.Column]: '生成 table columns',
  [GenerateType.Filters]: '生成 form filters',
};

const generatorTypeMap = {
  [GenerateType.Column]: generateColumnsCode,
  [GenerateType.Filters]: generateFilterCode,
};

const generatorToStringTypeMap = {
  [GenerateType.Column]: generateColumnsToString,
  [GenerateType.Filters]: generateFilterCodeString,
};

const GenFiltersButton = ({
  form,
  setOutputCodeString,
  toggleHighlight,
  type,
}: GenFiltersButtonProps) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const { columns, btnText, generator, generatorToString } = useGetGenerateOptions(type);

  const handleClick = async () => {
    const sourceCode = await form.getFieldValue('sourceCode');
    const result = generator(sourceCode);
    const data = result.map((item, idx) => ({ ...item, id: idx }));
    setOpen(true);
    setData(data);
  };

  const handleOk = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const resultCode = generatorToString(data.map(({ id, ...rest }) => rest));
    setOutputCodeString(resultCode);
    setTimeout(toggleHighlight);
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={handleClick}>
        {btnText}
      </Button>
      <Modal
        width={800}
        title={`修改${btnText.slice(2)}顺序和属性`}
        open={open}
        onOk={handleOk}
        onCancel={() => setOpen(false)}
        maskClosable={false}
      >
        {/* <DragTable columns={columns} dataSource={data} setDataSource={setData} /> */}
        {/* <DragTable columns={editColumns} dataSource={data} setDataSource={setData} /> */}
        <EditableTable columns={columns as any} dataSource={data} pagination={false} />
      </Modal>
    </>
  );
};

const useGetGenerateOptions = (type: GenerateType) => {
  const columns: ColumnsType<any> = idxGenTypeMap[type];
  const btnText = btnNameTypeMap[type];
  const generator = generatorTypeMap[type];
  const generatorToString = generatorToStringTypeMap[type];
  return {
    columns,
    btnText,
    generator,
    generatorToString,
  };
};

// TODO: 字段属性编辑和生成

export { GenFiltersButton };
