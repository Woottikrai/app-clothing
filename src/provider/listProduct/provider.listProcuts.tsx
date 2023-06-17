import { Form, FormInstance } from "antd";
import React from "react";
import { openNotification } from "../../components/notification";
import { ICart } from "../../interface/ICart";
import { IProduct } from "../../interface/IProduct";
import { useAddToCart } from "../../services/auth/cart/cart.axios";
import { useAuthContext } from "../auth/provider.auth";
import IContextListProduct from "./interface";

const Context = React.createContext<IContextListProduct>(
  {} as IContextListProduct
);

const WithListProduct = ({ children }: { children: React.ReactNode }) => {
  const [modalListProduct] = Form.useForm();
  const [open, setOpen] = React.useState<boolean>(false);
  const [cart, setCart] = React.useState<Pick<IProduct, "id" | "price">>({});
  const post = useAddToCart();
  const { profile } = useAuthContext();
  const onOK = (v: ICart) => {
    if (cart) {
      const postItem = {
        ...v,
        sumPrice: cart.price && cart.price * v.quantity,
        productId: cart?.id,
        userId: profile?.id,
      };
      post.mutate(postItem, {
        onSuccess: () => {
          openNotification({ type: "success" });
          setOpen(false);
          modalListProduct.resetFields();
        },
        onError: () => {
          openNotification({ type: "error" });
        },
      });
    }
  };

  return (
    <Context.Provider
      value={{ onOK, modalListProduct, cart, setCart, setOpen, open }}
    >
      {children}
    </Context.Provider>
  );
};

export const useListProduct = () => React.useContext(Context);
export default WithListProduct;
