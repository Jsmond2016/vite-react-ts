import { useEffect } from 'react';

/**
 * 写一个心跳组件，考察 setTimeout 的使用，以及知道为什么不使用 setInterval
 *
 */
const Index = () => {
  useEffect(() => {
    let timer: any = 0;
    const fn = () => {
      console.log('hello');
      timer = setTimeout(fn, 1000);
    };
    timer = setTimeout(fn);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <p>心跳</p>
    </div>
  );
};

export default Index;
