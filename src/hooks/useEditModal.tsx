import { Button, Form, FormInstance, Input, Modal } from 'antd';
import { useState } from 'react';

const FormContent = ({ form }: { form: FormInstance }) => {
  return (
    <Form>
      <Form.Item name="name" label="姓名">
        <Input />
      </Form.Item>
    </Form>
  );
};

const EditModal = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const onEdit = () => {
    setOpen(true);
  };
  const onFinish = async () => {
    const formValues = await form.validateFields();
    console.log('formValues: ', formValues);
  };
  return (
    <>
      <Button onClick={onEdit}>编辑</Button>
      <Modal open={open} confirmLoading={loading} title="编辑" onOk={onFinish}>
        <FormContent form={form} />
      </Modal>
    </>
  );
};
const useEditModal = () => {};
