import { useRoutes } from 'react-router-dom';

import route from '@/router';
// import "antd/dist/antd.css"

const Index = () => {
  // outlet 等同 Vue 中的 router-view
  const outlet = useRoutes(route);
  return <div className="App">{outlet}</div>;
};
export default Index;
