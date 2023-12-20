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
import React, { useEffect, useMemo, useState } from 'react';
import { Table, Typography, Popconfirm, Form, TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import EditCell from './EditCell';

interface ColumnItem<T = any> extends ColumnsType<T> {
  editable?: boolean;
  cellComponent?: React.ReactNode;
  key?: string;
}

interface EditableTableProps<T extends any> extends Omit<TableProps<T>, 'columns'> {
  columns: ColumnItem<T>[];
}

export const EditableTable: React.FC<EditableTableProps<any>> = (props) => {
  const { columns, dataSource = [], ...restTableProps } = props;
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();
  const [data, setData] = useState(dataSource);

  const isEditing = (record: ColumnItem) => record.key === editingKey;

  const onCancel = () => setEditingKey('');

  const onSave = async (key: string) => {
    try {
      const { sourceCode, ...row } = await form.validateFields();
      const newData = [...data];
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

  const operateColumn = [
    {
      title: '编辑',
      dataIndex: 'operator',
      editable: false,
      width: 160,
      render: (_: any, record) => {
        const editable = isEditing(record);
        return editable ? (
          <>
            <Typography.Link onClick={() => onSave(record.key)} style={{ marginRight: 8 }}>
              保存
            </Typography.Link>
            <Popconfirm
              title="确定取消编辑吗?"
              onConfirm={onCancel}
              okText="确定"
              cancelText="取消"
            >
              <a>取消</a>
            </Popconfirm>
          </>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => onEdit(record)}>
            编辑
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = [...columns, ...operateColumn].map((col: any) => ({
    ...col,
    onCell: (record: any) => ({
      record,
      editable: col.editable,
      dataIndex: col.dataIndex,
      title: col.title,
      editing: isEditing(record),
      cellComponent: col.cellComponent ?? null,
    }),
  }));

  return (
    <Form form={form}>
      <Table
        columns={mergedColumns as any}
        dataSource={data}
        components={{
          body: {
            cell: EditCell,
          },
        }}
        {...restTableProps}
      />
    </Form>
  );
};

export interface EditDraggableTableProps<T> extends EditableTableProps<T> {}

export const EditDraggableTable = (props) => {
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
