import {
  Alert,
  Button,
  Image,
  Layout,
  Popconfirm,
  Row,
  Space,
  Table,
  Typography,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { NetType, NetTypeOptions, ProductColor, ProductColorOptions } from '@/constants';
import { IProduct } from '@/types/product';
import { priceRender, productStatusRender, renderTrendWithText } from '@/utils/renders';

const { Content } = Layout;

interface IProps {
  dataSource: [];
  onDeleteItem: (id: string) => void;
}

const renderProduct = ({
  productName,
  imageUrl,
}: Pick<IProduct, 'productName' | 'imageUrl'>) => {
  return (
    <Space>
      <Image
        width={60}
        src={imageUrl}
        // src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
      <Typography.Paragraph
        ellipsis={{ tooltip: true, rows: 2, expandable: true, symbol: 'more' }}
      >
        {productName}
      </Typography.Paragraph>
    </Space>
  );
};

const List: React.FC<IProps> = (props: IProps) => {
  const navigate = useNavigate();
  const { onDeleteItem } = props;

  const onEditItem = (id: string) => {
    const path = `/user/create?id=${id}`;
    navigate(path);
  };

  const columns: ColumnsType<IProduct> = [
    {
      title: '商品ID',
      dataIndex: 'productId',
      width: 120,
      render: (id: string) => <a href={`/product/detail/${id}`}>{id}</a>,
    },
    {
      title: '商品名字',
      dataIndex: 'productName',
      width: 180,
      render: (_, record) => renderProduct(record),
    },
    {
      title: '原价',
      dataIndex: 'originPrice',
      width: 120,
      render: priceRender,
    },
    {
      title: '价格',
      dataIndex: 'price',
      width: 80,
      render: priceRender,
    },
    {
      title: '销售量',
      dataIndex: 'saleCount',
      width: 80,
      render: (_, record) => renderTrendWithText(record),
    },
    {
      title: '商品状态',
      dataIndex: 'status',
      width: 80,
      render: productStatusRender,
    },
    {
      title: '配送方式',
      dataIndex: 'deliverMethod',
      width: 80,
    },
    {
      title: '机身颜色',
      dataIndex: 'productColors',
      width: 120,
      render: (v: ProductColor[]) => v.map((v) => ProductColorOptions[v]).join('、'),
    },
    {
      title: '容量',
      dataIndex: 'capacity',
      width: 120,
      render: (v) => `${v}GB`,
    },
    {
      title: '网络类型',
      dataIndex: 'netType',
      width: 120,
      render: (v: NetType[]) => v.map((v) => NetTypeOptions[v]).join('、'),
    },
    {
      title: '保修年限',
      dataIndex: 'serviceYearNum',
      width: 120,
      render: (v: number) => `${v}年`,
    },
    {
      title: '库存数量',
      dataIndex: 'productInventory',
      width: 120,
      render: (v: number) => `${v}部`,
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      width: 120,
      render: (_: any, record: any) => {
        return (
          <Space size="middle">
            <Popconfirm
              title="确定删除吗？"
              onConfirm={() => onDeleteItem(record.id)}
              okText="是"
              cancelText="否"
            >
              <a>删除</a>
            </Popconfirm>
            <a onClick={() => onEditItem(record.id)}>编辑</a>
          </Space>
        );
      },
    },
  ];

  const { dataSource } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys as string[]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const totalPrice = dataSource
    .filter((item: IProduct) => selectedRowKeys.includes(item.productId))
    .reduce((pre: number, cur: IProduct) => ((pre += cur.price), pre), 0);

  return (
    <div>
      <Row justify="end" className="mx-16px">
        <Space direction="horizontal" size="small">
          <Button onClick={() => {}}>导入</Button>
          <Button onClick={() => {}}>导出</Button>
          <Button onClick={() => {}} type="primary">
            新建
          </Button>
        </Space>
      </Row>
      <Content className="mt-12px mx-16px">
        <Space direction="vertical" size="middle" className="w-full">
          <Alert
            type="info"
            message={
              <Typography.Text>
                累计价格{' '}
                <Typography.Text strong type="danger">
                  {totalPrice.toFixed(3)}
                </Typography.Text>{' '}
                元
              </Typography.Text>
            }
          />
          <Table
            rowKey="productId"
            rowSelection={rowSelection}
            bordered
            dataSource={dataSource}
            columns={columns}
          />
        </Space>
      </Content>
    </div>
  );
};

export default List;
