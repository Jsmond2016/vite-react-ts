import { useEffect, useRef } from 'react';

export function useUpdate(cb: () => void) {
  const hasMounted = useRef(false);
  console.log('render');

  // 这个 useEffect 顺序必须在前面
  useEffect(() => {
    console.log('hasMounted', hasMounted.current);
    if (hasMounted.current) {
      cb();
    }
  });

  useEffect(() => {
    hasMounted.current = true;
    return () => {
      hasMounted.current = false;
    };
  }, []);
}
