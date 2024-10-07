import { QuestionCircleOutlined, SkinOutlined } from '@ant-design/icons';
import { useBoolean } from 'ahooks';
import {
  ColorPicker,
  Divider,
  Drawer,
  InputNumber,
  Row,
  Space,
  SpaceProps,
  Switch,
  Tooltip,
  TooltipProps,
  Typography,
  TypographyProps,
} from 'antd';
import { append, cond, equals, filter, pipe, uniq } from 'ramda';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

import { ThemeMode, useMenuStore, useThemeConfigStore } from '@/store/global';

const SwitchSkinIcon = () => {
  const skinDrawerRef = useRef<SkinDrawerRefProps>(null);

  return (
    <>
      <SkinOutlined
        onClick={() => skinDrawerRef.current?.openModal()}
        className="text-size-[22px] cursor-pointer"
      />
      <SkinDrawer ref={skinDrawerRef} />
    </>
  );
};

type SkinDrawerProps = Record<string, any>;
type SkinDrawerRefProps = {
  openModal: () => void;
};

enum SkinConfigEnum {
  MenuSplit,
  SideBarReverseColor,
  HeadReverseColor,
  //
  ThemeColor,
  DarkMode,
  GrayMode,
  WeakColorMode,
  CompactThemeMode,
  RadiusSizeSetting,
  //
  MenuFold,
  MenuAccordion,
  Watermark,
  Breadcrumb,
  BreadcrumbIcon,
  WorkTab,
  WorkTabIcon,
  Footer,
}

const SkinDrawer = forwardRef<SkinDrawerRefProps, SkinDrawerProps>(
  function SkinDrawerContent(props, ref) {
    const [open, openOperate] = useBoolean();

    const { colorPrimary, setThemeMode, themeAlgoMode } = useThemeConfigStore();

    useImperativeHandle(ref, () => ({
      openModal: openOperate.setTrue,
    }));

    const layoutSettingList: SettingItem[] = [
      {
        key: SkinConfigEnum.MenuSplit,
        label: '菜单分割',
      },
      {
        key: SkinConfigEnum.SideBarReverseColor,
        label: '侧边栏反转色',
      },
      {
        key: SkinConfigEnum.HeadReverseColor,
        label: '头部反转色',
      },
    ];

    const { setColorPrimary, setBorderRadius } = useThemeConfigStore();

    const globalThemeList: SettingItem[] = [
      {
        key: SkinConfigEnum.ThemeColor,
        label: '主题颜色',
        customContent: (
          <ColorPicker
            value={colorPrimary}
            onChange={(c) => setColorPrimary(c.toHexString())}
            defaultValue="#1677ff"
          />
        ),
      },
      {
        key: SkinConfigEnum.DarkMode,
        label: '暗黑模式',
        value: themeAlgoMode.includes('dark'),
      },
      {
        key: SkinConfigEnum.GrayMode,
        label: '灰色模式',
      },
      {
        key: SkinConfigEnum.WeakColorMode,
        label: '色弱模式',
      },
      {
        key: SkinConfigEnum.CompactThemeMode,
        label: '紧凑主题',
        value: themeAlgoMode.includes('compact'),
      },
      {
        key: SkinConfigEnum.RadiusSizeSetting,
        label: '圆角大小',
        customContent: (
          <InputNumber
            min={0}
            onChange={(value) => setBorderRadius(value)}
            defaultValue={6}
            suffix="px"
          />
        ),
      },
    ];

    const { isMenuCollapsed, setIsMenuCollapsed } = useMenuStore();

    const {
      setIsUseAccordion,
      isUseAccordion,

      setIsShowWatermark,
      isShowWatermark,

      setIsShowBreadcrumb,
      isShowBreadcrumb,

      setIsShowBreadcrumbIcon,
      isShowBreadcrumbIcon,

      setIsUseWorkTab,
      isUseWorkTab,

      setIsUseWorkTabIcon,
      isUseWorkTabIcon,

      setIsShowFooter,
      isShowFooter,
    } = useThemeConfigStore();

    const configMap = {
      [SkinConfigEnum.MenuFold]: setIsMenuCollapsed,
      [SkinConfigEnum.MenuAccordion]: setIsUseAccordion,
      [SkinConfigEnum.Watermark]: setIsShowWatermark,
      [SkinConfigEnum.Breadcrumb]: setIsShowBreadcrumb,
      [SkinConfigEnum.BreadcrumbIcon]: setIsShowBreadcrumbIcon,
      [SkinConfigEnum.WorkTab]: setIsUseWorkTab,
      [SkinConfigEnum.WorkTabIcon]: setIsUseWorkTabIcon,
      [SkinConfigEnum.Footer]: setIsShowFooter,
    };

    const uiSettingList: SettingItem[] = [
      {
        key: SkinConfigEnum.MenuFold,
        label: '菜单折叠',
        value: isMenuCollapsed,
      },
      {
        key: SkinConfigEnum.MenuAccordion,
        label: '菜单手风琴',
        value: isUseAccordion,
      },
      {
        key: SkinConfigEnum.Watermark,
        label: '水印',
        value: isShowWatermark,
      },
      {
        key: SkinConfigEnum.Breadcrumb,
        label: '面包屑',
        value: isShowBreadcrumb,
      },
      {
        key: SkinConfigEnum.BreadcrumbIcon,
        label: '面包屑图标',
        value: isShowBreadcrumbIcon,
      },
      {
        key: SkinConfigEnum.WorkTab,
        label: '标签栏',
        value: isUseWorkTab,
      },
      {
        key: SkinConfigEnum.WorkTabIcon,
        label: '标签栏图标',
        value: isUseWorkTabIcon,
      },
      {
        key: SkinConfigEnum.Footer,
        label: '页脚',
        value: isShowFooter,
      },
    ];

    const handleSwitchChange = (key: SkinConfigEnum, checked: boolean) => {
      if (key === SkinConfigEnum.DarkMode) {
        const algorithm = cond([
          [
            equals(true),
            () =>
              pipe(
                filter((v) => v !== 'default'),
                append('dark'),
                uniq,
              )(themeAlgoMode),
          ],
          [
            equals(false),
            () =>
              pipe(
                filter((v) => v !== 'dark'),
                append('default'),
                uniq,
              )(themeAlgoMode),
          ],
        ])(checked);

        setThemeMode(algorithm as ThemeMode[]);
      }

      if (key === SkinConfigEnum.CompactThemeMode) {
        const algorithm = cond([
          [equals(true), () => pipe(append('compact'), uniq)(themeAlgoMode)],
          [
            equals(false),
            () =>
              pipe(
                filter((v) => v !== 'compact'),
                // uniq,
              )(themeAlgoMode),
          ],
        ])(checked);

        setThemeMode(algorithm as ThemeMode[]);
      }

      const setConfigFn = configMap[key];
      setConfigFn?.(checked);
    };

    return (
      <Drawer open={open} onClose={openOperate.setFalse} title="主题配置">
        <SettingSection onChange={handleSwitchChange} title="布局样式" list={layoutSettingList} />
        <SettingSection onChange={handleSwitchChange} title="全局主题" list={globalThemeList} />
        <SettingSection onChange={handleSwitchChange} title="界面设置" list={uiSettingList} />
      </Drawer>
    );
  },
);

