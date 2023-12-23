import { Layout, Popconfirm, Space, Table } from 'antd';
import React, { memo } from 'react';

const { Content } = Layout;

const typeMap: Record<string, string> = {
  classic: '经典',
  popular: '流行',
  contanese: '粤语',
  electronic: '电音',
  soft: '轻音乐',
  jazz: '爵士',
  guitar: '吉他',
};
const envirMap: Record<string, string> = {
  sports: '运动',
  driving: '驾驶',
  working: '工作',
  studying: '学习',
  game: '游戏',
};
const countryMap: Record<string, string> = {
  inside: '国内',
  outside: '国外',
  europeJapanKorean: '欧洲',
  america: '美国',
  other: '其他',
};
const genderMap: Record<string, string> = {
  male: '男',
  female: '女',
};

interface IProps {
  dataSource: [];
  onDeleteItem: (id: string) => void;
  openDrawer: (flag: boolean) => void;
}

// eslint-disable-next-line react/display-name
const List: React.FC<IProps> = memo((props: IProps) => {
  // const { onDeleteItem, openDrawer } = props;
  const { onDeleteItem } = props;

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      render: (val: any) => {
        return <span>{genderMap[val]}</span>;
      },
    },
    {
      title: '专辑',
      dataIndex: 'album',
      key: 'album',
    },
    {
      title: '发布时间',
      dataIndex: 'publishTime',
      key: 'publishTime',
      render: (txt: string) => <span>{txt}年</span>,
    },
    {
      title: '音乐类型',
      dataIndex: 'type',
      key: 'type',
      render: (txt: string) => <span>{typeMap[txt]}</span>,
    },
    {
      title: '场景',
      dataIndex: 'environment',
      key: 'environment',
      render: (txt: string) => <span>{envirMap[txt]}</span>,
    },
    {
      title: '国家',
      dataIndex: 'country',
      key: 'country',
      render: (txt: string) => <span>{countryMap[txt]}</span>,
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
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
            {/* <a onClick={() => openDrawer(record)}>编辑</a> */}
            <a>编辑</a>
          </Space>
        );
      },
    },
  ];

  const { dataSource } = props;

  return (
    <>
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          <Table bordered dataSource={dataSource} columns={columns} />
        </Content>
      </Layout>
    </>
  );
});

export default List;
