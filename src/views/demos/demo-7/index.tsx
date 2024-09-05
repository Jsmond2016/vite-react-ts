import { useBoolean, useDebounce, useDebounceEffect } from 'ahooks';
import { Button, Divider, Input, Space, Spin, Typography } from 'antd';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { loadable } from 'jotai/utils'; // https://jotai.jscn.org/docs/utils/loadable
import { useEffect, useState } from 'react';

// import AsyncJotaiDemo from './AsyncJotaiDemo';
import { useUpdate } from './useUpadte';

const storeAtom = atom({
  name: '111',
  age: 10,
});

const NormalJotai = () => {
  const storeAtomValue = useAtomValue(storeAtom);
  console.log('storeAtom', storeAtomValue);
  const [value, setValue] = useAtom(storeAtom);
  const handleClick = () => {
    setValue({ name: value.name + '1', age: value.age + 10 });
  };
  return (
    <Space>
      <Space direction="vertical">
        <Typography.Text>age: {value.age}</Typography.Text>
        <Typography.Text>name: {value.name}</Typography.Text>
        <Button onClick={() => handleClick()}>click</Button>
      </Space>
    </Space>
  );
};

// ===============================

// const asyncIncrementAtom = atom(null, async (get, set) => {
//   // await something
//   set(countAtom, get(countAtom) + 1);
// });
const baseAsyncAtom = atom(0);
const baseAsyncSetAtom = atom(null, (get, set, updater: number) => {
  console.log('updater: ', updater);
  set(baseAsyncAtom, get(baseAsyncAtom) + updater);
});
const asyncGetAtom = atom<Promise<number>>(async (get) => {
  await delay(300);
  return get(baseAsyncAtom);
});

const loadableAsyncAtom = loadable(asyncGetAtom);

const AsyncJotai = () => {
  const [asyncValue] = useAtom(loadableAsyncAtom);

  const setAsyncAtomValue = useSetAtom(baseAsyncSetAtom);
  console.log('asyncValue', asyncValue);
  const handleClick = () => {
    setAsyncAtomValue(222);
  };
  return (
    <Space direction="vertical">
      {asyncValue.state === 'hasData' ? (
        <Typography>asyncValue: {asyncValue.data}</Typography>
      ) : (
        'loading ...'
      )}
      <Typography.Text>
        异步atom看看这个例子：
        <Typography.Link href="https://codesandbox.io/s/jotai-demo-forked-x2g5d?file=/src/App.js:174-182">
          demo
        </Typography.Link>
      </Typography.Text>
      <Button onClick={handleClick}>async--click</Button>
    </Space>
  );
};

// ==========================

// ---- 学习测试，参考：https://jotai.jscn.org/docs/api/core
const tAtom = atom(0);
const testAtom = atom(
  (get) => get(tAtom) + 1,
  (get, set, updater: number) => {
    // 这里的 updater 是 setAtom(updater) 这里的参数
    console.log('updater', updater);
    // 每次 set 操作都需要对 atom 进行 set，第一个参数必须是 atom
    set(tAtom, updater);
  },
);
const JotaiDemo2 = () => {
  const testValue = useAtomValue(testAtom);
  console.log('testValue', testValue);

  const testSetValue = useSetAtom(testAtom);
  console.log('test-set-value', testValue);

  const handleClick = () => {
    console.log('click');
    // increment();
    testSetValue(testValue + 111);
  };

  return (
    <Space direction="vertical">
      <Button onClick={handleClick}>tAtom--click</Button>
    </Space>
  );
};

// ==========================

const delay = (time: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });

const countAtom = atom(0);
const fetchList = (): Promise<number> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(111);
    }, 2000);
  });
const asyncIncrementAtom = atom(null, async (get, set) => {
  // await something
  console.log('异步执行 async count atom 的 set 操作，等待 2s 可以看到变化的结果');
  const value = await fetchList();
  set(countAtom, get(countAtom) + value);
});

