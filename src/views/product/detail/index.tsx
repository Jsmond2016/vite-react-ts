import { Descriptions, DescriptionsProps, Image, Spin } from 'antd';
import { DescriptionsItemType } from 'antd/es/descriptions';
import { useEffect, useState } from 'react';

import {
  NetType,
  NetTypeOptions,
  ProductColor,
  ProductColorOptions,
  ProductStatus,
  ProductStatusOptions,
} from '@/constants';
import http from '@/request/index';

type DescriptionRenderItem = Omit<DescriptionsItemType, 'children'> & {
  render?: (value: any, info: any) => DescriptionsItemType['children'];
};

type IDescriptionsRender = DescriptionsProps & {
  items: DescriptionRenderItem[];
  info: Record<string, any>;
};
const DescriptionsRender = ({ title, items, info }: IDescriptionsRender) => {
  const data = items?.map((item: DescriptionRenderItem) => ({
    ...item,
    children:
      typeof item.render === 'function'
        ? item.render?.(info[item.key as string], info)
        : info[item.key as string],
  }));
  return <Descriptions title={title} items={data} />;
};

export default function UserDetail() {
  const [productInfo, setProductInfo] = useState<any>({});
  const [loadingFlag, setLoading] = useState<boolean>(false);
  const queryOne = () => {
    setLoading(true);
    http
      .get('/product/queryOne')
      .then((res) => {
        setProductInfo(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    queryOne();
    return () => {
      setLoading(false);
      setProductInfo({});
    };
  }, []);

  const configItems: DescriptionRenderItem[] = [
    {
      key: 'productId',
      label: '商品ID',
    },
    {
      key: 'productName',
      label: '商品名字',
    },
    {
      key: 'originPrice',
      label: '原价',
    },
    {
      key: 'price',
      label: '现价',
    },
    {
      key: 'saleCount',
      label: '销量',
    },
    {
      key: 'deliverMethod',
      label: '快递方式',
    },
    {
      key: 'productColors',
      label: '颜色',
      render: (v: ProductColor) => ProductColorOptions[v],
    },
    {
      key: 'capacity',
      label: '机身容量',
    },
    {
      key: 'netType',
      label: '网络类型',
      render: (v: NetType) => NetTypeOptions[v],
    },
    {
      key: 'imageUrl',
      label: '图片',
      render: (v: string) => <Image src={v} />,
    },
    {
      key: 'serviceYearNum',
      label: '售后年限',
    },
    {
      key: 'productInventory',
      label: '库存',
    },
    {
      key: 'status',
      label: '商品状态',
      render: (v: ProductStatus) => ProductStatusOptions[v],
    },
  ];

  return (
    <Spin spinning={loadingFlag} size="large">
      <DescriptionsRender
        title="商品基本信息"
        column={3}
        items={configItems}
        info={productInfo}
      />
    </Spin>
  );
}
