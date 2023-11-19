import { http, HttpResponse } from 'msw';

// 参考文档：https://mswjs.io/docs/getting-started/integrate/browser
// 参考博客：https://juejin.cn/post/7018732383067176991 MSW：可用于浏览器和测试的Mock服务

export const handlers = [
  http.get('http://localhost:4000/search-user', (req, res, ctx) => {
    const data = new Array(200).fill(0).map((v, i) => ({
      name: '测试',
      gender: Math.random() > 0.5 ? '男' : '女',
      age: 20 + parseInt(Math.random() * 10),
      address: '测试地址',
      hobby: '唱跳rap',
      skill: '篮球，唱歌，跳舞',
      id: i + 1,
    }));
    return HttpResponse.json({ code: 200, data });
  }),
  http.get('http://localhost:4000/get-user-info', (req, res, ctx) => {
    const data = {
      name: '测试',
      gender: Math.random() > 0.5 ? '男' : '女',
      age: 20 + parseInt(Math.random() * 10),
      address: '测试地址',
      hobby: '唱跳rap',
      skill: '篮球，唱歌，跳舞',
      id: Date.now().toString(16),
    };
    return HttpResponse.json({ code: 200, data });
  }),
  http.delete('http://localhost:4000/delete-user', (req, res, ctx) => {
    return HttpResponse.json({ code: 200, data: '' });
  }),
];
