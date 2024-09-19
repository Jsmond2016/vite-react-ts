import {
  BellOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  PicRightOutlined,
  SearchOutlined,
  SkinOutlined,
  TranslationOutlined,
} from '@ant-design/icons';
import { Badge, Divider, Space } from 'antd';

import avatar from '@/assets/vue-color-avatar.png';
import { useMenuStore } from '@/store/global';

const ToolBar = () => {
  const { isFullScreen, setFullScreen } = useMenuStore();

  return (
    <Space size="middle">
      <PicRightOutlined className="text-size-[22px] cursor-pointer" />
      <TranslationOutlined className="text-size-[22px] cursor-pointer" />
      <SearchOutlined className="text-size-[22px] cursor-pointer" />
      <SkinOutlined className="text-size-[22px] cursor-pointer" />
      <Badge count={5}>
        <BellOutlined className="text-size-[22px] cursor-pointer" />
      </Badge>
      {isFullScreen ? (
        <FullscreenExitOutlined
          onClick={() => setFullScreen(!isFullScreen)}
          className="text-size-[22px] cursor-pointer"
        />
      ) : (
        <FullscreenOutlined
          onClick={() => setFullScreen(!isFullScreen)}
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