const getCountAtom = atom(async (get) => {
  await delay(500);
  return get(countAtom);
}); // 那就在包一层； refer: https://github.com/pmndrs/jotai/discussions/1082
const countLoadableAtom = loadable(getCountAtom); // NOTE: 只包一层没有效果???

const AsyncJotai3 = () => {
  const increment = useSetAtom(asyncIncrementAtom);
  const [loadableAsyncAtomValue] = useAtom(countLoadableAtom);
  console.log('demo-2 ==> asyncAtomValue: ', loadableAsyncAtomValue); // NOTE: 这里需要使用 useAtomValue 取值;

  const handleClick2 = () => {
    console.log('click-2');
    increment();
  };

  return (
    <Space direction="vertical">
      <Typography.Text>
        loadableAsyncValue--2:{' '}
        {loadableAsyncAtomValue.state !== 'hasData' ? 'loading ...' : loadableAsyncAtomValue.data}
      </Typography.Text>
      <Button onClick={handleClick2}>async-countAtom--click</Button>
    </Space>
  );
};

// 这些直接可以使用 useDebounceEffect 实现
// https://ahooks.js.org/zh-CN/hooks/use-debounce-effect
function DebounceDemo() {
  const [value, setValue] = useState<string>();
  const debouncedValue = useDebounce(value, { wait: 500 });
  const [loading, { setFalse, setTrue }] = useBoolean(false);

  const [apiAnswer, setApiAnswer] = useState<string>();
  console.log('setApiAnswer: ', setApiAnswer);

  const fetchList = (params: Record<string, any>) => {
    setTrue();
    return new Promise((resolve) => {
      console.log('fetchList-params', params);
      setTimeout(() => {
        resolve(`ok--${JSON.stringify(params)}`);
      }, 3000);
    }).finally(() => {
      setFalse();
    });
  };

  useEffect(() => {
    console.log('debouncedValue', debouncedValue);
    if (!debouncedValue) {
      return;
    }
    fetchList({ param: debouncedValue });
    // .then(setApiAnswer);
  }, [debouncedValue]);

  // start ================================

  const [v2, setV2] = useState('hello');
  const [r1, setR1] = useState<string[]>([]);

  useDebounceEffect(
    () => {
      setR1((val) => [...val, v2]);
    },
    [v2],
    {
      wait: 1000,
    },
  );

  // end =======================================

  return (
    <Spin spinning={loading}>
      <Typography.Title>Debounced Demo</Typography.Title>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Typed value"
        style={{ width: 280 }}
      />
      <p style={{ marginTop: 16 }}>DebouncedValue: {debouncedValue}</p>
      <p style={{ marginTop: 16 }}>apiAnswer: {apiAnswer}</p>

      <Divider />
      <Typography.Title>DebouncedEffect Demo</Typography.Title>
      <Input
        value={v2}
        onChange={(e) => setV2(e.target.value)}
        placeholder="Typed value"
        style={{ width: 280 }}
      />
      <p style={{ marginTop: 16 }}>
        <ul>
          {r1.map((record, index) => (
            <li key={index}>{record}</li>
          ))}
        </ul>
      </p>
    </Spin>
  );
}

const Index = () => {
  return <DebounceDemo />;

  const [state, setState] = useState<number>();
  const testUpdate = () => {
    console.log('update=====>>>>');
  };
  useUpdate(testUpdate);

  // =====================

  return (
    <Space direction="vertical">
      <Button type="primary" onClick={() => setState(Math.random())}>
        click
      </Button>
      <Typography.Text>{state}</Typography.Text>
    </Space>
  );
  // return <AsyncJotaiDemo />;

  return (
    <Space direction="vertical">
      <NormalJotai />
      <Divider />
      <AsyncJotai />
      <Divider />
      <JotaiDemo2 />
      <Divider />
      <AsyncJotai3 />
    </Space>
  );
};

export default Index;
