import { PicRightOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';

import { GlobalSpaceEnum, GlobalSpaceEnumOptions } from '@/constants';
import { useMenuStore } from '@/store/global';

const ToggleSpaceIcon = () => {
  const { curSpace, setGlobalSpace } = useMenuStore();

  const items: MenuProps['items'] = [
    {
      key: GlobalSpaceEnum.Default,
      label: GlobalSpaceEnumOptions[GlobalSpaceEnum.Default],
    },
    {
      key: GlobalSpaceEnum.Big,
      label: GlobalSpaceEnumOptions[GlobalSpaceEnum.Big],
    },
    {
      key: GlobalSpaceEnum.Small,
      label: GlobalSpaceEnumOptions[GlobalSpaceEnum.Small],
    },
  ].map((v) => ({
    ...v,
    disabled: curSpace === v.key,
    onClick: ({ key }) => setGlobalSpace(+key as GlobalSpaceEnum),
  }));

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <PicRightOutlined className="text-size-[22px] cursor-pointer" />
    </Dropdown>
  );
};

export default ToggleSpaceIcon;
