import { last, prop } from 'ramda';
import { create } from 'zustand';
// import { devtools, persist } from 'zustand/middleware';

type IActions = {
  setIsMenuCollapsed: () => void;
  setMenuList: (_menuList: any[]) => void;
  setOpenedMenuKeys: (_openedMenuKeys: string[]) => void;
  setCurOpenedMenuItems: (_openedMenu: any) => void;
  setOpenedPageTabs: (pageTabs: any) => void;
  setCurTabKey: (key: string) => void;
};

const initState = {
  isMenuCollapsed: false,
  menuList: [],
  openedMenuKeys: [],
  curOpenedMenuItems: [],
  openedPageTabs: [],
  curTabKey: '',
};

export const useMenuStore = create<IActions & typeof initState>()(
  // devtools(
  // FIXME: bug， 这里使用后，重启项目打开页面报错
  // GPT: 确保你存储在 Zustand 状态中的数据是可以被 React 渲染的。避免将复杂的对象（如 React 组件、DOM 节点等）存储在状态中。
  // 如果问题依然存在，尝试清除 localStorage，看看是否是因为存储了旧数据导致的问题。
  // persist(
  (set) => ({
    ...initState,
    setIsMenuCollapsed: () => set((state) => ({ isMenuCollapsed: !state.isMenuCollapsed })),
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
  }),
  //     {
  //       name: 'menuConfig',
  //     },
  //   ),
  // ),
);
