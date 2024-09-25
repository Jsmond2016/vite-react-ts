import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { theme } from 'antd';

import { useThemeConfigStore } from '@/store/global';

const ToggleTheme = () => {
  const { themeAlgorithm, setThemeMode } = useThemeConfigStore();
  return themeAlgorithm === theme.darkAlgorithm ? (
    <SunOutlined
      className="text-size-[22px] cursor-pointer"
      onClick={() => setThemeMode('default')}
    />
  ) : (
    <MoonOutlined
      className="text-size-[22px] cursor-pointer"
      onClick={() => setThemeMode('dark')}
    />
  );
};

export default ToggleTheme;
