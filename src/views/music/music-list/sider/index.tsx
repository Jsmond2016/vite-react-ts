import React, { useState, useEffect, memo } from 'react';
import {
  Drawer,
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  Select,
  Radio,
  Button,
} from 'antd';
import styles from './index.module.less';
import dayjs from 'dayjs'

const FORM_ITEM_LAYOUT = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const { Option } = Select;

const Sider = memo((props: any) => {
  const { toggleSider, drawerVisible, item, toFinish } = props;
  const [form] = Form.useForm();
  const onSaveItem = () => {
    form.validateFields().then((values: any) => {
      const { publishTime } = values;
      const time = dayjs(publishTime).format('YYYY-MM-DD');
      const data = {
        ...item,
        ...values,
        publishTime: time,
      };
      toFinish(data);
    });
  };

  const FooterBtn = () => (
    <Row gutter={6}>
      <Col span={12} className={styles.btnWrapper}>
        <Button type="default" onClick={() => toggleSider(false)}>
          取消
        </Button>
      </Col>
      <Col span={12} className={styles.btnWrapper}>
        <Button type="primary" htmlType="submit" onClick={onSaveItem}>
          确定
        </Button>
      </Col>
    </Row>
  );

  const drawerProps: any = {
    title: `${item ? '编辑' : '添加'}音乐`,
    placement: 'right',
    destroyOnClose: true,
    onClose: () => toggleSider(!drawerVisible),
    visible: drawerVisible,
    width: 450,
    closable: true,
    footer: <FooterBtn />,
    footerStyle: { padding: '30px 0' },
  };

  const { name, gender, album, publishTime, type, environment, country } = item;

  return (
    <>
      <Drawer {...drawerProps}>
        <Form
          {...FORM_ITEM_LAYOUT}
          name="basic"
          form={form}
          initialValues={{ remember: true }}
          preserve={false}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                label="歌手姓名"
                name="name"
                rules={[{ required: true, message: '歌手姓名!' }]}
                initialValue={name}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label="歌手性别"
                name="gender"
                rules={[{ required: true, message: '歌手姓名!' }]}
                initialValue={gender}
              >
                <Radio.Group>
                  <Radio value="male">男</Radio>
                  <Radio value="female">女</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="专辑" name="album" initialValue={album}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label="发布年份"
                name="publishTime"
                initialValue={publishTime && moment(publishTime.toString())}
              >
                <DatePicker picker="year" className={styles.datePicker} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="类别" name="type" initialValue={type}>
                <Select>
                  <Option value="classic">经典</Option>
                  <Option value="popular">流行</Option>
                  <Option value="cantonese">粤语</Option>
                  <Option value="electronic">电音</Option>
                  <Option value="soft">轻音乐</Option>
                  <Option value="jazz">jazz</Option>
                  <Option value="guitar">吉他</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label="场景"
                name="environment"
                initialValue={environment}
              >
                <Select>
                  <Option value="sports">运动</Option>
                  <Option value="driving">驾驶</Option>
                  <Option value="working">工作</Option>
                  <Option value="studying">学习</Option>
                  <Option value="game">游戏</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="国家" name="country" initialValue={country}>
                <Select>
                  <Option value="inside">国内</Option>
                  <Option value="outside">港台</Option>
                  <Option value="europeJapanKorean">欧日韩</Option>
                  <Option value="america">美国</Option>
                  <Option value="other">其他</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
});

export default Sider;
