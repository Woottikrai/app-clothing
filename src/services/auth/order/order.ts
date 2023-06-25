import axios from "axios";
import { UseQueryResult, useQuery } from "react-query";
import { throwResponse } from "../../../config/axios/axios.config";
import { ICart } from "../../../interface/ICart";
import endpoints from "../api.endpoint";
import { IOrder } from "../../../interface/Iorders";
import { IUser } from "../../../interface/IUser";

const statusSuccess = [200, 201];
export const useOrderHistory = (
  id?: number
): UseQueryResult<ICart[], Error> => {
  return useQuery(["order-history", id], async () => {
    const res = await axios.get(`${endpoints.cart.orderHistory}/${id}`);
    if (res.status === 200) {
      return res.data;
    }
    throwResponse(res);
  });
};
export const useOrderAdmin = (): UseQueryResult<ICart[], Error> => {
  return useQuery(["cart"], async () => {
    const res = await axios.get(`${endpoints.cart.OrderAdmin}`);
    if (res.status === 200) {
      return res.data;
    }
    throwResponse(res);
  });
};

export const useOrderAdmins = (): UseQueryResult<IUser[], Error> => {
  return useQuery(["cart"], async () => {
    const res = await axios.get(`${endpoints.cart.orderAdmin}`);
    if (res.status === 200) {
      return res.data;
    }
    throwResponse(res);
  });
};
