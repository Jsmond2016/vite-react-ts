import { create } from 'zustand';

type IActions = {
  toggleMenuOpenStatus: () => void;
  setMenuList: (_menuList: any[]) => void;
  setOpenedMenuKeys: (_openedMenuKeys: string[]) => void;
  setCurOpenedMenuItems: (_openedMenu: any) => void;
};

const initState = {
  isMenuClosed: false,
  menuList: [],
  openedMenuKeys: [],
  curOpenedMenuItems: [],
};

export const useMenuStore = create<IActions & typeof initState>((set) => ({
  ...initState,
  toggleMenuOpenStatus: () => set((state) => ({ isMenuClosed: !state.isMenuClosed })),
  setMenuList: (_menuList: any[]) => set(() => ({ menuList: _menuList })),
  setOpenedMenuKeys: (_openedMenuKeys: string[]) =>
    set(() => {
      return { openedMenuKeys: _openedMenuKeys };
    }),
  setCurOpenedMenuItems: (curMenuItems) => set(() => ({ curOpenedMenuItems: curMenuItems })),
}));
