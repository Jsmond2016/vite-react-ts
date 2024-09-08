import { create } from 'zustand';

type IActions = {
  toggleMenuOpenStatus: () => void;
};

const initState = {
  isMenuClosed: false,
};

export const useMenuStore = create<IActions & typeof initState>((set) => ({
  ...initState,
  toggleMenuOpenStatus: () => set((state) => ({ isMenuClosed: !state.isMenuClosed })),
}));
