import '@/assets/style/reset.css';
import '@/assets/style/gloab.scss';
import 'uno.css';

import { ConfigProvider } from 'antd';
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

const Root = () => {
  const { themeAlgorithm, colorPrimary, borderRadius } = useThemeConfigStore();
  console.log('colorPrimary: ', colorPrimary);

  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          // 1. 单独使用暗色算法
          algorithm: themeAlgorithm,
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
