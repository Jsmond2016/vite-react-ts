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
import { head, last } from 'ramda';
import { useNavigate } from 'react-router-dom';

import { useMenuStore } from '@/store/global';

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
const MoreTab = () => {
  const [open, openOperate] = useBoolean(false);
  const { setOpenedPageTabs, openedPageTabs } = useMenuStore();

  const navigate = useNavigate();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('e', e);

    if (+e.key === MoreTabEnum.Refresh) {
      location.reload();
      return;
    }
    const curPath = location.pathname;
    if (+e.key === MoreTabEnum.CloseCurrent) {
      const newPageTabs = openedPageTabs.filter((v) => v.key !== curPath);
      if (newPageTabs.length === 0) {
        setOpenedPageTabs([]);
        navigate('/');
        return;
      }
      setOpenedPageTabs(newPageTabs);
      const newTabKey = last(newPageTabs).key;
      navigate(newTabKey);
    }

    console.log('openedPageTabs: ', openedPageTabs);
    if (+e.key === MoreTabEnum.CloseLeft) {
      const idx = openedPageTabs.findIndex((v) => v.key === curPath);
      console.log('idx-left: ', idx);
      const newPageTabs = openedPageTabs.filter((_, index) => index >= idx);
      if (idx < 0 || newPageTabs.length === 0) {
        setOpenedPageTabs([]);
        navigate('/');
        return;
      }
      setOpenedPageTabs(newPageTabs);
      const newTabKey = head(newPageTabs).key;
      navigate(newTabKey);
    }

    if (+e.key === MoreTabEnum.CloseRight) {
      const idx = openedPageTabs.findIndex((v) => v.key === curPath);
      const newPageTabs = openedPageTabs.filter((_, index) => index <= idx);
      console.log('idx-right: ', idx);
      if (idx < 0 || newPageTabs.length === 0) {
        setOpenedPageTabs([]);
        navigate('/');
        return;
      }
      setOpenedPageTabs(newPageTabs);
      const newTabKey = last(newPageTabs).key;
      navigate(newTabKey);
    }

    if (+e.key === MoreTabEnum.CloseOthers) {
      const newPageTabs = openedPageTabs.filter((v) => v.key === curPath);
      setOpenedPageTabs(newPageTabs);
      return;
    }

    if (+e.key === MoreTabEnum.CloseAll) {
      setOpenedPageTabs([]);
      setOpenedPageTabs([]);
      navigate('/');
      return;
    }
  };

  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      openOperate.set(nextOpen);
    }
  };

  const [isFullscreen, { toggleFullscreen }] = useFullscreen(() => document.documentElement);

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
