import { message, Spin } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import http from '@/request/index';

import List from './List';
import Search from './Search';
import Sider from './Sider';

const Index = () => {
  const [dataSource, setDataSource] = useState<any>([]);
  const [loadingFlag, setLoading] = useState<boolean>(false);
  const [drawerVisible, setVisible] = useState<boolean>(false);
  const [item, setItem] = useState({});
  const handleSearch = (values: any) => {
    const { name, type, publishTime } = values;
    const params = {
      name,
      type,
      publishTime: dayjs(publishTime).format('YYYY-MM-DD'),
    };
    setLoading(true);
    http
      .get('/search-music', {
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
      const url = '/delete-music';
      setLoading(true);
      http
        .post(url, {
          id,
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
    openDrawer: (record: any) => {
      setVisible(true);
      setItem(record);
    },
  };
  const searchProps = {
    onSearch: handleSearch,
  };

  const handleSave = (values: any) => {
    const url = '/save-music';
    setLoading(true);
    http
      .post(url, values)
      .then(() => {
        handleSearch({});
      })
      .finally(() => {
        setLoading(true);
      });
  };

  const siderProps: any = {
    toggleSider: (flag: boolean) => setVisible(flag),
    drawerVisible,
    toFinish: handleSave,
    item,
  };

  return (
    <Spin spinning={loadingFlag} size="large">
      <Search {...searchProps} />
      <List {...listProps} />
      <Sider {...siderProps} />
    </Spin>
  );
};

export default Index;
