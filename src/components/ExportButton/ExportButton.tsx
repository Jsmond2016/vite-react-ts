import { ExportOutlined } from '@ant-design/icons';
import { ButtonProps } from 'antd';
import React from 'react';

import { ButtonColor } from '../ButtonColor/ButtonColor';

const ExportButton = (buttonProps: ButtonProps) => {
  const { children = '导出' } = buttonProps;

  return (
    <ButtonColor overrideColor="FFAF45" type="primary" icon={<ExportOutlined />} {...buttonProps}>
      {children}
    </ButtonColor>
  );
};

export default ExportButton;
