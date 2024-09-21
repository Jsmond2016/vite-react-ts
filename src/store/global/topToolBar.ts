import { create } from 'zustand';

import { GlobalLanguage, GlobalSpaceEnum } from '@/constants';

type IActions = {
  setGlobalSpace: (space: GlobalSpaceEnum) => void;
  setGlobalLanguage: (lang: GlobalLanguage) => void;
};

const initState = {
  curSpace: GlobalSpaceEnum.Default,
  curLanguage: GlobalLanguage.CN,
};

export const useTopToolBarStore = create<IActions & typeof initState>((set) => ({
  ...initState,
  setGlobalSpace: (space: GlobalSpaceEnum) => set(() => ({ curSpace: space })),
  setGlobalLanguage: (newLanguage) => set(() => ({ curLanguage: newLanguage })),
}));
