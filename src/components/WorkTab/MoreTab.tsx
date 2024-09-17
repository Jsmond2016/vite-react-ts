import { DownOutlined } from '@ant-design/icons';
import { useBoolean } from 'ahooks';
import { Dropdown, DropdownProps, MenuProps } from 'antd';
import React from 'react';

const MoreTab = () => {
  const [open, openOperate] = useBoolean(false);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '3') {
      openOperate.setFalse();
    }
  };

  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      openOperate.set(nextOpen);
    }
  };

  const items: MenuProps['items'] = [
    {
      label: 'Clicking me will not close the menu.',
      key: '1',
    },
    {
      label: 'Clicking me will not close the menu also.',
      key: '2',
    },
    {
      label: 'Clicking me will close the menu.',
      key: '3',
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
        onClick: handleMenuClick,
      }}
      onOpenChange={handleOpenChange}
      open={open}
    >
      <DownOutlined className="text-size-[16px] bg-white h-[56px] flex justify-center px-4" />
    </Dropdown>
  );
};

export default MoreTab;
