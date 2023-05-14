import React, { useState, useEffect } from 'react';
import styles from './index.module.less';
import { Layout, Row, Col, Form, Spin, Card, Space, Tooltip } from 'antd';
import http from '@/request/index';

const FORM_ITEM_LAYOUT = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const FormItemLabel = (props: any) => {
  const { labelName, val } = props;
  return (
    <Col span={6}>
      <Form.Item {...FORM_ITEM_LAYOUT} label={labelName}>
        <Tooltip title={val}> {val} </Tooltip>
      </Form.Item>
    </Col>
  );
};

const FormRowItem = (list: any) => {
  return list.forEach((item: any) => (
    <Col span={6}>
      <FormItemLabel labelName={item.value[0]} val={item.value[1]} />
    </Col>
  ));
};

export default function UserDetail() {
  const [userInfo, setUserInfo] = useState<any>({});
  const [loadingFlag, setLoading] = useState<boolean>(false);
  const fetchUser = () => {
    setLoading(true);
    http
      .get('/get-user-info')
      .then((res) => {
        setUserInfo(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUser();
    return () => {
      setLoading(false);
      setUserInfo({})
    }
  }, []);

  const map: any = {
    name: '姓名',
    gender: '性别',
    age: '年龄',
    address: '住址',
    hobby: '爱好',
    skill: '技能',
  };
  const listData = new Map();
  Object.entries(userInfo).forEach(([key, val]) => {
    listData.set(key, [map[key], val]);
  });
  return (
    <Spin spinning={loadingFlag} size="large">
      <Space direction="vertical" className={styles.wrapper} size="middle">
        <Card title="用户信息" bordered size="default">
          <Row gutter={16}>
            <FormItemLabel labelName="姓名" val={userInfo.name} />
            <FormItemLabel labelName="性别" val={userInfo.gender} />
            <FormItemLabel labelName="年龄" val={userInfo.age} />
            <FormItemLabel labelName="年龄" val={userInfo.age} />
          </Row>
          <Row gutter={16}>
            <FormItemLabel labelName="住址" val={userInfo.address} />
            <FormItemLabel labelName="爱好" val={userInfo.hobby} />
            <FormItemLabel labelName="技能" val={userInfo.skill} />
            <FormItemLabel labelName="技能" val={userInfo.skill} />
          </Row>
          <Row gutter={16}>
            <FormItemLabel labelName="住址" val={userInfo.address} />
            <FormItemLabel labelName="爱好" val={userInfo.hobby} />
            <FormItemLabel labelName="技能" val={userInfo.skill} />
            <FormItemLabel labelName="技能" val={userInfo.skill} />
          </Row>
        </Card>
        <Card title="用户信息" bordered size="default">
          <Row gutter={16}>
            <FormItemLabel labelName="姓名" val={userInfo.name} />
            <FormItemLabel labelName="性别" val={userInfo.gender} />
            <FormItemLabel labelName="年龄" val={userInfo.age} />
            <FormItemLabel labelName="年龄" val={userInfo.age} />
          </Row>
          <Row gutter={16}>
            <FormItemLabel labelName="住址" val={userInfo.address} />
            <FormItemLabel labelName="爱好" val={userInfo.hobby} />
            <FormItemLabel labelName="技能" val={userInfo.skill} />
            <FormItemLabel labelName="技能" val={userInfo.skill} />
          </Row>
          <Row gutter={16}>
            <FormItemLabel labelName="住址" val={userInfo.address} />
            <FormItemLabel labelName="爱好" val={userInfo.hobby} />
            <FormItemLabel labelName="技能" val={userInfo.skill} />
            <FormItemLabel labelName="技能" val={userInfo.skill} />
          </Row>
        </Card>
        <Card title="用户信息" bordered size="default">
          <Row gutter={16}>
            <FormItemLabel labelName="姓名" val={userInfo.name} />
            <FormItemLabel labelName="性别" val={userInfo.gender} />
            <FormItemLabel labelName="年龄" val={userInfo.age} />
            <FormItemLabel labelName="年龄" val={userInfo.age} />
          </Row>
          <Row gutter={16}>
            <FormItemLabel labelName="住址" val={userInfo.address} />
            <FormItemLabel labelName="爱好" val={userInfo.hobby} />
            <FormItemLabel labelName="技能" val={userInfo.skill} />
            <FormItemLabel labelName="技能" val={userInfo.skill} />
          </Row>
          <Row gutter={16}>
            <FormItemLabel labelName="住址" val={userInfo.address} />
            <FormItemLabel labelName="爱好" val={userInfo.hobby} />
            <FormItemLabel labelName="技能" val={userInfo.skill} />
            <FormItemLabel labelName="技能" val={userInfo.skill} />
          </Row>
        </Card>
      </Space>
    </Spin>
  );
}
