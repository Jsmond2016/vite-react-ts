import { Divider, Input, Space } from 'antd';
import { evolve, lensPath, pipe, set } from 'ramda';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import numStore from '@/store/num';

const Index = () => {
  // 获取 store 数据方式
  const { num } = useSelector((state: RootStateType) => state.num);
  const { role } = useSelector((state: RootStateType) => state.user);
  // 触发 store 中的事件方法
  const dispatch = useDispatch();
  const changeNum = () => {
    // 同步写法
    // dispatch({ type: "add" })
    // 异步写法：redux-thunk
    // dispatch((commit: Function) => {
    //   setTimeout(() => {
    //     commit({ type: "add" })
    //   }, 1000)
    // })
    // 等同于
    dispatch(numStore.asyncActions.newAdd as any);
  };
  const changeRole = () => {
    dispatch({ type: 'setRole', value: [1, 2, 3] });
  };
  return (
    <div>
      <div>{num}</div>
      <button onClick={changeNum}>改变数字</button>
      <p>{role}</p>
      <button onClick={changeRole}>改变Role</button>
      <RamdaDemo />
      <Divider />
      <TextareaDemo />
    </div>
  );
};

function RamdaDemo() {
  const obj = {
    a: 1,
    b: {
      c: 'abc',
    },
  };
  const newObj = pipe(
    evolve({
      a: (v: number) => v + 1,
    }),
    set(lensPath(['b', 'c']), 'def'),
  )(obj);

  console.log('newObj', newObj);
  return <h2>ramda</h2>;
}

function TextareaDemo() {
  const [value, setValue] = useState('');

  return (
    <Space>
      <Input.TextArea
        rows={4}
        value={value}
        onChange={(ev) => {
          setValue(ev.target.value);
          console.log('value', value);
        }}
      />
      <Divider />
      <pre>{value}</pre>
    </Space>
  );
}

export default Index;
