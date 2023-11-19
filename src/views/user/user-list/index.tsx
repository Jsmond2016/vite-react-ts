import React, { useState, useEffect } from 'react';
import { Spin, message } from 'antd';
import Search from './search/index';
import List from './list/index';
import dayjs from 'dayjs';
// import http from '@/utils/req';
import http from '@/request/index';

const Index = () => {
  const [dataSource, setDataSource] = useState<any>([]);
  const [loadingFlag, setLoading] = useState<boolean>(false);
  const handleSearch = (values: any) => {
    const { username, age, birthday } = values;
    const params = {
      username,
      age,
      birthday: dayjs(birthday).format('YYYY-MM-DD'),
    };
    setLoading(true);
    http({
      url: '/search-user',
      method: 'get',
      params,
    }).then((res) => {
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
