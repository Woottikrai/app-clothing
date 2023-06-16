import { FormInstance } from "antd";
import React from "react";
import IContextListProduct from "./interface";

const Context = React.createContext<IContextListProduct>(
  {} as IContextListProduct
);

const WithListProduct = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <Context.Provider value={{ open, setOpen }}>{children}</Context.Provider>
  );
};

export const useListProduct = () => React.useContext(Context);
export default WithListProduct;
