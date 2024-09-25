import { Divider, Space } from 'antd';

import avatar from '@/assets/vue-color-avatar.png';

import NotificationIcon from './components/NotificationIcon';
import SearchMenuIcon from './components/SearchMenuIcon';
import SwitchSkinIcon from './components/SwitchSkinIcon';
import ToggleFullScreen from './components/ToggleFullScreen';
import ToggleLanguageIcon from './components/ToggleLanguageIcon';
import ToggleSpaceIcon from './components/ToggleSpaceIcon';
import ToggleTheme from './components/ToggleTheme';

const ToolBar = () => {
  return (
    <Space size="middle">
      <ToggleSpaceIcon />
      <ToggleLanguageIcon />
      <SearchMenuIcon />
      <SwitchSkinIcon />
      <ToggleTheme />
      <NotificationIcon />
      <ToggleFullScreen />
      <Divider type="vertical" />
      <Space size="middle" align="center" justify-center>
        <span className="font-bold">Admin</span>
        <img src={avatar} alt="avatar" className="flex w-[38px] rounded-full cursor-pointer" />
      </Space>
    </Space>
  );
};

export default ToolBar;
