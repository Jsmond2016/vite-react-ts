import { ReactNode } from 'react';
import { Form } from 'antd';

export interface EditCellProps extends React.HTMLAttributes<HTMLElement> {
  editable?: boolean;
  editing: boolean;
  dataIndex?: string | string[];
  cellComponent?: React.ReactNode;
  children?: ReactNode;
}

const EditCell = (props: EditCellProps) => {
  const { editable, title, children, editing, dataIndex, cellComponent, ...restProps } = props;
  return (
    <td {...restProps}>
      {editing && cellComponent ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `请输入 ${title}!`,
            },
          ]}
        >
          {cellComponent}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditCell;
