import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type ThemeMode = 'default' | 'dark' | 'compact';

type IActions = {
  setThemeMode: (mode: ThemeMode[]) => void;
  setColorPrimary: (color: string) => void;
  setBorderRadius: (size: number) => void;
};

const initState = {
  themeAlgoMode: ['default'],
  colorPrimary: '#1677ff',
  borderRadius: 6,
};

export const useThemeConfigStore = create<IActions & typeof initState>()(
  devtools(
    persist(
      (set) => ({
        ...initState,
        setThemeMode: (newThemeAlgorithm: ThemeMode[]) =>
          set(() => ({ themeAlgoMode: newThemeAlgorithm })),
        setColorPrimary: (color: string) => set(() => ({ colorPrimary: color })),
        setBorderRadius: (size: number) => set(() => ({ borderRadius: size })),
      }),
      {
        name: 'themeConfig',
      },
    ),
  ),
);
