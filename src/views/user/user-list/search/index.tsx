import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, Space, InputNumber, DatePicker, Select } from 'antd';
import styles from './index.module.less';

const FORM_ITEM_LAYOUT = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const { Option } = Select;

interface IProps {
  onSearch: (values: any) => void;
}

const Search: React.FC<IProps> = (props: IProps) => {
  const { onSearch } = props;
  const [visible, toogleSearch] = useState(false);
  const [form] = Form.useForm();

  const onInputNumberChange = (value: any) => {
    console.log('onInputNumberChange', value);
  };

  const onDateChange = (val: any, datestring: any) => {
    console.log('onDateChange', val);
    console.log('dateString', datestring);
  };

  const onSelectChange = (value: any) => {
    console.log('onSelectChange', value);
  };

  return (
    <>
      <Form
        {...FORM_ITEM_LAYOUT}
        name="control-ref"
        form={form}
        onFinish={onSearch}
        className={styles.wrapper}
      >
        <Row gutter={[8, 8]}>
          <Col className="gutter-row" span={6}>
            <Form.Item
              label="姓名"
              name="username"
              rules={[{ required: true, message: '请输入姓名!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item
              label="年龄"
              name="age"
              initialValue={18}
              rules={[{ required: true, message: '请输入年龄!' }]}
            >
              <InputNumber
                disabled
                className={styles.inputStyl}
                min={1}
                max={100}
                onChange={onInputNumberChange}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item
              label="出生日期"
              name="birthday"
              rules={[{ required: true, message: '请选择出生日期!' }]}
            >
              <DatePicker className={styles.datePicker} onChange={onDateChange} />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Space size={8}>
              <Button type="dashed" onClick={() => toogleSearch(!visible)}>
                {visible ? '收起查询' : '展开查询'}
              </Button>
              <Button type="default" onClick={() => form.resetFields()}>
                重置
              </Button>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </Space>
          </Col>
        </Row>
        {visible ? (
          <React.Fragment>
            <Row gutter={[8, 8]}>
              <Col className="gutter-row" span={6}>
                <Form.Item
                  label="性别"
                  name="gender"
                  initialValue="male"
                  rules={[{ required: true, message: '请选择性别!' }]}
                >
                  <Select disabled onChange={onSelectChange}>
                    <Option value="male">男</Option>
                    <Option value="female">女</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
                <Form.Item label="学号" name="idNumber">
                  <Input />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
                <Form.Item label="年级" name="grade" initialValue="5">
                  <Select onChange={onSelectChange}>
                    <Option value="1">一年级</Option>
                    <Option value="2">二年级</Option>
                    <Option value="3">三年级</Option>
                    <Option value="4">四年级</Option>
                    <Option value="5">五年级</Option>
                    <Option value="6">六年级</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col className="gutter-row" span={6}>
                <Form.Item label="爱好" name="hobby">
                  <Input />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
                <Form.Item label="技能" name="skill">
                  <Input />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
                <Form.Item label="户口性质" name="country" initialValue="contryside">
                  <Select onChange={onSelectChange}>
                    <Option value="town">城镇</Option>
                    <Option value="contryside">农村</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </React.Fragment>
        ) : null}
      </Form>
    </>
  );
};

export default Search;