type TextTipProps = React.PropsWithChildren & {
  spaceProps?: SpaceProps;
  typographyProps?: TypographyProps;
  toolTipProps?: TooltipProps;
  iconChildren?: React.ReactNode;
  tipText: React.ReactNode;
};

function TextTip({
  children,
  tipText,
  iconChildren,
  spaceProps,
  typographyProps,
  toolTipProps,
}: TextTipProps) {
  return (
    <Space size="small" {...spaceProps}>
      <Typography.Text {...typographyProps}>{children}</Typography.Text>
      <Tooltip title={tipText} {...toolTipProps}>
        {iconChildren ?? <QuestionCircleOutlined />}
      </Tooltip>
    </Space>
  );
}

type SettingItem = {
  value?: boolean;
  key: SkinConfigEnum;
  label: React.ReactNode;
  tipText?: string;
  checkedChildren?: string;
  uncheckedChildren?: string;
  customContent?: React.ReactNode;
};

type SettingSectionProps = {
  title: React.ReactNode;
  list: SettingItem[];
  onChange?: (key: string | number, value: boolean) => void;
};

function SettingSection(props: SettingSectionProps) {
  const { title, list, onChange } = props;
  return (
    <>
      <Divider>{title}</Divider>
      <Space direction="vertical" size="middle" className="w-full">
        {list.map((setting) => {
          const {
            label,
            tipText,
            key,
            customContent,
            checkedChildren = '开启',
            uncheckedChildren = '关闭',
            value,
          } = setting;
          return (
            <Row key={key} justify-between>
              <TextTip tipText={tipText ?? label}>{label}</TextTip>
              {customContent ?? (
                <Switch
                  value={value}
                  onChange={(checked) => onChange(key, checked)}
                  checkedChildren={checkedChildren}
                  unCheckedChildren={uncheckedChildren}
                />
              )}
            </Row>
          );
        })}
      </Space>
    </>
  );
}

export default SwitchSkinIcon;
