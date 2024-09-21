import { BellOutlined, CheckOutlined } from '@ant-design/icons';
import { useBoolean } from 'ahooks';
import { Avatar, Badge, Button, List, Popover, Skeleton, Tabs, Tooltip, Typography } from 'antd';
import { useState } from 'react';

import { GlobalNotificationTab, GlobalNotificationTabOptions } from '@/constants';

const NotificationIcon = () => {
  const [open, openOperate] = useBoolean();
  return (
    <Popover
      open={open}
      onOpenChange={openOperate.toggle}
      trigger={['click']}
      content={<NotificationTabs />}
    >
      <Badge count={5}>
        <BellOutlined className="text-size-[22px] cursor-pointer" />
      </Badge>
    </Popover>
  );
};

function NotificationTabs() {
  const items = [
    {
      key: GlobalNotificationTab.Notification,
      label: GlobalNotificationTabOptions[GlobalNotificationTab.Notification],
      children: <MessageList />,
    },
    {
      key: GlobalNotificationTab.Message,
      label: GlobalNotificationTabOptions[GlobalNotificationTab.Message],
      children: <MessageList />,
    },
    {
      key: GlobalNotificationTab.Todo,
      label: GlobalNotificationTabOptions[GlobalNotificationTab.Todo],
      children: <MessageList />,
    },
  ];

  return <Tabs className="w-[320px]" items={items} />;
}

// function NotificationTabPane() {}
// function MessageTabPane() {}
// function TodosTabPane() {}

function MessageList() {
  const [loading, loadingOperate] = useBoolean();

  const getData = async () => {
    const mockData = new Array(10).fill(0).map((v, idx) => ({
      id: idx,
      avatar: `https://randomuser.me/api/portraits/men/${idx}.jpg`,
      content: '系统发布1.0.0,开启对应页面权限即可预览, 系统发布1.0.0,开启对应页面权限即可预览',
      dateFormat: `${idx}分钟前`,
    }));
    return mockData;
  };

  const [list, setList] = useState([]);

  const onLoadMore = async () => {
    try {
      loadingOperate.setTrue();
      const res = await getData();
      setList(res);
    } finally {
      loadingOperate.setFalse();
    }
  };

  const loadMore = !loading ? (
    <div className="text-center mt-[12px] h-[32px] line-height-normal">
      <Button onClick={onLoadMore}>loading more...</Button>
    </div>
  ) : null;

  const checkedMessageItem = (messageItem) => {
    const newList = list.filter((v) => v.id !== messageItem.id);
    setList(newList);
  };

  return (
    <List
      className="max-h-[400px] overflow-auto"
      loading={loading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          actions={[
            <CheckOutlined
              onClick={() => checkedMessageItem(item)}
              className="cursor-pointer"
              key="1"
            />,
          ]}
        >
          <Skeleton avatar title={false} loading={false} active>
            <List.Item.Meta avatar={<Avatar src={item.avatar} />} />
            <Typography.Paragraph ellipsis={{ rows: 2 }}>
              <Tooltip title={item.content}>{item.content}</Tooltip>
            </Typography.Paragraph>
          </Skeleton>
        </List.Item>
      )}
    />
  );
}

export default NotificationIcon;
