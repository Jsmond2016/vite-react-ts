import { theme } from 'antd';
import { create } from 'zustand';

type ThemeMode = 'default' | 'dark' | 'compact';

type IActions = {
  // setGlobalSpace: (space: GlobalSpaceEnum) => void;
  setThemeMode: (mode: ThemeMode) => void;
  setColorPrimary: (color: string) => void;
  setBorderRadius: (size: number) => void;
};
const themeTokenMap = {
  default: theme.defaultAlgorithm,
  dark: theme.darkAlgorithm,
  compact: theme.compactAlgorithm,
};

const initState = {
  themeAlgorithm: themeTokenMap['default'],
  colorPrimary: '#1677ff',
  borderRadius: 6,
};

export const useThemeConfigStore = create<IActions & typeof initState>((set) => ({
  ...initState,
  setThemeMode: (mode: ThemeMode) => set(() => ({ themeAlgorithm: themeTokenMap[mode] })),
  setColorPrimary: (color: string) => set(() => ({ colorPrimary: color })),
  setBorderRadius: (size: number) => set(() => ({ borderRadius: size })),
}));
