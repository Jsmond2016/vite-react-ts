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
import { Button, FormInstance, Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FilterItem, generateFilterCode, generateFilterCodeString } from './genFormItemCode';

interface DataType {
  key: string;
  labelName: string;
  componentType: string;
}

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

// export default App;

type GenFiltersButtonProps = {
  form: FormInstance;
  setOutputCodeString: React.Dispatch<React.SetStateAction<string>>;
  toggleHighlight: () => void;
};

const GenFiltersButton = ({
  form,
  setOutputCodeString,
  toggleHighlight,
}: GenFiltersButtonProps) => {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState<DragItem[]>([]);

  const handleClick = async () => {
    const sourceCode = await form.getFieldValue('sourceCode');
    const result = generateFilterCode(sourceCode);
    const data = result.map((item, idx) => ({ ...item, id: idx }));
    setOpen(true);
    setData(data);
  };

  const handleOk = () => {
    const resultCode = generateFilterCodeString(data.map(({ id, ...rest }) => rest));
    setOutputCodeString(resultCode);
    setTimeout(toggleHighlight);
    setOpen(false);
  };

  const columns: ColumnsType<DataType> = [
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

  return (
    <>
      <Button type="primary" onClick={handleClick}>
        生成 Filters
      </Button>
      <Modal title="修改字段顺序" open={open} onOk={handleOk} onCancel={() => setOpen(false)}>
        <DragTable columns={columns} dataSource={data} setDataSource={setData} />
      </Modal>
    </>
  );
};

// TODO: 列表字段生成
const genColumnButton = () => {};

// TODO: 字段属性编辑和生成

export { GenFiltersButton };
