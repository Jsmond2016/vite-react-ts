import mockjs from 'mockjs';
import { http, HttpResponse } from 'msw';
// 参考文档：https://mswjs.io/docs/getting-started/integrate/browser
// 参考博客：https://juejin.cn/post/7018732383067176991 MSW：可用于浏览器和测试的Mock服务

export const handlers = [
  http.get('http://localhost:4000/getProductList', (req, res, ctx) => {
    return HttpResponse.json(
      mockjs.mock({
        code: 200,
        'data|1-120': [
          {
            productId: '@id',
            productName:
              '12期分期 现货速发】HONOR荣耀畅玩20 手机官网官方旗舰店新款正品畅玩plus智能全面屏直降X20手机20pro荣耀',
            originPrice: '@natural(5000, 10000)',
            price: '@natural(4000, 5000)',
            saleCount: '@natural(1000, 6000)',
            deliverMethod: "@pick(['韵达快递','顺丰快递','申通快递','蜂鸟速运'])",
            productColors: '@range(1, 3, 1)',
            capacity: '@pick([64, 128, 256, 512])',
            // netType: getRandomItems([1, 2, 3, 4]),
            netType: '@range(1,4,1)',
            serviceYearNum: '@natural(1,6)',
            productInventory: '@natural(1000, 3000)',
            imageUrl:
              'https://gw.alicdn.com/imgextra/i3/2024314280/O1CN01aBzS5G1hUHyQeo3qy_!!2024314280.jpg_110x10000Q75.jpg_.webp',
            status: '@pick([-1,1,2,3])',
            trendStatus: '@pick([-1,0,1])',
          },
        ],
      }),
    );
  }),
  http.get('http://localhost:4000/product/queryOne', (req, res, ctx) => {
    return HttpResponse.json(
      mockjs.mock({
        code: 200,
        data: {
          productId: '@id',
          productName:
            '12期分期 现货速发】HONOR荣耀畅玩20 手机官网官方旗舰店新款正品畅玩plus智能全面屏直降X20手机20pro荣耀',
          originPrice: '@natural(5000, 10000)',
          price: '@natural(4000, 5000)',
          saleCount: '@natural(1000, 6000)',
          deliverMethod: "@pick(['韵达快递','顺丰快递','申通快递','蜂鸟速运'])",
          productColors: '@range(1,2,1)',
          capacity: '@pick([64, 128, 256, 512])',
          netType: '@range(1,4,1)',
          serviceYearNum: '@natural(1,6)',
          productInventory: '@natural(1000, 3000)',
          imageUrl:
            'https://gw.alicdn.com/imgextra/i3/2024314280/O1CN01aBzS5G1hUHyQeo3qy_!!2024314280.jpg_110x10000Q75.jpg_.webp',
          status: '@integer(0,3)',
          trendStatus: '@range(-1,1,1)',
        },
      }),
    );
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
  // http.delete('http://localhost:4000/delete-user', (req, res, ctx) => {
  //   return HttpResponse.json({ code: 200, data: '' });
  // }),
];
