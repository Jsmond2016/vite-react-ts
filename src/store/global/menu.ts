import { last, prop } from 'ramda';
import { create } from 'zustand';

type IActions = {
  toggleMenuOpenStatus: () => void;
  setMenuList: (_menuList: any[]) => void;
  setOpenedMenuKeys: (_openedMenuKeys: string[]) => void;
  setCurOpenedMenuItems: (_openedMenu: any) => void;
  setOpenedPageTabs: (pageTabs: any) => void;
  setCurTabKey: (key: string) => void;
};

const initState = {
  isMenuClosed: false,
  menuList: [],
  openedMenuKeys: [],
  curOpenedMenuItems: [],
  openedPageTabs: [],
  curTabKey: '',
};

export const useMenuStore = create<IActions & typeof initState>((set) => ({
  ...initState,
  toggleMenuOpenStatus: () => set((state) => ({ isMenuClosed: !state.isMenuClosed })),
  setMenuList: (_menuList: any[]) => set(() => ({ menuList: _menuList })),
  setOpenedMenuKeys: (_openedMenuKeys: string[]) =>
    set(() => {
      return { openedMenuKeys: _openedMenuKeys };
    }),
  setCurOpenedMenuItems: (curMenuItems) =>
    set((state) => {
      const { openedPageTabs } = state;
      let menuItemsState: any = { curOpenedMenuItems: curMenuItems };
      const openedTabKeys = openedPageTabs.map(prop('key'));
      const lastMenuItem: any = last(curMenuItems);
      if (lastMenuItem) {
        menuItemsState = {
          ...menuItemsState,
          curTabKey: lastMenuItem?.key,
        };
        if (!openedTabKeys.includes(lastMenuItem?.key)) {
          menuItemsState = {
            ...menuItemsState,
            openedPageTabs: [...openedPageTabs, lastMenuItem].filter((v) => v.isAccessed),
          };
        }
      }
      return menuItemsState;
    }),
  setOpenedPageTabs: (newWorkTabs: any[]) =>
    set(() => {
      if (newWorkTabs.length === 0) {
        return {
          openedPageTabs: [],
          curTabKey: undefined,
        };
      }
      const tabKey = last(newWorkTabs).key;
      return { openedPageTabs: newWorkTabs, curTabKey: tabKey };
    }),
  setCurTabKey: (tabKey: string) => set(() => ({ curTabKey: tabKey })),
}));
