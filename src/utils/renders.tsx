import { DashOutlined, RiseOutlined } from '@ant-design/icons';
import { Badge, Button, Space, Typography } from 'antd';

import { ProductStatus, ProductStatusOptions, ProductTrendStatus } from '@/constants';
import { IProduct } from '@/types/product';
import dayjs from 'dayjs';
import { DATE_FORMAT, DATE_TIME_FORMAT, DATE_TIME_MINUTE_FORMAT } from './constants';

export const trendStatusIconMap = {
  [ProductTrendStatus.Down]: <RiseOutlined style={{ color: '#cf1321' }} />,
  [ProductTrendStatus.Flat]: <DashOutlined />,
  [ProductTrendStatus.Up]: <RiseOutlined style={{ color: '#2f8600' }} />,
} as const;

const statusColorMap = {
  [ProductStatus.Off_Shelf]: 'purple',
  [ProductStatus.To_Be_Sale]: 'cyan',
  [ProductStatus.On_Sale]: 'green',
  [ProductStatus.Sold_Out]: 'red',
};

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

// ====== 时间 render ====================
/**
 * @description 渲染时间格式：2022-12-08
 * @param v
 * @returns string
 */
export const dateRender = (v: number | null | undefined) =>
  v != null && dayjs(v).format(DATE_FORMAT);
/**
 * @description 渲染时间格式：2022-12-08 12:58:31
 * @param v
 * @returns string
 */
export const dateTimeRender = (v: number | null | undefined) =>
  v != null && dayjs(v).format(DATE_TIME_FORMAT);

/**
 * @description 渲染时间格式 2022-12-08 12:58
 * @param v
 * @returns
 */
export const dateTimeMinuteRender = (v: number | null | undefined) =>
  v != null && dayjs(v).format(DATE_TIME_MINUTE_FORMAT);

// ====== 金额相关 ===================
/**
 *
 * @param v 金额为分
 * @returns
 */
export const toRMBYuan = (v: number): number => {
  const res = v / 100;
  return Number.isNaN(res) ? 0 : res;
};
/**
 *
 * @param v 金额为元
 * @returns
 */
export const toRMBFen = (v: number): number => {
  const res = v * 100;
  return Number.isNaN(res) ? 0 : res;
};
/**
 *
 * @param x 金额为元
 * @returns string
 */
export const thousands = (x: number) => {
  // https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};
/**
 * @description 200.00 -> 2.00 元
 * @param value 金额：分
 * @returns string
 */
export const toRMBYuanRender = (value: number) => `${toRMBYuan(value)} 元`;

/**
 * @description 2.00 -> 200.00 分
 * @param value 金额: 元
 * @returns string
 */
export const toRMBFenRender = (value: number) => `${toRMBFen(value)} 分`;

/**
 * @description 千分位格式化: 1000000 ->  "1,000,000" 元
 * @param value number 元
 * @returns string
 */
export const toThousandsRMBYuanRender = (value: number) =>
  `${thousands(toRMBYuan(value))} 元`;

// ======= url 相关=================

type LinkItem = { url: string; name: string | number };
/**
 * @description 链接
 * @param v
 * @returns
 */
export const linkRender = (v: LinkItem | LinkItem[] | undefined | null) => {
  if (!v) return '';
  if (Array.isArray(v)) {
    return v.map((link) => (
      <Typography.Link href={link.url}>{link.name}</Typography.Link>
    ));
  }
  return <Typography.Link href={v.url}>{v.name}</Typography.Link>;
};

/**
 * @description 文本渲染
 * @param v
 * @returns
 */
export const textRender = (v: string | string[]) => {
  const commonStyle: React.CSSProperties = { wordBreak: 'break-all' };
  if (Array.isArray(v)) {
    return (
      <Space direction="horizontal" split=",">
        {v.map((text) => (
          <Typography.Text style={commonStyle}>{text}</Typography.Text>
        ))}
      </Space>
    );
  }
  return <Typography.Text style={commonStyle}>{v}</Typography.Text>;
};

/**
 * @description 使用案例: render: (v) => statusRender(v, { 1: 开启})
 * @param v
 * @param options
 * @returns
 */
export const statusRender = (v: string | number, options: Record<string, any>) => {
  if (v == null) return '';
  return options[v];
};
