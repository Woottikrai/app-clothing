import { FormInstance } from "antd";
import { ICart } from "../../interface/ICart";

export default interface IContextListProduct {
  onOK?: (v?: FormInstance<any>) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}
