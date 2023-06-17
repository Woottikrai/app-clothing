import { FormInstance } from "antd";
import { ICart } from "../../interface/ICart";
import { IProduct } from "../../interface/IProduct";

export default interface IContextListProduct {
  onOK: (v?: any) => void;
  open?: boolean;
  setOpen: (v: boolean) => void;
  cart: IProduct;
  setCart: (v: IProduct) => void;
  modalListProduct: FormInstance;
}
