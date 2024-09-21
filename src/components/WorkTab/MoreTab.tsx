import {
  CloseCircleOutlined,
  DownOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  OneToOneOutlined,
  RedoOutlined,
  StopOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
} from '@ant-design/icons';
import { useBoolean, useFullscreen } from 'ahooks';
import { Dropdown, DropdownProps, MenuProps, Space } from 'antd';
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

  enum MoreTabEnum {
    Refresh,
    FullScreen,
    ExitFullScreen,
    CloseCurrent,
    CloseLeft,
    CloseRight,
    CloseOthers,
    CloseAll,
  }
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(() => document.getElementById('root'));

  const items: MenuProps['items'] = (
    [
      {
        label: (
          <Space size="small">
            <RedoOutlined />
            刷新
          </Space>
        ),
        key: MoreTabEnum.Refresh,
      },
      !isFullscreen
        ? {
            label: (
              <Space size="small">
                <FullscreenOutlined /> 最大化
              </Space>
            ),
            key: MoreTabEnum.FullScreen,
            onClick: toggleFullscreen,
          }
        : null,
      isFullscreen
        ? {
            label: (
              <Space size="small">
                <FullscreenExitOutlined />
                最小化
              </Space>
            ),
            key: MoreTabEnum.ExitFullScreen,
            onClick: toggleFullscreen,
          }
        : null,

      {
        type: 'divider',
      },
      {
        label: (
          <Space size="small">
            <CloseCircleOutlined />
            关闭当前
          </Space>
        ),
        key: MoreTabEnum.CloseCurrent,
      },
      {
        label: (
          <Space size="small">
            <VerticalRightOutlined />
            关闭左侧
          </Space>
        ),
        key: MoreTabEnum.CloseLeft,
      },
      {
        label: (
          <Space size="small">
            <VerticalLeftOutlined />
            关闭右侧
          </Space>
        ),
        key: MoreTabEnum.CloseRight,
      },
      {
        type: 'divider',
      },
      {
        label: (
          <Space size="small">
            <OneToOneOutlined />
            关闭其他
          </Space>
        ),
        key: MoreTabEnum.CloseOthers,
      },
      {
        label: (
          <Space size="small">
            <StopOutlined />
            关闭所有
          </Space>
        ),
        key: MoreTabEnum.CloseAll,
      },
    ] satisfies MenuProps['items']
  ).filter((v) => v !== null);

  return (
    <Dropdown
      menu={{
        items,
        onClick: handleMenuClick,
      }}
      trigger={['click']}
      onOpenChange={handleOpenChange}
      open={open}
    >
      <DownOutlined className="text-size-[16px] bg-white  flex justify-center px-[8px]" />
    </Dropdown>
  );
};

export default MoreTab;
