import { ButtonProps, Upload, UploadProps } from 'antd';
import React from 'react';

import { ButtonColor } from '../ButtonColor/ButtonColor';

export type UploadButtonProps = UploadProps & {
  buttonProps?: ButtonProps;
  actionUrl: string;
};

const UploadButton = (props: UploadButtonProps) => {
  const { buttonProps, ...uploadProps } = props;
  return (
    <Upload {...uploadProps}>
      <ButtonColor overrideColor="00b96b" {...buttonProps} />
    </Upload>
  );
};

export default UploadButton;
