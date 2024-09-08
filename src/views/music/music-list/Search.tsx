// import { Button, Col, DatePicker, Form, Input, Row, Select, Space } from 'antd';
import React from 'react';

import RenderFormItem, { FormItemFields } from '@/components/RenderFormItem/RenderFormItem';

// const FORM_ITEM_LAYOUT = {
//   labelCol: {
//     span: 8,
//   },
//   wrapperCol: {
//     span: 16,
//   },
// };

// const { Option } = Select;

interface IProps {
  onSearch: (values: any) => void;
}

const Search: React.FC<IProps> = () => {
  // const { onSearch } = props;
  // const [visible, toogleSearch] = useState(false);
  // const [form] = Form.useForm();

  // const onInputNumberChange = (value: any) => {
  //   console.log('onInputNumberChange', value);
  // };

  // const onDateChange = (val: any, datestring: any) => {
  //   console.log('onDateChange', val);
  //   console.log('dateString', datestring);
  // };

  // const onSelectChange = (value: any) => {
  //   console.log('onSelectChange', value);
  // };

  type Album = {
    name: string;
    album: string;
    testList: Array<{ name: string }>;
    textarea: string;
    select: number;
    radio: number;
    date: number;
    config: {
      title: string;
      count: number;
      moreConfig: {
        name: string;
        value: number;
      };
      list: Array<{
        id: number;
        amount: number;
        reason: string;
      }>;
    };
  };
  const formFields: FormItemFields<Album>[] = [
    {
      title: 'test-config-moreConfig',
      key: ['config', 'moreConfig', 'name'],
      type: 'date',
    },
    {
      title: 'test-radio',
      key: 'radio',
      type: 'radio',
      props: {
        options: [],
      },
    },
    {
      title: 'test-textarea',
      key: 'select',
      type: 'textarea',
      props: {
        rows: 6,
      },
    },
    {
      title: 'test-inputNumber',
      key: 'select',
      type: 'inputNumber',
      props: {
        max: 99,
      },
    },
    {
      title: 'test-select',
      key: 'select',
      type: 'select',
      props: {
        options: [],
      },
    },
    {
      title: '歌手姓名',
      key: 'name',
      type: 'input',
      props: {
        maxLength: 12,
      },
    },
    {
      title: 'test-list',
      key: 'testList',
      type: 'date',
      props: {
        picker: 'date',
      },
    },
    {
      title: '专辑名',
      key: 'album',
      type: 'textarea',
      props: {
        rows: 3,
      },
    },
    {
      title: 'test-config-count',
      key: ['config', 'count'],
      type: 'inputNumber',
      props: {
        maxLength: 10,
      },
    },
    {
      title: 'test-config-title',
      key: ['config', 'title'],
      type: 'radio',
    },
    {
      title: 'test-config-list',
      key: ['config', 'list'],
      type: 'input',
    },
  ];

  return <RenderFormItem fields={formFields} />;

  // return (
  //   <>
  //     <Form
  //       {...FORM_ITEM_LAYOUT}
  //       name="control-ref"
  //       form={form}
  //       onFinish={onSearch}
  //       className="w-full"
  //     >
  //       <Row gutter={16}>
  //         <Col className="gutter-row" span={6}>
  //           <Form.Item label="歌手姓名" name="name">
  //             <Input />
  //           </Form.Item>
  //         </Col>
  //         <Col className="gutter-row" span={6}>
  //           <Form.Item label="专辑名" name="album">
  //             <Input />
  //           </Form.Item>
  //         </Col>
  //         <Col className="gutter-row" span={6}>
  //           <Form.Item label="发布年份" name="publishTime">
  //             <DatePicker picker="year" className="w-full" onChange={onDateChange} />
  //           </Form.Item>
  //         </Col>
  //         <Col className="gutter-row" span={6}>
  //           <Space size={8}>
  //             <Button type="dashed" onClick={() => toogleSearch(!visible)}>
  //               {visible ? '收起查询' : '展开查询'}
  //             </Button>
  //             <Button type="default" onClick={() => form.resetFields()}>
  //               重置
  //             </Button>
  //             <Button type="primary" htmlType="submit">
  //               搜索
  //             </Button>
  //           </Space>
  //         </Col>
  //       </Row>
  //       {visible ? (
  //         <React.Fragment>
  //           <Row gutter={16}>
  //             <Col className="gutter-row" span={6}>
  //               <Form.Item label="类别" name="type" initialValue="classic">
  //                 <Select onChange={onSelectChange}>
  //                   <Option value="classic">经典</Option>
  //                   <Option value="popular">流行</Option>
  //                   <Option value="cantonese">粤语</Option>
  //                   <Option value="electronic">电音</Option>
  //                   <Option value="soft">轻音乐</Option>
  //                   <Option value="jazz">jazz</Option>
  //                   <Option value="guitar">吉他</Option>
  //                 </Select>
  //               </Form.Item>
  //             </Col>
  //             <Col className="gutter-row" span={6}>
  //               <Form.Item label="学号" name="idNumber">
  //                 <Input />
  //               </Form.Item>
  //             </Col>
  //             <Col className="gutter-row" span={6}>
  //               <Form.Item label="年级" name="grade" initialValue="5">
  //                 <Select onChange={onSelectChange}>
  //                   <Option value="1">一年级</Option>
  //                   <Option value="2">二年级</Option>
  //                   <Option value="3">三年级</Option>
  //                   <Option value="4">四年级</Option>
  //                   <Option value="5">五年级</Option>
  //                   <Option value="6">六年级</Option>
  //                 </Select>
  //               </Form.Item>
  //             </Col>
  //           </Row>
  //           <Row gutter={16}>
  //             <Col className="gutter-row" span={6}>
  //               <Form.Item label="爱好" name="hobby">
  //                 <Input />
  //               </Form.Item>
  //             </Col>
  //             <Col className="gutter-row" span={6}>
  //               <Form.Item label="场景" name="environment" initialValue="sports">
  //                 <Select onChange={onSelectChange}>
  //                   <Option value="sports">运动</Option>
  //                   <Option value="driving">驾驶</Option>
  //                   <Option value="working">工作</Option>
  //                   <Option value="studying">学习</Option>
  //                   <Option value="game">游戏</Option>
  //                 </Select>
  //               </Form.Item>
  //             </Col>
  //             <Col className="gutter-row" span={6}>
  //               <Form.Item label="国家" name="country" initialValue="inside">
  //                 <Select onChange={onSelectChange}>
  //                   <Option value="inside">国内</Option>
  //                   <Option value="outside">港台</Option>
  //                   <Option value="europeJapanKorean">欧日韩</Option>
  //                   <Option value="america">美国</Option>
  //                   <Option value="other">其他</Option>
  //                 </Select>
  //               </Form.Item>
  //             </Col>
  //           </Row>
  //         </React.Fragment>
  //       ) : null}
  //     </Form>
  //   </>
  // );
};

export default Search;
