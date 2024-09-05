const Product = [
  [
    ['ProductColor', '商品颜色'],
    ['Blue', 1, '海军蓝'],
    ['Black', 2, '星空黑'],
  ],
  [
    ['NetType', '网络类型'],
    ['_4G', 1, '4G'],
    ['_4G_Global', 2, '4G全网通'],
    ['_5G', 3, '5G'],
    ['_5G_Global', 4, '4G全网通'],
  ],
  [
    ['ProductStatus', '商品状态'],
    ['Off_Shelf', -1, '未上架'],
    ['To_Be_Sale', 1, '待售'],
    ['On_Sale', 2, '在售'],
    ['Sold_Out', 3, '售罄'],
  ],
  [
    ['ProductTrendStatus', '商品销量趋势'],
    ['Down', -1, '下降'],
    ['Flat', 0, '持平'],
    ['Up', 1, '上升'],
  ],
];

export default Product;
