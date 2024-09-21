import { TranslationOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import React from 'react';

import { GlobalLanguage, GlobalLanguageOptions } from '@/constants';
import { useTopToolBarStore } from '@/store/global';

const ToggleLanguageIcon = () => {
  const { curLanguage, setGlobalLanguage } = useTopToolBarStore();

  const items: MenuProps['items'] = [
    {
      key: GlobalLanguage.CN,
      label: GlobalLanguageOptions[GlobalLanguage.CN],
    },
    {
      key: GlobalLanguage.Eng,
      label: GlobalLanguageOptions[GlobalLanguage.Eng],
    },
  ].map((v) => ({
    ...v,
    disabled: curLanguage === v.key,
    onClick: ({ key }) => setGlobalLanguage(+key as GlobalLanguage),
  }));

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <TranslationOutlined className="text-size-[22px] cursor-pointer" />
    </Dropdown>
  );
};

export default ToggleLanguageIcon;
