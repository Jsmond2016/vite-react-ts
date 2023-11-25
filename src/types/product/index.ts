import { NetType, ProductColor, ProductStatus, ProductTrendStatus } from '@/constants';

export type IProduct = {
  productId: string;
  productName: string;
  originPrice: number;
  price: number;
  saleCount: number;
  deliverMethod: string;
  productColors: ProductColor[];
  capacity: number;
  netType: NetType[];
  imageUrl: string;
  serviceYearNum: number;
  productInventory: number;
  status: ProductStatus;
  trendStatus: ProductTrendStatus;
};
