import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from 'antd';
import React, { useState } from 'react';

const FORM_ITEM_LAYOUT = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
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
        className="mx-18px pt-24px"
      >
        <Row gutter={[8, 8]}>
          <Col className="gutter-row" span={6}>
            <Form.Item label="商品ID" name="productId">
              <Input allowClear />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item label="商品名字" name="productName">
              <Input allowClear />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item label="状态" name="status">
              <Select allowClear>
                <Option value="Off_Shelf">未上架</Option>
                <Option value="To_Be_Sale">待售</Option>
                <Option value="On_Sale">在售</Option>
                <Option value="Sold_Out">售罄</Option>
              </Select>
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
                <Form.Item label="机身颜色" name="colorArray">
                  <Select mode="multiple" allowClear>
                    <Option value="Black">星空黑</Option>
                    <Option value="Blue">海军蓝</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
                <Form.Item label="容量" name="capacity">
                  <Input suffix="GB" allowClear />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
                <Form.Item label="网络类型" name="netTypeArray">
                  <Select mode="multiple" allowClear>
                    <Option value="_4G">4G</Option>
                    <Option value="_4G_Global">4G全网通</Option>
                    <Option value="_5G">5G</Option>
                    <Option value="_5G_Global">5G全网通</Option>
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
