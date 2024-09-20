import { SearchOutlined } from '@ant-design/icons';
import { useBoolean } from 'ahooks';
import { Input, List, Modal, Space, Typography } from 'antd';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { useMenuStore } from '@/store/global';

const SearchMenuIcon = () => {
  const searchModalRef = useRef<SearchRefProps>(null);

  return (
    <>
      <SearchOutlined
        onClick={() => {
          searchModalRef.current?.openModal();
        }}
        className="text-size-[22px] cursor-pointer"
      />
      <SearchModal ref={searchModalRef} />
    </>
  );
};

type SearchModalProps = Record<string, any>;
type SearchRefProps = {
  openModal: () => void;
};

// flat menu list
function getAllMenuList(sourceMenuList = [], resultMenuList = []) {
  sourceMenuList.forEach((item) => {
    const { children, ...restMenuItem } = item;
    if (Array.isArray(children) && children.length > 0) {
      getAllMenuList(children, resultMenuList);
    } else {
      // 父菜单不是合法路由页面
      resultMenuList.push(restMenuItem);
    }
  });
  return resultMenuList;
}

const SearchModal = forwardRef<SearchRefProps, SearchModalProps>(
  function SearchModalContent(_props, ref) {
    const [open, openOperate] = useBoolean();

    const { menuList } = useMenuStore();
    const allMenuList = getAllMenuList(menuList);

    useImperativeHandle(ref, () => ({
      openModal: openOperate.setTrue,
    }));

    const [searchVal, setSearchVal] = useState('');
    const onInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      const val = ev.target.value?.trim();
      setSearchVal(val);
    };

    useEffect(() => {
      if (!open) {
        setSearchVal('');
      }
    }, [open]);

    const navigate = useNavigate();
    const clickJumpToMenuItem = (key: string) => {
      navigate(key);
      openOperate.setFalse();
    };

    const data = useMemo(() => {
      if (!searchVal) {
        return [];
      }
      const searchValRegExp = new RegExp(searchVal, 'i');
      return allMenuList.filter((item) => {
        return searchValRegExp.test(item.key) || searchValRegExp.test(item.label);
      });
    }, [searchVal]);

    return (
      <Modal open={open} footer={null} closable={false} onCancel={openOperate.setFalse}>
        <Space direction="vertical" size="large" className="w-full">
          <Input.Search
            value={searchVal}
            onChange={onInputChange}
            placeholder="菜单搜索：支持菜单名称，路径"
          />
          <List
            bordered
            dataSource={data}
            renderItem={(item) => {
              console.log('item', item);
              return (
                <List.Item className="cursor-pointer" onClick={() => clickJumpToMenuItem(item.key)}>
                  <Typography.Link>{item.label}</Typography.Link>
                </List.Item>
              );
            }}
          />
        </Space>
      </Modal>
    );
  },
);

export default SearchMenuIcon;
