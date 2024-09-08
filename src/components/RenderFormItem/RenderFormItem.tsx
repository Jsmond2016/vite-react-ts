import {
  Col,
  DatePicker,
  DatePickerProps,
  Form,
  FormInstance,
  Input,
  InputNumber,
  InputNumberProps,
  InputProps,
  Radio,
  RadioGroupProps,
  Row,
  Select,
  SelectProps,
} from 'antd';
import { TextAreaProps } from 'antd/es/input';
import React from 'react';

import { GetFieldName } from '@/types/util';

type FormFieldType = 'input' | 'textarea' | 'inputNumber' | 'select' | 'radio' | 'date';

type ComPropsMap = {
  input: InputProps;
  textarea: TextAreaProps;
  inputNumber: InputNumberProps;
  select: SelectProps;
  radio: RadioGroupProps;
  date: DatePickerProps;
};

type GetTypeWithProps<F extends FormFieldType = FormFieldType> = F extends FormFieldType
  ? {
      type: F;
      props?: ComPropsMap[F];
    }
  : {
      type: string;
      props?: any;
    };

export type FormItemFields<T = any, F extends FormFieldType = FormFieldType> = {
  title: string;
  key: GetFieldName<T>;
  formItemProps?: any;
  updater?: any;
} & GetTypeWithProps<F>;

export type RenderFormItemProps<T = any> = {
  fields: FormItemFields<T>[] | FormItemFields<T>[][];
  form?: FormInstance<T>;
};

const formFieldTypeMap = {
  input: Input,
  textarea: Input.TextArea,
  inputNumber: InputNumber,
  select: Select,
  radio: Radio.Group,
  date: DatePicker,
};

function getFormField<T>(field: FormItemFields<T>) {
  const Comp = formFieldTypeMap[field.type] as any;
  const { props } = field;

  return <Comp {...(props ?? {})} />;
}

function RenderFormItem<T>(props: RenderFormItemProps<T>) {
  const { fields, form } = props;

  const [_formInstance] = Form.useForm();

  const formInstance = form ?? _formInstance;

  return (
    <Form form={formInstance}>
      {fields.map((v: FormItemFields<T> | FormItemFields<T>[], idx) => {
        if (Array.isArray(v)) {
          return (
            <React.Fragment key={idx}>
              <Row>
                {v.map((subV, subIdx) => {
                  return (
                    <Col key={subIdx}>
                      {subV.updater ? (
                        <Form.Item noStyle shouldUpdate={subV.updater?.shouldUpdate}>
                          {() => (
                            <Form.Item name={subV.key} label={subV.title} {...subV.formItemProps}>
                              {getFormField<T>(subV)}
                            </Form.Item>
                          )}
                        </Form.Item>
                      ) : (
                        <Form.Item name={subV.key} label={subV.title} {...subV.formItemProps}>
                          {getFormField<T>(subV)}
                        </Form.Item>
                      )}
                    </Col>
                  );
                })}
              </Row>
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment key={idx}>
              {v.updater ? (
                <Form.Item noStyle shouldUpdate={v.updater?.shouldUpdate}>
                  {() => (
                    <Form.Item name={v.key} label={v.title} {...v.formItemProps}>
                      {getFormField(v)}
                    </Form.Item>
                  )}
                </Form.Item>
              ) : (
                <Form.Item name={v.key} label={v.title} {...v.formItemProps}>
                  {getFormField(v)}
                </Form.Item>
              )}
            </React.Fragment>
          );
        }
      })}
    </Form>
  );
}

export default RenderFormItem;
