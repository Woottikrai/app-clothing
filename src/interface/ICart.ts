import { IProduct } from "./IProduct";
import { IUser } from "./IUser";

export interface ICart {
  id: number;
  quantity: number;
  sumPrice: number;

  img?: string;

  product: IProduct;
  productId?: number;

  status?: IStatus;
  statusId?: number;

  user: IUser;
  userId?: number;
  orderId: string;

  listOrder?: boolean;
}

export interface IStatus {
  id?: number;
  status_name?: string;
}
