import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { append, filter, pipe, uniq } from 'ramda';

import { ThemeMode, useThemeConfigStore } from '@/store/global';

const ToggleTheme = () => {
  const { themeAlgoMode, setThemeMode } = useThemeConfigStore();
  return themeAlgoMode.includes('dark') ? (
    <SunOutlined
      className="text-size-[22px] cursor-pointer"
      onClick={() => {
        const newAl = pipe(
          filter((v) => v !== 'dark'),
          append('default'),
          uniq,
        )(themeAlgoMode);
        setThemeMode(newAl as ThemeMode[]);
      }}
    />
  ) : (
    <MoonOutlined
      className="text-size-[22px] cursor-pointer"
      onClick={() => {
        const newAl = pipe(
          filter((v) => v !== 'default'),
          append('dark'),
          uniq,
        )(themeAlgoMode);
        setThemeMode(newAl as ThemeMode[]);
      }}
    />
  );
};

export default ToggleTheme;
