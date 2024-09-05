import { Button, ButtonProps, ConfigProvider } from 'antd';
import React from 'react';

export type ButtonColorProps = ButtonProps & {
  overrideColor: string;
};

/**
 * 常用配色  'FFAF45' | '00b96b'
 *
 * @param props
 * @returns
 */
export function ButtonColor(props: ButtonColorProps) {
  const { overrideColor } = props;
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: overrideColor,
        },
      }}
    >
      <Button {...props} />
    </ConfigProvider>
  );
}
