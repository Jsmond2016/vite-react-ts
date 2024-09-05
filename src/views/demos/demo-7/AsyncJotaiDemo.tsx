import { Button, Space } from 'antd';
import { atom, Provider, useAtom } from 'jotai';
import React, { Suspense } from 'react';

/**
 *
 * refer: https://codesandbox.io/s/jotai-demo-forked-x2g5d?file=/src/App.js:0-1334
 *
 */

const postId = atom(9001);
const postData = atom(async (get) => {
  const id = get(postId);
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  return await response.json();
});

function Id() {
  const [id] = useAtom(postId);
  return <h2>Id: {id}</h2>;
}

function Next() {
  const [, set] = useAtom(postId);
  return (
    <Button type="primary" onClick={() => set((x) => x + 1)}>
      下一页
    </Button>
  );
}

function PostTitle() {
  // This throws an expection that's caught by Reacts suspense boundary
  const [{ by, title, url, text, time }] = useAtom(postData);
  // And by the time we're here the data above is available
  return (
    <Space direction="vertical" size="large">
      <h2>{by}</h2>
      <h6>{new Date(time * 1000).toLocaleDateString('en-US')}</h6>
      {title && <h4>{title}</h4>}
      <a href={url}>{url}</a>
      <p>{text}</p>
    </Space>
  );
}

export default function App() {
  return (
    <Provider>
      <Space size="large" direction="vertical">
        <Id />
        <div>
          <Suspense fallback={<h2>Loading...</h2>}>
            <PostTitle />
          </Suspense>
        </div>
        <Next />
      </Space>
    </Provider>
  );
}
