import { IProduct } from "./IProduct";

export interface ICart {
  id: number;
  quantity: number;
  sumPrice: number;

  product: IProduct;
  productId?: number;

  status?: IStatus;
  statusId?: number;

  userId?: number;
  orderId?: number;
}

export interface IStatus {
  id?: number;
  status_name?: string;
}
