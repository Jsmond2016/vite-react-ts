import { message, Spin } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

// import http from '@/utils/req';
import http from '@/request/index';

import List from './List';
import Search from './Search';

const Index = () => {
  const [dataSource, setDataSource] = useState<any>([]);
  const [loadingFlag, setLoading] = useState<boolean>(false);
  const handleSearch = (values: any) => {
    const { productId, productName, status, colorArray, capacity, netTypeArray } = values;
    const params = {
      productId,
      productName,
      status,
      colorArray,
      capacity,
      netTypeArray,
    };
    console.log('筛选params', params);
    setLoading(true);
    http({
      url: '/getProductList',
      method: 'get',
      params,
    })
      .then((res) => {
        const { data } = res;
        setDataSource(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteItem = (id: string) => {
    if (id) {
      const url = '/delete-user';
      setLoading(true);
      http({
        url,
        method: 'delete',
        data: { id },
      })
        .then(() => {
          message.success('删除成功！');
        })
        .finally(() => {
          setLoading(false);
        });
    }
    handleSearch({});
  };

  useEffect(() => {
    handleSearch({});
  }, []);

  const listProps = {
    dataSource,
    onDeleteItem: handleDeleteItem,
  };
  const searchProps = {
    onSearch: handleSearch,
  };

  return (
    <Spin spinning={loadingFlag} size="large">
      <Search {...searchProps} />
      <List {...listProps} />
    </Spin>
  );
};

export default Index;
