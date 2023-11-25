/** ======================================================

注意：

此文件由配置文件生成，任何修改无效；

请勿修改！！请勿修改！！请勿修改！！！

========================================================= */

/** 商品状态 */
export enum DemoStatus {
  /** 下架 */
  OFF_SHORE = 0,

  /** 在售 */
  ON_SHORE = 1,
}

/** 商品状态Options */
export const DemoStatusOptions = {
  [DemoStatus.OFF_SHORE]: '下架',
  [DemoStatus.ON_SHORE]: '在售',
};

/** 商品颜色 */
export enum DemoColor {
  /** 黑色 */
  black = 'black',

  /** 绿色 */
  green = 'green',
}

/** 商品颜色Options */
export const DemoColorOptions = {
  [DemoColor.black]: '黑色',
  [DemoColor.green]: '绿色',
};

/** 商品颜色 */
export enum ProductColor {
  /** 海军蓝 */
  Blue = 0,

  /** 星空黑 */
  Black = 1,
}

/** 商品颜色Options */
export const ProductColorOptions = {
  [ProductColor.Blue]: '海军蓝',
  [ProductColor.Black]: '星空黑',
};

/** 网络类型 */
export enum NetType {
  /** 4G */
  _4G = '_4G',

  /** 4G全网通 */
  _4G_Global = '_4G_Global',

  /** 5G */
  _5G = '_5G',

  /** 4G全网通 */
  _5G_Global = '_5G_Global',
}

/** 网络类型Options */
export const NetTypeOptions = {
  [NetType._4G]: '4G',
  [NetType._4G_Global]: '4G全网通',
  [NetType._5G]: '5G',
  [NetType._5G_Global]: '4G全网通',
};

/** 商品状态 */
export enum ProductStatus {
  /** _未上架 */
  Off_Shelf = -1,

  /** 待售 */
  To_Be_Sale = 1,

  /** 在售 */
  On_Sale = 2,

  /** 售罄 */
  Sold_Out = 3,
}

/** 商品状态Options */
export const ProductStatusOptions = {
  [ProductStatus.Off_Shelf]: '_未上架',
  [ProductStatus.To_Be_Sale]: '待售',
  [ProductStatus.On_Sale]: '在售',
  [ProductStatus.Sold_Out]: '售罄',
};

/** 商品颜色 */
export enum statusColorMap {
  /** 紫色 */
  Off_Shelf = 'purple',

  /** 蓝绿色 */
  To_Be_Sale = 'cyan',

  /** 绿色 */
  On_Sale = 'green',

  /** 红色 */
  Sold_Out = 'red',
}

/** 商品颜色Options */
export const statusColorMapOptions = {
  [statusColorMap.Off_Shelf]: '紫色',
  [statusColorMap.To_Be_Sale]: '蓝绿色',
  [statusColorMap.On_Sale]: '绿色',
  [statusColorMap.Sold_Out]: '红色',
};

/** 商品销量趋势 */
export enum ProductTrendStatus {
  /** 下降 */
  Down = -2,

  /** 持平 */
  Flat = -1,

  /** 上升 */
  Up = 0,
}

/** 商品销量趋势Options */
export const ProductTrendStatusOptions = {
  [ProductTrendStatus.Down]: '下降',
  [ProductTrendStatus.Flat]: '持平',
  [ProductTrendStatus.Up]: '上升',
};
