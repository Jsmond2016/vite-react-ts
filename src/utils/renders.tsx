import { DashOutlined, RiseOutlined } from '@ant-design/icons';
import { Badge, Space } from 'antd';
import React from 'react';

import {
  ProductStatus,
  ProductStatusOptions,
  ProductTrendStatus,
  statusColorMap,
} from '@/constants';
import { IProduct } from '@/types/product';

export const trendStatusIconMap = {
  [ProductTrendStatus.Down]: <RiseOutlined style={{ color: '#cf1321' }} />,
  [ProductTrendStatus.Flat]: <DashOutlined />,
  [ProductTrendStatus.Up]: <RiseOutlined style={{ color: '#2f8600' }} />,
} as const;

export const priceRender = (value: number) => `￥${value.toFixed(2)}`;
export const productStatusRender = (value: ProductStatus) => (
  <Badge color={statusColorMap[value]} text={ProductStatusOptions[value]} />
);
export const renderTrendWithText = (
  record: Pick<IProduct, 'trendStatus' | 'productInventory'>,
) => {
  return (
    <Space direction="horizontal">
      <span>{record.productInventory}</span>
      {trendStatusIconMap[record.trendStatus]}
    </Space>
  );
};
