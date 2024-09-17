import { message, Row, Space, Tabs } from 'antd';
import { last } from 'ramda';
import { useNavigate } from 'react-router-dom';

import { useMenuStore } from '@/store/global/menu';

import MoreTab from './MoreTab';

const WorkTab = () => {
  const { openedPageTabs, curTabKey, setCurTabKey, setOpenedPageTabs } = useMenuStore();

  const tabItems = openedPageTabs.map((menu) => ({
    label: (
      <Space size="small" onClick={() => navigateTo(menu.key)}>
        {menu.icon}
        {menu.label}
      </Space>
    ),
    key: menu.key,
  }));

  const navigateTo = useNavigate();

  const handleEditTab = (key: string, action: 'add' | 'remove') => {
    if (action === 'remove') {
      if (['/', '/home'].includes(key)) {
        message.warning('首页不允许删除');
        return;
      }
      const newWorkTabs = openedPageTabs.filter((tab) => tab.key !== key);
      const newTabKey = last(newWorkTabs).key;
      navigateTo(newTabKey);
      setOpenedPageTabs(newWorkTabs);
    }
  };
  return (
    <Row justify-between className="w-full border-t-solid border-t-coolgray border-t-1">
      <Tabs
        className="bg-white  flex-grow-1"
        items={tabItems}
        type="editable-card"
        activeKey={curTabKey}
        onChange={setCurTabKey}
        onEdit={handleEditTab}
        hideAdd
        more={{ icon: <MoreTab />, arrow: true }}
      />
      <MoreTab />
    </Row>
  );
};

export default WorkTab;
