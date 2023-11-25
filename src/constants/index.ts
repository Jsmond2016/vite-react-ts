export enum ProductColor {
  Blue = 0,
  Black = 1,
}

export const ProductColorOptions = {
  [ProductColor.Black]: '星空黑',
  [ProductColor.Blue]: '海军蓝',
};

export enum NetType {
  _3G = 1,
  _3G_Global = 2,
  _4G = 3,
  _4G_Global = 4,
}
export const NetTypeOptions = {
  [NetType._3G]: '4G',
  [NetType._3G_Global]: '4G全网通',
  [NetType._4G]: '5G',
  [NetType._4G_Global]: '5G全网通',
};

export enum ProductStatus {
  /** 未上架 */
  Off_Shelf = -1,
  /** 待售 */
  To_Be_Sale,
  /** 在售 */
  On_Sale,
  /** 售罄 */
  Sold_Out,
}
export const ProductStatusOptions = {
  [ProductStatus.Off_Shelf]: '未上架',
  [ProductStatus.To_Be_Sale]: '待售',
  [ProductStatus.On_Sale]: '在售',
  [ProductStatus.Sold_Out]: '售罄',
};

export const statusColorMap = {
  [ProductStatus.Off_Shelf]: 'purple',
  [ProductStatus.To_Be_Sale]: 'cyan',
  [ProductStatus.On_Sale]: 'green',
  [ProductStatus.Sold_Out]: 'red',
};

export enum ProductTrendStatus {
  Down = -2,
  Flat = -1,
  Up = 0,
}
