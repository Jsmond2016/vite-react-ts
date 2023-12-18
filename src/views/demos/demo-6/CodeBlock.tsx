import 'highlight.js/styles/atom-one-dark.css';

import { Button } from 'antd';
import Clipboard from 'clipboard';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import hljs from './hljs';

// eslint-disable-next-line react/display-name
const CodeBlock = forwardRef<{ highlightBlock: () => void }, any>(
  ({ language, code }, ref) => {
    console.log('code: ', code);
    const preRef = useRef<HTMLElement>(null);
    const [copied, setCopied] = useState(false);

    const highlightBlock = () => {
      if (preRef.current) {
        // refer: https://github.com/highlightjs/highlight.js/commit/3987abe437dbf962d64a51da6282d9c9bc20fc13
        preRef.current.removeAttribute('data-highlighted');
        hljs.highlightBlock(preRef.current);

        // 创建 clipboard 实例并保存到变量中
        const clipboard = new Clipboard(`#${language}copy_btn`, {
          text: () => code,
        });

        // 监听复制成功事件
        clipboard.on('success', () => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });

        // 销毁 clipboard 实例
        return () => {
          clipboard.destroy();
        };
      }
    };

    useImperativeHandle(ref, () => ({
      highlightBlock,
    }));

    useEffect(() => {
      hljs.initHighlightingOnLoad();
    }, []);

    return (
      <div className="code-block" style={{ position: 'relative', marginTop: 8 }}>
        {/* <pre className="theme-atom-one-dark  shadow-3xl text-sm relative overflow-hidden max-w-full tab-size h-full"> */}
        <pre className="theme-atom-one-dark  shadow-3xl text-sm relative overflow-hidden max-w-full tab-size h-full">
          <code
            id={language}
            ref={preRef}
            className={`${language} font-mono text-base`}
            style={{ minHeight: '800px' }}
          >
            {code}
          </code>
        </pre>
        {!!preRef.current && (
          <Button
            id={`${language}copy_btn`}
            style={{ position: 'absolute', top: 4, right: 4, lineHeight: '14px' }}
            className="code-block__button"
            data-clipboard-target={`#${language}`}
          >
            {copied ? '已复制' : '复制'}
          </Button>
        )}
      </div>
    );
  },
);

export default CodeBlock;
