import { IProduct } from "./IProduct";
import { IUser } from "./IUser";

export interface ICart {
  id: number;
  quantity: number;
  sumPrice: number;

  product: IProduct;
  productId?: number;

  status?: IStatus;
  statusId?: number;

  user: IUser;
  userId?: number;
  orderId: string;
}

export interface IStatus {
  id?: number;
  status_name?: string;
}
