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
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

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

const SkinDrawer = forwardRef<SkinDrawerRefProps, SkinDrawerProps>(
  function SkinDrawerContent(props, ref) {
    const [open, openOperate] = useBoolean();

    useImperativeHandle(ref, () => ({
      openModal: openOperate.setTrue,
    }));

    const layoutSettingList: SettingItem[] = [
      {
        label: '菜单分割',
      },
      {
        label: '侧边栏反转色',
      },
      {
        label: '头部反转色',
      },
      {
        label: '菜单分割',
      },
    ];

    const globalThemeList: SettingItem[] = [
      {
        label: '主题颜色',
        customContent: <ColorPicker defaultValue="#1677ff" />,
      },
      {
        label: '暗黑模式',
      },
      {
        label: '灰色模式',
      },
      {
        label: '色弱模式',
      },
      {
        label: '紧凑主题',
      },
      {
        label: '圆角大小',
        customContent: <InputNumber min={0} defaultValue={6} suffix="px" />,
      },
    ];

    const uiSettingList: SettingItem[] = [
      {
        label: '菜单折叠',
      },
      {
        label: '菜单手风琴',
      },
      {
        label: '水印',
      },
      {
        label: '面包屑',
      },
      {
        label: '面包屑图标',
      },
      {
        label: '标签栏',
      },
      {
        label: '标签栏图标',
      },
      {
        label: '页脚',
      },
    ];

    return (
      <Drawer open={open} onClose={openOperate.setFalse} title="主题配置">
        <SettingSection title="布局样式" list={layoutSettingList} />
        <SettingSection title="全局主题" list={globalThemeList} />
        <SettingSection title="界面设置" list={uiSettingList} />
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
  label: React.ReactNode;
  tipText?: string;
  checkedChildren?: string;
  uncheckedChildren?: string;
  customContent?: React.ReactNode;
};

type SettingSectionProps = {
  title: React.ReactNode;
  list: SettingItem[];
};

function SettingSection(props: SettingSectionProps) {
  const { title, list } = props;
  return (
    <>
      <Divider>{title}</Divider>
      <Space direction="vertical" size="middle" className="w-full">
        {list.map((setting, key) => {
          const {
            label,
            tipText,
            customContent,
            checkedChildren = '开启',
            uncheckedChildren = '关闭',
          } = setting;
          return (
            <Row key={key} justify-between>
              <TextTip tipText={tipText ?? label}>{label}</TextTip>
              {customContent ?? (
                <Switch checkedChildren={checkedChildren} unCheckedChildren={uncheckedChildren} />
              )}
            </Row>
          );
        })}
      </Space>
    </>
  );
}

export default SwitchSkinIcon;
