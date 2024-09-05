import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Row } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [form] = Form.useForm();

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };
  const navigator = useNavigate();
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values);
    try {
      await form.validateFields();
      navigator('/index');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Row style={{ height: '100vh' }} justify="center" align="middle">
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        style={{ width: 960 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default Index;
