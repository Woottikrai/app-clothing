import { ICart } from "./ICart";
import { IProduct } from "./IProduct";
import { IUser } from "./IUser";

export interface IOrder {
  id: number;
  user: IUser;

  cart: ICart;

  product: IProduct;
}
