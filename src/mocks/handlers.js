import { http, HttpResponse } from 'msw';

// 参考文档：https://mswjs.io/docs/getting-started/integrate/browser
// 参考博客：https://juejin.cn/post/7018732383067176991 MSW：可用于浏览器和测试的Mock服务

const getRandomItem = (list = []) => list[Math.floor(Math.random() * list.length)];
const getRandomItems = (list = []) => {
  const len = list.length * Math.random();
  return list.slice(len);
};

export const handlers = [
  http.get('http://localhost:4000/getProductList', (req, res, ctx) => {
    const data = new Array(200).fill(0).map((v, i) => ({
      productId: `${i + 34532123}34234234`,
      productName:
        '12期分期 现货速发】HONOR荣耀畅玩20 手机官网官方旗舰店新款正品畅玩plus智能全面屏直降X20手机20pro荣耀',
      originPrice: 6999 * Math.random(),
      price: Math.random() * 4999,
      saleCount: parseInt(Math.random() * 9999),
      deliverMethod: getRandomItem(['韵达快递', '顺丰快递', '申通快递', '蜂鸟速运']),
      productColors: [1, 2],
      capacity: [64, 128, 256, 512][i % 4],
      netType: getRandomItems([1, 2, 3, 4]),
      serviceYearNum: Math.ceil(Math.random() * 6),
      productInventory: parseInt(4565 * Math.random()),
      imageUrl:
        'https://gw.alicdn.com/imgextra/i3/2024314280/O1CN01aBzS5G1hUHyQeo3qy_!!2024314280.jpg_110x10000Q75.jpg_.webp',
      status: parseInt(Math.random() * i) % 4,
      trendStatus: getRandomItem([-1, 0, 1]),
    }));
    return HttpResponse.json({ code: 200, data });
  }),
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
