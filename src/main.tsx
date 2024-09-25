import '@/assets/style/reset.css';
import '@/assets/style/gloab.scss';
import 'uno.css';

import { ConfigProvider, theme } from 'antd';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import store from './store';
import { useThemeConfigStore } from './store/global';

const module = import.meta.glob('./mocks/browser.js');

if (process.env.NODE_ENV === 'development') {
  module['./mocks/browser.js']().then((mod) => {
    const { mocker } = mod as any;
    mocker.start();
  });
}

const themeTokenMap = {
  default: theme.defaultAlgorithm,
  dark: theme.darkAlgorithm,
  compact: theme.compactAlgorithm,
};

const Root = () => {
  const { themeAlgoMode, colorPrimary, borderRadius } = useThemeConfigStore();

  // NOTE: 测试发现，主题排序-必须这么写，default 必须在前面，不然 compact, default 无效；
  const order = ['default', 'dark', 'compact'];
  const algorithm = themeAlgoMode
    .toSorted((a, b) => order.indexOf(a) - order.indexOf(b))
    .map((v) => themeTokenMap[v]);

  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          // 1. 单独使用暗色算法
          algorithm: algorithm,
          // 2. 组合使用暗色算法与紧凑算法
          // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
          token: {
            colorPrimary,
            borderRadius,
          },
        }}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
