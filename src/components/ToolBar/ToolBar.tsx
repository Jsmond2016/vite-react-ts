import {
  BellOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  PicRightOutlined,
  SearchOutlined,
  SkinOutlined,
  TranslationOutlined,
} from '@ant-design/icons';
import { useBoolean } from 'ahooks';
import { Badge, Divider, Space } from 'antd';
import React from 'react';

import avatar from '@/assets/vue-color-avatar.png';

const ToolBar = () => {
  const [isBigScreen, bigScreenOperate] = useBoolean();

  return (
    <Space size="middle">
      <PicRightOutlined className="text-size-[22px] cursor-pointer" />
      <TranslationOutlined className="text-size-[22px] cursor-pointer" />
      <SearchOutlined className="text-size-[22px] cursor-pointer" />
      <SkinOutlined className="text-size-[22px] cursor-pointer" />
      <Badge count={5}>
        <BellOutlined className="text-size-[22px] cursor-pointer" />
      </Badge>
      {isBigScreen ? (
        <FullscreenExitOutlined
          onClick={bigScreenOperate.toggle}
          className="text-size-[22px] cursor-pointer"
        />
      ) : (
        <FullscreenOutlined
          onClick={bigScreenOperate.toggle}
          className="text-size-[22px] cursor-pointer"
        />
      )}
      <Divider type="vertical" />
      <Space size="middle" align="center" justify-center>
        <span className="font-bold">Admin</span>
        <img src={avatar} alt="avatar" className="flex w-[38px] rounded-full cursor-pointer" />
      </Space>
    </Space>
  );
};

export default ToolBar;
