import { DashOutlined, RiseOutlined } from '@ant-design/icons';
import { Badge, Image, Layout, Popconfirm, Space, Table, Tag, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { useNavigate } from 'react-router-dom';

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

enum ProductColor {
  Blue = 1,
  Black = 2,
}

const ProductColorOptions = {
  [ProductColor.Black]: '星空黑',
  [ProductColor.Blue]: '海军蓝',
};

enum NetType {
  _4G = 1,
  _4G_Global = 2,
  _5G = 3,
  _5G_Global = 4,
}
const NetTypeOptions = {
  [NetType._4G]: '4G',
  [NetType._4G_Global]: '4G全网通',
  [NetType._5G]: '5G',
  [NetType._5G_Global]: '5G全网通',
};

enum ProductStatus {
  /** 未上架 */
  Off_Shelf = 0,
  /** 待售 */
  To_Be_Sale,
  /** 在售 */
  On_Sale,
  /** 售罄 */
  Sold_Out,
}
const ProductStatusOptions = {
  [ProductStatus.Off_Shelf]: '未上架',
  [ProductStatus.To_Be_Sale]: '待售',
  [ProductStatus.On_Sale]: '在售',
  [ProductStatus.Sold_Out]: '售罄',
};

type IProduct = {
  productId: string;
  productName: string;
  originPrice: number;
  price: number;
  saleCount: number;
  deliverMethod: string;
  productColors: ProductColor[];
  capacity: number;
  netType: NetType[];
  imageUrl: string;
  serviceYearNum: number;
  productInventory: number;
  status: ProductStatus;
  trendStatus: ProductTrendStatus;
};

const statusColorMap = {
  [ProductStatus.Off_Shelf]: 'purple',
  [ProductStatus.To_Be_Sale]: 'cyan',
  [ProductStatus.On_Sale]: 'green',
  [ProductStatus.Sold_Out]: 'red',
};

enum ProductTrendStatus {
  Down = -1,
  Flat = 0,
  Up = 1,
}

const trendStatusIconMap = {
  [ProductTrendStatus.Down]: <RiseOutlined style={{ color: '#cf1322' }} />,
  [ProductTrendStatus.Flat]: <DashOutlined />,
  [ProductTrendStatus.Up]: <RiseOutlined style={{ color: '#3f8600' }} />,
};

const priceRender = (value: number) => `￥${value.toFixed(2)}`;
const statusRender = (value: ProductStatus) => (
  <Badge color={statusColorMap[value]} text={ProductStatusOptions[value]} />
);
const renderTrendWithText = (
  record: Pick<IProduct, 'trendStatus' | 'productInventory'>,
) => {
  return (
    <Space direction="horizontal">
      <span>{record.productInventory}</span>
      {trendStatusIconMap[record.trendStatus]}
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
      render: (id: string) => <a href={`/user/detail/${id}`}>{id}</a>,
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
      render: statusRender,
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

  return (
    <>
      <Layout>
        <Content className="mt-24px mx-16px">
          <Table rowKey="productId" bordered dataSource={dataSource} columns={columns} />
        </Content>
      </Layout>
    </>
  );
};

export default List;
