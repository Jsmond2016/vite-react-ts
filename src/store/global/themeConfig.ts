import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type ThemeMode = 'default' | 'dark' | 'compact';

type IActions = {
  setThemeMode: (mode: ThemeMode[]) => void;
  setColorPrimary: (color: string) => void;
  setBorderRadius: (size: number) => void;
  //
  setIsFoldMenu: (foldMenu: boolean) => void; // 菜单折叠
  setIsUseAccordion: (useAccordion: boolean) => void; // 手风琴
  setIsShowWatermark: (waterMark: boolean) => void; // 水印

  setIsShowBreadcrumb: (showBreadcrumb: boolean) => void; // 面包屑
  setIsShowBreadcrumbIcon: (showBreadIcon: boolean) => void; // 面包屑图标

  setIsUseWorkTab: (isUseWorkTab: boolean) => void; // 是否使用标签栏
  setIsUseWorkTabIcon: (isUseWorkTabIcon: boolean) => void; // 是否使用标签栏图标

  setIsShowFooter: (showFooter: boolean) => void; // 页脚
};

const initState = {
  // 布局样式-todo

  // 全局主题
  themeAlgoMode: ['default'],
  colorPrimary: '#1677ff',
  borderRadius: 6,

  // 界面设置
  isFoldMenu: false, // 菜单折叠
  isUseAccordion: false, // 手风琴
  isShowWatermark: true, // 水印

  isShowBreadcrumb: true, // 面包屑
  isShowBreadcrumbIcon: true, // 面包屑图标

  isUseWorkTab: true, // 是否使用标签栏
  isUseWorkTabIcon: true, // 是否使用标签栏图标

  isShowFooter: true, // 页脚
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

        setIsFoldMenu: (t: boolean) => set(() => ({ isFoldMenu: t })),
        setIsUseAccordion: (t: boolean) => set(() => ({ isUseAccordion: t })),
        setIsShowWatermark: (t: boolean) => set(() => ({ isShowWatermark: t })),
        setIsShowBreadcrumb: (t: boolean) => set(() => ({ isShowBreadcrumb: t })),
        setIsShowBreadcrumbIcon: (t: boolean) => set(() => ({ isShowBreadcrumbIcon: t })),
        setIsUseWorkTab: (t: boolean) => set(() => ({ isUseWorkTab: t })),
        setIsUseWorkTabIcon: (t: boolean) => set(() => ({ isUseWorkTabIcon: t })),
        setIsShowFooter: (t: boolean) => set(() => ({ isShowFooter: t })),
      }),

      {
        name: 'themeConfig',
      },
    ),
  ),
);
