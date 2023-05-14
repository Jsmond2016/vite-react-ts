import React, { useState } from 'react';
import { Table, Layout, Space, Popconfirm } from 'antd';
import { useNavigate } from "react-router-dom";
import styles from './index.module.less';

const { Content } = Layout;


interface IProps {
  dataSource: [],
  onDeleteItem: (id: string) => void,
}

const List: React.FC<IProps> = (props: IProps) => {

  const navigate = useNavigate();
  const { onDeleteItem } = props

  const onEditItem = (id: string) => {
    const path = `/user/create?id=${id}`
    navigate(path)
  }

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text: any, record: any, index: any) => (
        <a href="/user/detail">{text}</a>
      )
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '爱好',
      dataIndex: 'hobby',
      key: 'hobby',
    },
    {
      title: '技能',
      dataIndex: 'skill',
      key: 'skill',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (_:any, record: any) => {
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
        )
      }
    }
  ];

  const { dataSource } = props

  return (
    <>
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          <Table rowKey="id" bordered dataSource={dataSource} columns={columns} />
        </Content>
      </Layout>
    </>
  );
};

export default List;
