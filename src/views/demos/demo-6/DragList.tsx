import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useEffect, useState } from 'react';
import {
  Button,
  FormInstance,
  Input,
  Modal,
  Select,
  Table,
  Typography,
  Popconfirm,
  Form,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FilterItem, generateFilterCode, generateFilterCodeString } from './genFormItemCode';
import { generateColumnsCode, generateColumnsToString } from './genColumnCode';

interface DataType {
  key: string;
  labelName: string;
  componentType: string;
}

interface EditCellProps extends React.HTMLAttributes<HTMLElement> {
  editable?: boolean;
  editing: boolean;
  dataIndex: string | string[];
  component?: React.ReactNode;
  children: any;
}

const EditCell = (props: EditCellProps) => {
  const { editable, title, children, editing, dataIndex, component, ...restProps } = props;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {component}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row = (props: RowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    cursor: 'move',
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return <tr {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
};

type DragItem = FilterItem & { id: number };

type DragTableProps = {
  columns: ColumnsType[];
  dataSource: DragItem[];
  setDataSource: React.Dispatch<React.SetStateAction<DragItem[]>>;
};

const DragTable: React.FC<DragTableProps> = ({ columns, dataSource, setDataSource }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
        distance: 1,
      },
    }),
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  return (
    <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext
        // rowKey array
        items={dataSource.map((i) => i.key)}
        strategy={verticalListSortingStrategy}
      >
        <Table
          pagination={false}
          components={{
            body: {
              row: Row,
              cell: EditCell,
            },
          }}
          rowKey="key"
          columns={columns}
          dataSource={dataSource}
        />
      </SortableContext>
    </DndContext>
  );
};

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

type EditColumnProps = {
  form: FormInstance;
  dataSource: any[];
  setData: any;
};

const useEditColumns = ({ form, dataSource, setData }: EditColumnProps) => {
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const onCancel = () => setEditingKey('');
  const onSave = async (key: string) => {
    try {
      const { sourceCode, ...row } = await form.validateFields();
      console.log('row: ', row);

      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const onEdit = (record) => {
    console.log('record: ', record);
    form.setFieldsValue(record);
    setEditingKey(record.key);
  };

  const filterColumns = [
    {
      title: '字段描述',
      dataIndex: 'label',
      editable: true,
      width: 140,
      component: <Input />,
    },
    {
      title: '字段名',
      dataIndex: 'key',
      editable: true,
      width: 140,
      component: <Input />,
    },
    {
      title: '组件',
      dataIndex: 'type',
      editable: true,
      width: 180,
      component: <Select options={genCodeTypeOptions} />,
    },
    {
      title: '编辑',
      dataIndex: 'operator',
      editable: false,
      width: 160,
      render: (_: any, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => onSave(record.key)} style={{ marginRight: 8 }}>
              保存
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={onCancel}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => onEdit(record)}>
            编辑
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = filterColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        component: col.component,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return mergedColumns;
};

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

const filterColumns: ColumnsType<DataType> = [
  {
    title: '字段描述',
    dataIndex: 'label',
  },
  {
    title: '字段名',
    dataIndex: 'key',
  },
  {
    title: '组件',
    dataIndex: 'type',
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
    const resultCode = generatorToString(data.map(({ id, ...rest }) => rest));
    setOutputCodeString(resultCode);
    setTimeout(toggleHighlight);
    setOpen(false);
  };

  const editColumns = useEditColumns({ form, dataSource: data, setData });

  return (
    <>
      <Button type="primary" onClick={handleClick}>
        {btnText}
      </Button>
      <Modal
        width={800}
        title={`修改${btnText.slice(2)}顺序`}
        open={open}
        onOk={handleOk}
        onCancel={() => setOpen(false)}
      >
        {/* <DragTable columns={columns} dataSource={data} setDataSource={setData} /> */}
        <DragTable columns={editColumns} dataSource={data} setDataSource={setData} />
      </Modal>
    </>
  );
};

const useGetGenerateOptions = (type: GenerateType) => {
  const columns = idxGenTypeMap[type];
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
