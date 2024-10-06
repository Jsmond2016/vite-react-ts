import { Watermark } from 'antd';
import { useRoutes } from 'react-router-dom';

import route from '@/router';

import { useThemeConfigStore } from './store/global';
// import "antd/dist/antd.css"

const Index = () => {
  // outlet 等同 Vue 中的 router-view
  const outlet = useRoutes(route);
  const { isShowWatermark } = useThemeConfigStore();

  const childEle = <div className="App">{outlet}</div>;

  if (!isShowWatermark) {
    return childEle;
  }
  return <Watermark content="Ant Design">{childEle}</Watermark>;
};
export default Index;
