import { create } from 'zustand';

import { GlobalLanguage, GlobalSpaceEnum } from '@/constants';

type IActions = {
  setFullScreen: (mode: boolean) => void;
  setGlobalSpace: (space: GlobalSpaceEnum) => void;
  setGlobalLanguage: (lang: GlobalLanguage) => void;
};

const initState = {
  isFullScreen: false,
  curSpace: GlobalSpaceEnum.Default,
  curLanguage: GlobalLanguage.CN,
};

export const useTopToolBarStore = create<IActions & typeof initState>((set) => ({
  ...initState,
  setFullScreen: (mode: boolean) => set(() => ({ isFullScreen: mode })),
  setGlobalSpace: (space: GlobalSpaceEnum) => set(() => ({ curSpace: space })),
  setGlobalLanguage: (newLanguage) => set(() => ({ curLanguage: newLanguage })),
}));
