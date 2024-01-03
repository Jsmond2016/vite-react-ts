import type { FormInstance, FormProps, MessageArgsProps, ModalProps } from 'antd';
import { Button, Form, message, Modal, Spin } from 'antd';
import React, {
  cloneElement,
  forwardRef,
  isValidElement,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

type FormWrapperProps = React.PropsWithChildren<{
  modalProps?: ModalProps;
  formProps?: FormProps;
  form?: FormProps['form'];
  successTip?: MessageArgsProps['content'];
  failedTip?: MessageArgsProps['content'];
}>;

type ModalFormControlParams<T = any> = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  formRef: React.MutableRefObject<FormInstance<any>>;
  apiHandlerRef: React.MutableRefObject<((formValues: T) => any) | undefined>;
};

type OpenParams<T = any> = {
  form?: FormInstance<T>;
  apiHandler?: any;
  data: any;
};

type FormWrapperRefProps = {
  openModal: (params?: OpenParams) => void;
  onConfirm: () => ModalFormControlParams;
};

const FormWrapper: React.ForwardRefRenderFunction<FormWrapperRefProps, FormWrapperProps> = (
  props,
  ref,
) => {
  const { modalProps, formProps, successTip = '操作成功', failedTip = '操作失败', form } = props;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [originForm] = Form.useForm();
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const formRef = useRef(form || originForm);
  const apiHandlerRef = useRef<(formValues: any) => any>();
  const dataRef = useRef();

  const handleSubmit = async () => {
    const formValues = await formRef.current.validateFields();
    setLoading(true);
    try {
      await apiHandlerRef.current?.(formValues);
      message.success(successTip);
      closeModal();
    } catch (error: any) {
      const failedText = `${failedTip}, ${error.msg}`;
      error.msg && message.error(failedText);
    } finally {
      setLoading(false);
    }
  };

  const initModalForm = (params: OpenParams = {} as OpenParams) => {
    const { apiHandler } = params;
    apiHandlerRef.current = apiHandler || apiHandlerRef.current;
    dataRef.current = params.data;
  };

  const openDialog = (params?: OpenParams) => {
    initModalForm(params);
    openModal();
  };

  useImperativeHandle(ref, () => ({
    openModal: openDialog,
    onConfirm: () => ({ open, setOpen, loading, setLoading, formRef, apiHandlerRef }),
  }));

  const footer = (
    <Button type="primary" onClick={handleSubmit}>
      保存
    </Button>
  );

  console.log('dataRef.current: ', dataRef.current);
  const childrenWithProps = React.Children.map(props.children, (child) => {
    // Checking isValidElement is the safe way and avoids a
    // typescript error too.
    if (isValidElement(child)) {
      return cloneElement(child, { data: dataRef.current, form: formRef.current } as any);
    }
    return child;
  });

  return (
    <Modal maskClosable={false} open={open} onCancel={closeModal} footer={footer} {...modalProps}>
      <Spin spinning={loading}>
        <Form {...formProps} form={formRef.current || formProps?.form}>
          {childrenWithProps}
        </Form>
      </Spin>
    </Modal>
  );
};

export default forwardRef<FormWrapperRefProps, FormWrapperProps>(FormWrapper);
